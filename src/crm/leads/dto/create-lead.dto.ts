import { Lead, LeadAttachment, LeadFollowup, LeadNote, RateCard } from "../entities/lead.entity";

export interface CreateLeadPayload {
  lead: Lead;
  attachments: LeadAttachment[];
  rateCards: RateCard[];
  notes: LeadNote[];
  followups: LeadFollowup[];
}
