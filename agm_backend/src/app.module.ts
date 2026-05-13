import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SetorModule } from './setor/setor.module';
import { FuncionarioModule } from './funcionario/funcionario.module';
import { UsuarioModule } from './usuario/usuario.module';
import { AuthModule } from './auth/auth.module';
import { MailModule } from './mail/mail.module';
import { GerenteModule } from './gerente/gerente.module';
import { LoteCultivoModule } from './lote-cultivo/lote-cultivo.module';
import { InsumoModule } from './insumo/insumo.module';
import { AtribuicaoLoteModule } from './atribuicao-lote/atribuicao-lote.module';
import { AplicacaoInsumoModule } from './aplicacao-insumo/aplicacao-insumo.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'mysql',
        host: process.env.DATABASE_HOST || 'localhost',
        port: parseInt(process.env.DATABASE_PORT as string, 10) || 8081,
        username: process.env.DATABASE_USERNAME || 'root',
        password: process.env.DATABASE_PASSWORD || '',
        database: process.env.DATABASE_DATABASE || 'agm_db',
        autoLoadEntities: true,
        synchronize: process.env.DATABASE_SYNCHRONIZE === 'true',
      }),
    }),

    SetorModule,
    FuncionarioModule,
    UsuarioModule,
    AuthModule,
    MailModule,
    GerenteModule,
    LoteCultivoModule,
    InsumoModule,
    AtribuicaoLoteModule,
    AplicacaoInsumoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}