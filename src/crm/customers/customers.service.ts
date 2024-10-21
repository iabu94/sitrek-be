import { Injectable } from '@nestjs/common';
import { sitrek_customers } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { DataSource } from 'typeorm';
import { UpdateCustomerPayload } from './dto/create.customer.dto';

@Injectable()
export class CustomersService {
  constructor(
    private dataSource: DataSource,
    private prisma: PrismaService,
  ) {}
  async getAll(): Promise<sitrek_customers[]> {
    const leads = await this.prisma.sitrek_customers.findMany({
      include: {
        sitrek_lead_followups: true,
        sitrek_rate_cards: true,
        sitrek_lead_attachments: true,
        sitrek_lead_notes: true,
        sitrek_cities: {
          include: {
            sitrek_districts: true,
          },
        },
        josyd_users_sitrek_customers_ownerIdTojosyd_users: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    return leads.map((lead) => ({
      ...lead,
      owner: lead.josyd_users_sitrek_customers_ownerIdTojosyd_users,
      city: lead.sitrek_cities,
      followups: lead.sitrek_lead_followups,
      rateCards: lead.sitrek_rate_cards,
      attachments: lead.sitrek_lead_attachments,
      notes: lead.sitrek_lead_notes,
      districts: lead.sitrek_cities.sitrek_districts,
      // Remove the original fields if necessary
      josyd_users_sitrek_leads_ownerIdTojosyd_users: undefined,
      sitrek_cities: undefined,
    }));
  }
  async findAll(): Promise<sitrek_customers[]> {
    const result = await this.dataSource.query(
      `SELECT 
    l.*,  -- Fetching all columns from sitrek_customers
    
    -- Fetching owner details as a JSON-like string
    CONCAT('{',
        '"id": ', IFNULL(o.id, 'null'), ', ',
        '"name": "', IFNULL(o.name, ''), '", ',
        '"email": "', IFNULL(o.email, ''), '"'
    , '}') AS owner,
    
    -- Fetching salesperson details as a JSON-like string
    CONCAT('{',
        '"id": ', IFNULL(sp.id, 'null'), ', ',
        '"name": "', IFNULL(sp.name, ''), '", ',
        '"email": "', IFNULL(sp.email, ''), '"'
    , '}') AS salesPerson,
    
    -- Fetching followups as a JSON array of objects
    CONCAT('[', 
        IFNULL(
            GROUP_CONCAT(
                CONCAT(
                    '{',
                        '"id": ', f.id, ', ',
                        '"contactDate": "', f.contactDate, '", ',
                        '"contactById": ', u.id, ', ',
                        '"contactByName": "', u.name, '", ',
                        '"contactByEmail": "', u.email, '", ',
                        '"note": "', f.note, '", ',
                        '"status": "', f.status, '"',
                    '}'
                )
            ), ''
        ), 
    ']') AS followups

FROM sitrek_customers AS l

-- Join to get owner details (ownerId)
LEFT JOIN josyd_users AS o ON l.ownerId = o.id

-- Join to get salesperson details (salesPersonId)
LEFT JOIN josyd_users AS sp ON l.salesPersonId = sp.id

-- Join to get followups
LEFT JOIN sitrek_lead_followups AS f ON l.id = f.customerId

-- Join to get the contact person's details (contactById)
LEFT JOIN josyd_users AS u ON f.contactById = u.id

WHERE l.isDeleted = false
GROUP BY l.id;
`,
    );

    return result.map((leads) => {
      return {
        ...leads,
        owner: leads.owner ? JSON.parse(leads.owner) : null,
        salesPerson: leads.salesPerson ? JSON.parse(leads.salesPerson) : null,
        followups: leads.followups ? JSON.parse(leads.followups) : [],
      };
    });
  }

  async create(payload: sitrek_customers) {
    return await this.prisma.$transaction(async (prisma) => {
      const isCustomerExists = await this.prisma.sitrek_customers.findFirst({
        where: {
          leadId: payload.leadId,
        },
      });

      if (!isCustomerExists) {
        const customerCode = await this.generateCustomerCode();

        return await this.prisma.sitrek_customers.create({
          data: {
            ...payload,
            customerCode: customerCode,
          },
        });
      } else {
        return isCustomerExists;
      }
    });
  }

  async generateCustomerCode(): Promise<string> {
    const prefix = 'CUST'; // Set your desired prefix
    const padding = 5; // Number of digits in the numeric part (e.g., 00001)

    // Fetch the customer with the highest current code
    const latestCustomer = await this.prisma.sitrek_customers.findFirst({
      where: {
        customerCode: {
          startsWith: prefix,
        },
      },
      orderBy: {
        customerCode: 'desc',
      },
    });

    let newCodeNumber = 1;

    // Extract the numeric part of the latest customer code and increment it
    if (latestCustomer && latestCustomer.customerCode) {
      const latestCode = latestCustomer.customerCode.replace(prefix, '');
      newCodeNumber = parseInt(latestCode, 10) + 1;
    }

    // Generate the new code with leading zeros
    const newCode = `${prefix}${newCodeNumber.toString().padStart(padding, '0')}`;
    return newCode;
  }

  async getById(id) {
    const leadData = await this.prisma.sitrek_customers.findUnique({
      where: { id: +id },
      include: {
        sitrek_lead_followups: {
          include: {
            josyd_users: true,
          },
        },
        sitrek_rate_cards: true,
        sitrek_lead_attachments: true,
        sitrek_lead_notes: true,
        sitrek_cities: {
          include: {
            sitrek_districts: true,
          },
        },
      },
    });

    if (!leadData) {
      return null;
    }

    // Step 4: Integrate grouped rate cards with lead data
    const lead = {
      ...leadData,
      followups: leadData.sitrek_lead_followups,
      rateCards: leadData.sitrek_rate_cards,
      attachments: leadData.sitrek_lead_attachments,
      notes: leadData.sitrek_lead_notes,
      city: leadData.sitrek_cities,
    };

    // Remove original fields if necessary
    delete lead.sitrek_lead_followups;
    delete lead.sitrek_rate_cards;
    delete lead.sitrek_lead_attachments;
    delete lead.sitrek_lead_notes;

    return lead;
  }

  async update(data: UpdateCustomerPayload) {
    const lead = await this.prisma.sitrek_customers.update({
      data: {
        ownerId: +data.customer.ownerId,
        leadtype: data.customer.leadtype,
        leadStatus: data.customer.leadStatus,
        salesPersonId: +data.customer.salesPersonId,
        orgName: data.customer.orgName,
        orgIdType: data.customer.orgIdType,
        orgId: data.customer.orgId,
        addrTitles: data.customer.addrTitles,
        addr1: data.customer.addr1,
        addr2: data.customer.addr2 || null,
        cityId: +data.customer.cityId,
        provinceId: +data.customer.provinceId,
        country: data.customer.country,
        adminFee: data.customer.adminFee,
        vat: data.customer.vat,
        sscl: data.customer.sscl,
        svat: data.customer.svat,
        discount: data.customer.discount,
        startDate: new Date(data.customer.startDate),
        endDate: new Date(data.customer.endDate),
        bankName: data.customer.bankName,
        accountName: data.customer.accountName,
        accountNumber: +data.customer.accountNumber,
        branchName: data.customer.branchName,
      },
      where: { id: data.customer.id },
    });
  }
}
