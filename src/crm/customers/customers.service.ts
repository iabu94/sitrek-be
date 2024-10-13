import { Injectable } from '@nestjs/common';
import { sitrek_customers } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { DataSource } from 'typeorm';

@Injectable()
export class CustomersService {
  constructor(
    private dataSource: DataSource,
    private prisma: PrismaService,
  ) {}

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
}
