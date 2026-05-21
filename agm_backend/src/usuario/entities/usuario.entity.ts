import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Setor } from '../../setor/entities/setor.entity';

@Entity('USUARIO')
export class Usuario {
  @PrimaryGeneratedColumn({ name: 'ID_USUARIO' })
  idUsuario: number;

  @Column({ name: 'COD_USUARIO', length: 10, unique: true })
  codUsuario: string;

  @Column({ name: 'NOME_USUARIO', length: 50, nullable: true })
  nomeUsuario: string;

  @Column({ name: 'EMAIL', length: 100, nullable: true })
  email: string;

  @Column({ name: 'SENHA', length: 100, nullable: true })
  senha: string;

  @Column({ name: 'FOTO', length: 200, nullable: true })
  foto: string;

  @Column({ name: 'TIPO', type: 'int', default: 1 })
  tipo: number;

  @Column({ name: 'STATUS_VALIDACAO', type: 'boolean', default: false })
  statusValidacao: boolean;

  @Column({
    name: 'RECOVERY_TOKEN',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  recoveryToken: string | null;

  @Column({
    name: 'REFRESH_TOKEN',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  refreshToken: string | null;

  @Column({ name: 'TOKEN_EXPIRES', type: 'datetime', nullable: true })
  tokenExpires: Date | null;

  @ManyToOne(() => Setor)
  @JoinColumn({ name: 'ID_SETOR' })
  setor: Setor;

  @CreateDateColumn({ name: 'CREATED_AT' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'UPDATED_AT' })
  updatedAt: Date;
}
