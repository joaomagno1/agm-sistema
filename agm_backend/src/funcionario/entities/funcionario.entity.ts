import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Setor } from '../../setor/entities/setor.entity';

@Entity('funcionario') // Define o nome exato da tabela no MySQL
export class Funcionario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  nome: string;

  @Column({ length: 50 })
  cargo: string;

  // Decimal para dinheiro: 10 dígitos no total, 2 após a vírgula (ex: 99999999.99)
  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  salario: number;

  // ForeignKey
  // Muitos Funcionários (@Many) pertencem a Um Setor (ToOne)"
  @ManyToOne(() => Setor)
  @JoinColumn({ name: 'setor_id' }) // Como a coluna se vai chamar no banco
  setor: Setor;
}