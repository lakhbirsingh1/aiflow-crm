export type LeadStatus =
  | "NEW"
  | "CONTACTED"
  | "QUALIFIED"
  | "PROPOSAL"
  | "WON"
  | "LOST";

export type LeadSource =
  | "WEBSITE"
  | "LINKEDIN"
  | "EMAIL"
  | "COLD_OUTREACH"
  | "REFERRAL"
  | "OTHER"
  | null;

export type Lead = {
  id: string;
  firstName: string;
  lastName: string | null;
  email: string | null;
  phone: string | null;
  company: string | null;
  jobTitle: string | null;
  status: LeadStatus;
  source: LeadSource;
  score: number | null;
  ownerId: string;

  owner?: {
    id: string;
    name: string;
    email: string;
  };

createdAt: string;
updatedAt: string;
};