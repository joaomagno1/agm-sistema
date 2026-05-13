import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { LoteCultivo } from '../../lote-cultivo/entities/lote-cultivo.entity';
import { Funcionario } from '../../funcionario/entities/funcionario.entity';

@Entity('ATRIBUICAO_LOTE')
export class AtribuicaoLote {
  @PrimaryGeneratedColumn({ name: 'ID_ATRIBUICAO' })
  idAtribuicao: number;

  @ManyToOne(() => LoteCultivo)
  @JoinColumn({ name: 'LOTE_ID' })
  lote: LoteCultivo;

  @ManyToOne(() => Funcionario)
  @JoinColumn({ name: 'FUNCIONARIO_ID' })
  funcionario: Funcionario;

  @CreateDateColumn({ name: 'CREATED_AT' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'UPDATED_AT' })
  updatedAt: Date;
}
