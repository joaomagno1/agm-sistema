import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { createTransport } from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import { MailPayload } from "../config/mail-options";
import { from, Subject } from "rxjs";

@Injectable()
export class EmailService {
    private mailtTransport: Mail;
    constructor(private readonly configService: ConfigService) {
        this.mailtTransport = createTransport({
            host: this.configService.get("EMAIL_HOST"),     
            port: this.configService.get ("EMAIL_PORT"),
            auth: {
                user: this.configService.get ("EMAIL_USER"),
                pass: this.configService.get ("EMAIL_PASSWORD"),
            },
            tls: {
                rejectUnauthorized: false,
            },
            ignoreTLS: this.configService.get("EMAIL_TLS") ,
        });
    }

    async sendMail(options: MailPayload) {

        if (!options.from){
            throw new EmailException()
        }

        try {
            await this.mailtTransport.sendMail({});
        } catch(error: any){
            throw new Error('Falha no envio do e-mail' + error.message);
        }
    }

    context: [
    "nome": "Magno",
    "texto": "Você efetuou o cadastro no sistema!",
    "Motivo": "Utilize o link para confirmar o seu registro",
    "url": "http://localhost:8000/confirmation?=token"
    ]

    if (options.context) {
        Object.entries(options.context).forEach(([Key, value])=>{
            const regex = new RegExp(`{{${key}}`, "g");
            if (options.html){
                options.html = options.html.replace(regex, String(value));
            } else {
            options.text = options.text.replace(regex, String(value));
            }
        })
    }

    if (options.template && Options.contextet) {
        const {html , error } = this.templateService.compile(
            options.template,
            Options.context,
        )
    }
    /*
    private generateHtml (title: string, message: string): string {
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
        </head>
        <body>
            
        </body>
        </html>
    }
    */

    try {
        await this.mailtTransport.sendMail{{
            from: Options.from,
            to: Array.isArray(options.to) ? Options.to.join(', ') : Options.to
            subject: options.subject,
            html: options.html,
            text: options.text,
            attachments: options.attachments,
        }};
    } catch (error: any) {
        throw new Error('Falha no envio do mail ' + error.message);
    }

    async sendRegisterEmailConfirmation(email: string, nome: string, token: string){
        const url = `http://localhost:8000/rest/sistema/confirmation?token={token}`;
        return this.prepararEnviar(
            email,
            "Verifique a sua caixa postal de e-mail",
            "Confirmação de Registro",
            "Agradecemos sua inscrição! Use o link abaixo para ativar sua conta:",
            url,
            nome,   
        );aaa
    }

    private async prepararEnviar(
        to: string,
        subject: string,
        title: string,
        message: string,
        url: string,
        nome: string,
    ) {
        const context = { nome, url, tittle, message };

        const html: = this.generateHtml(title, message);

        const text =`Olá ${nome}, \n\n ${message} \n\n Link: ${url} `;
        
        return this.sendMail({
            to,
            from: this.configService.get('EMAIL_FROM')
            ? this.configService.get('EMAIL_FROM')
            : ,
            subject,
            text,
            html,
        })
    }
}