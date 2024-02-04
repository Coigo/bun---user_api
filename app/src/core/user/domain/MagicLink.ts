

export interface IMagicLink {
    generateUUID: () => string
}

export type TokenType = {
    token: string;
    email: string;
    valid: number;
    createdAt: Date;
}

