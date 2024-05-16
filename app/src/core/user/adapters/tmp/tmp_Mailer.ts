import { MailerProvider, mailRequest } from "../../domain/Mailer";

export default class Mailer implements MailerProvider {

    public async mail ( { address }: mailRequest ) {
        return true
    }

    public async mailMagicLink ({ address, passKey }: mailRequest) {
        return true
    }

}