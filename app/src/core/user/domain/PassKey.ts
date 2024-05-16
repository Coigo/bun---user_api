export interface IPassKey {
    generateKey: () => string
}

export type TokenType = {
    id:number
    passKey: string;
    email: string;
    valid: number;
    createdAt: Date;
}

export type LoginType = {
    passKey: string;
    email: string;

}