import {
  sitrek_customers,
  sitrek_lead_attachments,
  sitrek_lead_followups,
  sitrek_lead_notes,
  sitrek_rate_cards,
} from '@prisma/client';

export interface CreateCustomerPayload {
  lead: sitrek_customers;
  attachments: sitrek_lead_attachments[];
  rateCards: sitrek_rate_cards[];
  notes: sitrek_lead_notes[];
  followups: sitrek_lead_followups[];
}
