import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('SETOR') // Nome exato da tabela no MySQL
export class Setor {
  @PrimaryGeneratedColumn({ name: 'ID_SETOR' })
  id: number;

  @Column({ name: 'COD_SETOR', length: 10, unique: true })
  codSetor: string;

  @Column({ name: 'NOME_SETOR', length: 50, nullable: true })
  nomeSetor: string;

  @CreateDateColumn({ name: 'CREATED_AT' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'UPDATED_AT' })
  updatedAt: Date;
}