import { Module } from '@nestjs/common';
import { MailService } from './mail.service';

@Module({
  providers: [MailService],
  exports: [MailService], // <-- Permite que outros usem os corvos
})
export class MailModule {}