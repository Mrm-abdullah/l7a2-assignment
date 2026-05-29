export interface CreateIssueInput {
  title: string;
  description: string;
  type: "bug" | "feature";
  reporter_id: number;
}