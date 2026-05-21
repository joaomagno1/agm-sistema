import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Usuario } from '../../usuario/entities/usuario.entity';

@Entity('GERENTE')
export class Gerente {
  @PrimaryGeneratedColumn({ name: 'ID_GERENTE' })
  idGerente: number;

  @Column({ name: 'COD_GERENTE', length: 10, unique: true })
  codGerente: string;

  @Column({ name: 'NOME_GERENTE', length: 50, nullable: true })
  nomeGerente: string;

  @OneToOne(() => Usuario)
  @JoinColumn({ name: 'ID_USUARIO' })
  usuario: Usuario;

  @CreateDateColumn({ name: 'CREATED_AT' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'UPDATED_AT' })
  updatedAt: Date;
}
