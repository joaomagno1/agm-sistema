import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { LoteCultivo } from '../../lote-cultivo/entities/lote-cultivo.entity';

@Entity('INSUMO')
export class Insumo {
  @PrimaryGeneratedColumn({ name: 'ID_INSUMO' })
  idInsumo: number;

  @Column({ name: 'DESCRICAO', length: 100, nullable: true })
  descricao: string;

  @ManyToOne(() => LoteCultivo)
  @JoinColumn({ name: 'LOTE_ID' })
  lote: LoteCultivo;

  @CreateDateColumn({ name: 'CREATED_AT' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'UPDATED_AT' })
  updatedAt: Date;
}
