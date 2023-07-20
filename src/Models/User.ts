import { Ticket } from "./Ticket";
export interface User {
  _id: string;
  login: string;
  password: string;
  role: string;
  tickets: Ticket[];
}
