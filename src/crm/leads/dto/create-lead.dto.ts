import {
  sitrek_lead_attachments,
  sitrek_lead_followups,
  sitrek_lead_notes,
  sitrek_leads,
  sitrek_rate_cards,
} from '@prisma/client';
import {
  Lead,
  LeadAttachment,
  LeadFollowup,
  LeadNote,
  RateCard,
} from '../entities/lead.entity';

export interface CreateLeadPayload {
  lead: Lead;
  attachments: LeadAttachment[];
  rateCards: RateCard[];
  notes: LeadNote[];
  followups: LeadFollowup[];
}

export interface UpdateLeadPayload {
  lead: sitrek_leads;
  attachments: sitrek_lead_attachments[];
  rateCards: sitrek_rate_cards[];
  notes: sitrek_lead_notes[];
  followups: sitrek_lead_followups[];
}
