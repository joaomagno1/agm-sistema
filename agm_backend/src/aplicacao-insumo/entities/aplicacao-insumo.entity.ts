import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Funcionario } from '../../funcionario/entities/funcionario.entity';
import { Insumo } from '../../insumo/entities/insumo.entity';

@Entity('APLICACAO_INSUMO')
export class AplicacaoInsumo {
  @PrimaryGeneratedColumn({ name: 'ID_APLICACAO' })
  idAplicacao: number;

  @ManyToOne(() => Funcionario)
  @JoinColumn({ name: 'FUNCIONARIO_ID' })
  funcionario: Funcionario;

  @ManyToOne(() => Insumo)
  @JoinColumn({ name: 'INSUMO_ID' })
  insumo: Insumo;

  @Column({
    name: 'QUANTIDADE',
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: true,
  })
  quantidade: number;

  @CreateDateColumn({ name: 'CREATED_AT' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'UPDATED_AT' })
  updatedAt: Date;
}
