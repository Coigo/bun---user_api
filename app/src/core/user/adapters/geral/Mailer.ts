
import { Resend } from 'resend'
import dotenv from 'dotenv'
import type { MailerProvider, mailRequest } from "../../domain/Mailer";


dotenv.config()


export default class Mailer implements MailerProvider {

    public async mail ({address}: mailRequest) {
            const key = process.env.resendKey

            const resend = new Resend(key)

            resend.emails.send({
            from: 'onboarding@resend.dev',
            to: address,
            subject: 'no-reply',
            html: `<h1>oiiiiiiiii<h1/>${'aaa'}`
            }).then((result: unknown) => {
                console.log(result)
            }).
            catch((err: unknown) => {
                return false
            })
            return true
            
    }

    public async mailMagicLink ({address, passKey}: mailRequest) {
        const key = process.env.resendKey

        const resend = new Resend(key)

        resend.emails.send({
        from: 'onboarding@resend.dev',
        to: address,
        subject: 'no-reply',
        html: `<h1>${passKey}<h1/>`
        }).then((result: unknown) => {
            console.log(result)
        }).
        catch((err: unknown) => {
            return false
        })
        
        return true

}



}