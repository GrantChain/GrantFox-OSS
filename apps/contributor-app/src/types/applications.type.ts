/**
 * Shared application types used by My Applications table and related components.
 */

/**
 * Status for a contributor's application lifecycle.
 */
export type ApplicationStatus =
  | "AWAITING_ASSIGNMENT"
  | "PR_EXPECTED"
  | "IN_REVIEW"
  | "COMPLETED"
  | "ASSIGNED_TO_OTHER";

/**
 * Row model for a single application entry in the table.
 */
export interface ApplicationRow {
  id: number;
  number: number;
  title: string;
  repo: string; // owner/name
  html_url: string;
  comments: number;
  created_at: string;
  applied_at: string | null;
  assignee: string | null;
  state: "open" | "closed";
  status: ApplicationStatus;
  labels: string[];
  prNumber: number | null;
}
