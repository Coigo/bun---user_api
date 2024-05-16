
export type mailRequest = {
    address: string,
    passKey:string 
}

export interface MailerProvider {
    mail: ({ address }: mailRequest ) => Promise<boolean>
    mailMagicLink: ({ address, passKey }: mailRequest ) => Promise<boolean>
}