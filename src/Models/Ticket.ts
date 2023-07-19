export interface Ticket {
    id: string;
    type: string;
    expirationDate: Date;
    accessibleSpaces: string[];
}
