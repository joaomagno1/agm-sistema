import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    // Configuração do carteiro (SMTP). 
    // Nota tática: Substitua pelos dados do seu Mailtrap ou Gmail.
    this.transporter = nodemailer.createTransport({
      host: 'sandbox.smtp.mailtrap.io', // Exemplo do Mailtrap
      port: 2525,
      auth: {
        user: 'SEU_USUARIO_AQUI', // Troque pela sua credencial do Mailtrap
        pass: 'SUA_SENHA_AQUI',   // Troque pela sua credencial do Mailtrap
      },
    });
  }

  async enviarEmailConfirmacao(email: string, nome: string, token: string) {
    const linkConfirmacao = `http://localhost:5173/validar-email?token=${token}`; // O porto do seu React

    const mailOptions = {
      from: '"Império AGM" <noreply@agm.com>',
      to: email,
      subject: '🛡️ Convoque-se: Valide o seu e-mail no Império AGM!',
      html: `
        <div style="font-family: sans-serif; padding: 20px;">
          <h2>Saudações, ${nome}!</h2>
          <p>O seu registro no império foi recebido, mas o seu brasão ainda está pendente.</p>
          <p>Clique no link abaixo para validar a sua identidade e ter acesso aos nossos salões:</p>
          <a href="${linkConfirmacao}" style="background-color: #2c3e50; color: white; padding: 10px 15px; text-decoration: none; border-radius: 5px; display: inline-block; margin-top: 10px;">
            Validar Identidade
          </a>
          <p style="margin-top: 20px; font-size: 12px; color: gray;">Se você não solicitou este recrutamento, ignore este corvo.</p>
        </div>
      `,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log(`Corvo enviado com sucesso para ${email}`);
    } catch (error) {
      console.error('Falha ao enviar o corvo: ', error);
    }
  }
}