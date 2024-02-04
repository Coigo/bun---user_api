
import { Resend } from 'resend'
import dotenv from 'dotenv'
import { MailerProvider, mailRequest } from "../../domain/Mailer";


dotenv.config()


export default class Mailer implements MailerProvider {

    public async mail ({address}: mailRequest) {
            const KEY = process.env.resend_key

            const resend = new Resend(KEY)

            resend.emails.send({
            from: 'onboarding@resend.dev',
            to: address,
            subject: 'no-reply',
            html: `<h1>oiiiiiiiii<h1/>`
            }).then((result: any) => {
                console.log(result)
            }).
            catch((err: any) => {
                return false
            })
            return true
            
    }

    public async mailMagicLink ({address, link}: mailRequest) {
        const KEY = process.env.resend_key

        const resend = new Resend(KEY)

        resend.emails.send({
        from: 'onboarding@resend.dev',
        to: address,
        subject: 'no-reply',
        html: `<h1>${link}<h1/>`
        }).then((result: any) => {
            console.log(result)
        }).
        catch((err: any) => {
            return false
        })
        return true

}



}