export interface Lead {
  id?: number;
  ownerId: number;
  leadtype: string;
  leadStatus: string;
  salesPersonId: number;
  orgName: string;
  orgIdType: string;
  orgId: string;
  addrTitles: string;
  addr1: string;
  addr2: string;
  cityId: number;
  provinceId: number;
  country: string;
  contactNIC: string;
  contactName: string;
  contactDesignation: string;
  contactEmail: string;
  contact1: string;
  contact2: string;
  adminFee: number;
  adminFeeType: string;
  vat: number;
  sscl: number;
  discount: number;
  discountType: string;
  startDate: Date;
  endDate: Date;
}

export interface LeadAttachment {
  id?: number;
  leadId: number;
  fullUrl: string;
  verifiedById: number;
  status: string;
}

export interface RateCard {
  id?: number;
  leadId: number;
  demarcation: string;
  category: string;
  paymentType: string;
  initialRate: number;
  additionalRate: number;
}

export interface LeadNote {
  id?: number;
  leadId: number;
  note: string;
  title: string;
}

export interface LeadFollowup {
  id?: number;
  leadId: number;
  contactDate: Date;
  contactById: number;
  note: string;
  status: string;
}
