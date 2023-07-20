export interface Ticket {
  _id?: string;
  type: string;
  expirationDate: Date;
  accessibleSpaces: string[];
}
