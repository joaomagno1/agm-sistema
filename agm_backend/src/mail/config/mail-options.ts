export interface MailPayload {
  to: string | string[];
  from: string;
  subject: string;
  text: string;
  html?: string;
  context: { [key: string]: any };
  template?: string;
  attachments?: any[];
}
