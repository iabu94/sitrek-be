import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CreateLeadPayload } from './dto/create-lead.dto';
import { Lead } from './entities/lead.entity';

const tableName = 'sitrek_roles';

@Injectable()
export class LeadsService {
  constructor(private dataSource: DataSource) {}

  async create(payload: CreateLeadPayload): Promise<Lead> {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Step 1: Insert into `sitrek_leads`
      const leadResult = await queryRunner.query(
        `INSERT INTO sitrek_leads (
        id, ownerId, leadtype, leadStatus, salesPersonId, orgName, orgIdType, orgId, addrTitles, addr1, addr2, cityId, provinceId, country, 
        contactNIC, contactName, contactDesignation, contactEmail, contact1, contact2, adminFee, adminFeeType, vat, sscl, discount, discountType, startDate, endDate
    ) 
    VALUES (?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          null,
          payload.lead.ownerId,
          payload.lead.leadtype,
          payload.lead.leadStatus,
          payload.lead.salesPersonId,
          payload.lead.orgName,
          payload.lead.orgIdType,
          payload.lead.orgId,
          payload.lead.addrTitles,
          payload.lead.addr1,
          payload.lead.addr2,
          payload.lead.cityId,
          payload.lead.provinceId,
          payload.lead.country,
          payload.lead.contactNIC,
          payload.lead.contactName,
          payload.lead.contactDesignation,
          payload.lead.contactEmail,
          payload.lead.contact1,
          payload.lead.contact2,
          payload.lead.adminFee,
          payload.lead.adminFeeType,
          payload.lead.vat,
          payload.lead.sscl,
          payload.lead.discount,
          payload.lead.discountType,
          payload.lead.startDate
            ? new Date(payload.lead.startDate).toISOString().split('T')[0]
            : null,
          payload.lead.endDate
            ? new Date(payload.lead.endDate).toISOString().split('T')[0]
            : null,
        ],
      );

      const leadId = leadResult.insertId;

      // Step 2: Insert into `sitrek_lead_attachments`
      for (const attachment of payload.attachments) {
        await queryRunner.query(
          `INSERT INTO sitrek_lead_attachments (leadId, fullUrl, verifiedById, status)
           VALUES (?, ?, ?, ?)`,
          [
            leadId,
            attachment.fullUrl,
            attachment.verifiedById,
            attachment.status,
          ],
        );
      }

      // Step 3: Insert into `sitrek_rate_cards`
      for (const rateCard of payload.rateCards) {
        await queryRunner.query(
          `INSERT INTO sitrek_rate_cards (leadId, demarcation, catogory, paymentType, initialRate, additionalRate)
           VALUES (?, ?, ?, ?, ?, ?)`,
          [
            leadId,
            rateCard.demarcation,
            rateCard.category,
            rateCard.paymentType,
            rateCard.initialRate,
            rateCard.additionalRate,
          ],
        );
      }

      // Step 4: Insert into `sitrek_lead_notes`
      for (const note of payload.notes) {
        await queryRunner.query(
          `INSERT INTO sitrek_lead_notes (leadId, note, title)
           VALUES (?, ?, ?)`,
          [leadId, note.note, note.title],
        );
      }

      // Step 5: Insert into `sitrek_lead_followups`
      for (const followup of payload.followups) {
        await queryRunner.query(
          `INSERT INTO sitrek_lead_followups (leadId, contactDate, contactById, note, status)
           VALUES (?, ?, ?, ?, ?)`,
          [
            leadId,
            new Date(followup.contactDate).toISOString().split('T')[0],
            followup.contactById,
            followup.note,
            followup.status,
          ],
        );
      }

      // Commit transaction
      await queryRunner.commitTransaction();

      // Fetch the created lead to return it in the response
      const createdLead = await queryRunner.query(
        `SELECT * FROM sitrek_leads WHERE id = ?`,
        [leadId],
      );

      const leadAttachments = await queryRunner.query(
        `SELECT * FROM sitrek_lead_attachments WHERE leadId = ?`,
        [leadId],
      );

      const leadRateCards = await queryRunner.query(
        `SELECT * FROM sitrek_rate_cards WHERE leadId = ?`,
        [leadId],
      );

      const leadNotes = await queryRunner.query(
        `SELECT * FROM sitrek_lead_notes WHERE leadId = ?`,
        [leadId],
      );

      const leadFollowups = await queryRunner.query(
        `SELECT * FROM sitrek_lead_followups WHERE leadId = ?`,
        [leadId],
      );

      return {
        ...createdLead[0], // Return lead data
        attachments: leadAttachments,
        rateCards: leadRateCards,
        notes: leadNotes,
        followups: leadFollowups,
      };
    } catch (error) {
      console.log(error);

      // Rollback transaction in case of error
      await queryRunner.rollbackTransaction();
      throw new HttpException(
        'Failed to create lead',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    } finally {
      // Release query runner
      await queryRunner.release();
    }
  }

  async findAll(): Promise<Lead[]> {
    const result = await this.dataSource.query(
      `SELECT 
    l.*,  -- Fetching all columns from sitrek_leads
    
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

FROM sitrek_leads AS l

-- Join to get owner details (ownerId)
LEFT JOIN josyd_users AS o ON l.ownerId = o.id

-- Join to get salesperson details (salesPersonId)
LEFT JOIN josyd_users AS sp ON l.salesPersonId = sp.id

-- Join to get followups
LEFT JOIN sitrek_lead_followups AS f ON l.id = f.leadId

-- Join to get the contact person's details (contactById)
LEFT JOIN josyd_users AS u ON f.contactById = u.id

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

  async findById(leadId: number): Promise<Lead | null> {
    await this.dataSource.query(`SET SESSION group_concat_max_len = 10000;`);
    const result = await this.dataSource.query(
      `SELECT 
      l.*,  -- Fetching all columns from sitrek_leads
      
      -- Fetching districtId based on cityId
      d.id as districtId,  
      c.postalCode as postalCode,

      -- Fetching owner details as a JSON-like string
      CONCAT('{',
          '"id": ', IFNULL(o.id, 'null'), ', ',
          '"name": "', IFNULL(REPLACE(o.name, '"', '\\"'), ''), '", ',
          '"email": "', IFNULL(REPLACE(o.email, '"', '\\"'), ''), '"'
      , '}') AS owner,

      -- Fetching salesperson details as a JSON-like string
      CONCAT('{',
          '"id": ', IFNULL(sp.id, 'null'), ', ',
          '"name": "', IFNULL(REPLACE(sp.name, '"', '\\"'), ''), '", ',
          '"email": "', IFNULL(REPLACE(sp.email, '"', '\\"'), ''), '"'
      , '}') AS salesPerson,

      -- Fetching followups as a JSON array of objects
      CONCAT('[', 
          IFNULL(
              GROUP_CONCAT(DISTINCT
                  CONCAT(
                      '{',
                          '"id": ', f.id, ', ',
                          '"contactDate": "', IFNULL(f.contactDate, ''), '", ',
                          '"contactById": ', IFNULL(u.id, 'null'), ', ',
                          '"contactByName": "', IFNULL(REPLACE(u.name, '"', '\\"'), ''), '", ',
                          '"contactByEmail": "', IFNULL(REPLACE(u.email, '"', '\\"'), ''), '", ',
                          '"note": "', IFNULL(REPLACE(f.note, '"', '\\"'), ''), '", ',
                          '"status": "', IFNULL(f.status, ''), '"',
                      '}'
                  ) SEPARATOR ','
              ), ''
          ), 
      ']') AS followups,

      -- Fetching rate cards as a JSON array of objects
      CONCAT('[', 
          IFNULL(
              GROUP_CONCAT(DISTINCT
                  CONCAT(
                      '{',
                          '"id": ', rc.id, ', ',
                          '"demarcation": "', IFNULL(REPLACE(rc.demarcation, '"', '\\"'), ''), '", ',
                          '"category": "', IFNULL(REPLACE(rc.catogory, '"', '\\"'), ''), '", ',
                          '"paymentType": "', IFNULL(REPLACE(rc.paymentType, '"', '\\"'), ''), '", ',
                          '"initialRate": ', IFNULL(rc.initialRate, '0'), ', ',
                          '"additionalRate": ', IFNULL(rc.additionalRate, '0'), 
                      '}'
                  ) SEPARATOR ','
              ), ''
          ), 
      ']') AS rateCards,

      -- Fetching attachments as a JSON array of objects
      CONCAT('[', 
    IFNULL(
        GROUP_CONCAT(DISTINCT
            CONCAT(
                '{',
                    '"id": ', IFNULL(att.id, 'null'), ', ',
                    '"verifiedById": ', IFNULL(att.verifiedById, 'null'), ', ',
                    '"fullUrl": "', IFNULL(REPLACE(att.fullUrl, '"', '\\"'), ''), '", ',
                    '"status": "', IFNULL(REPLACE(att.status, '"', '\\"'), '') ,'"',
                '}'
            ) SEPARATOR ','
        ), ''
    ), 
']') AS attachments

  
    FROM sitrek_leads AS l
  
    -- Join to get owner details (ownerId)
    LEFT JOIN josyd_users AS o ON l.ownerId = o.id
  
    -- Join to get salesperson details (salesPersonId)
    LEFT JOIN josyd_users AS sp ON l.salesPersonId = sp.id
  
    -- Join to get followups
    LEFT JOIN sitrek_lead_followups AS f ON l.id = f.leadId
  
    -- Join to get the contact person's details (contactById)
    LEFT JOIN josyd_users AS u ON f.contactById = u.id
    
    -- Join districts table using cityId to get districtId
    LEFT JOIN sitrek_cities AS c ON l.cityId = c.id
    LEFT JOIN sitrek_districts AS d ON c.districtId = d.id

    -- Join to get rate cards
    LEFT JOIN sitrek_rate_cards AS rc ON l.id = rc.leadId

    -- Join to get attachments
    LEFT JOIN sitrek_lead_attachments AS att ON l.id = att.leadId
    
    WHERE l.id = ?
    
    GROUP BY l.id;
  `,
      [leadId],
    );

    if (result.length === 0) {
      return null;
    }

    const lead = result[0];

    return {
      ...lead,
      districtId: lead.districtId, // Add districtId to the returned object
      owner: lead.owner ? JSON.parse(lead.owner) : null,
      salesPerson: lead.salesPerson ? JSON.parse(lead.salesPerson) : null,
      followups: lead.followups ? JSON.parse(lead.followups) : [],
      rateCards: lead.rateCards ? JSON.parse(lead.rateCards) : [],
      attachments: lead.attachments ? JSON.parse(lead.attachments) : [],
    };
  }

  async findNotes(leadId: number): Promise<any> {
    const result = await this.dataSource.query(
      `SELECT * FROM sitrek_lead_notes WHERE leadId = ?`,
      [leadId],
    );

    return result;
  }
}
