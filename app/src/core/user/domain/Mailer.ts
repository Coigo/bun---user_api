
export type mailRequest = {
    address: string,
    link:string 
}

export interface MailerProvider {
    mail: ({ address }: mailRequest ) => Promise<boolean>
    mailMagicLink: ({ address, link }: mailRequest ) => Promise<boolean>
}