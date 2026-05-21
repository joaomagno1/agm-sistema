import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Gerente } from '../../gerente/entities/gerente.entity';

@Entity('LOTE_CULTIVO')
export class LoteCultivo {
  @PrimaryGeneratedColumn({ name: 'ID_LOTE' })
  idLote: number;

  @Column({ name: 'PERIODO', type: 'int', nullable: true })
  periodo: number;

  @Column({ name: 'NOME_LOTE', length: 50, nullable: true })
  nomeLote: string;

  @ManyToOne(() => Gerente)
  @JoinColumn({ name: 'ID_GERENTE' })
  gerente: Gerente;

  @CreateDateColumn({ name: 'CREATED_AT' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'UPDATED_AT' })
  updatedAt: Date;
}
