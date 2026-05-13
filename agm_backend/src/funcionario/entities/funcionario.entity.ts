import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Usuario } from '../../usuario/entities/usuario.entity';

@Entity('FUNCIONARIO')
export class Funcionario {
  @PrimaryGeneratedColumn({ name: 'ID_FUNCIONARIO' })
  id: number;

  @Column({ name: 'COD_FUNCIONARIO', length: 10, unique: true })
  codFuncionario: string;

  @Column({ name: 'NOME_FUNCIONARIO', length: 50, nullable: true })
  nomeFuncionario: string;

  @Column({ name: 'IDADE', nullable: true })
  idade: number;

  @ManyToOne(() => Usuario)
  @JoinColumn({ name: 'ID_USUARIO' })
  usuario: Usuario;

  @CreateDateColumn({ name: 'CREATED_AT' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'UPDATED_AT' })
  updatedAt: Date;
}
