import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SetorModule } from './setor/setor.module'; // O CLI adicionou isso automaticamente
import { FuncionarioModule } from './funcionario/funcionario.module';
import { UsuarioModule } from './usuario/usuario.module';

@Module({
  imports: [
    // 1. Carrega as variáveis do .env primeiro
    ConfigModule.forRoot({
      isGlobal: true, 
    }),
    
    // 2. Conecta ao banco SOMENTE DEPOIS que o .env foi lido
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'mysql',
        host: process.env.DATABASE_HOST || 'localhost',
        port: parseInt(process.env.DATABASE_PORT as string, 10) || 3307,
        username: process.env.DATABASE_USERNAME || 'root',
        password: process.env.DATABASE_PASSWORD || '', 
        database: process.env.DATABASE_DATABASE || 'agm_db',
        
        // A MÁGICA ESTÁ AQUI: Carrega qualquer Entidade que criarmos automaticamente
        autoLoadEntities: true, 
        
        synchronize: process.env.DATABASE_SYNCHRONIZE === 'true',
      }),
    }),
    
    SetorModule,
    
    FuncionarioModule,
    
    UsuarioModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}