export type Severity = "error" | "warning" | "info" | "success";

export type AlertType = {
  isManual?: boolean;
  msg: string;
  severity: Severity;
};

export interface Response {
  message: string;
  status: string;
}
