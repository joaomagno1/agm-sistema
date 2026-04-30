import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('usuario')
export class Usuario {
  @PrimaryGeneratedColumn({ name: 'idUsuario' })
  idUsuario!: number;

  @Column({ length: 50 })
  firstName!: string;

  @Column({ length: 50 })
  lastName!: string;

  @Column({ unique: true, length: 50 })
  username!: string;

  @Column({ unique: true, length: 100 })
  email!: string;

  @Column()
  password!: string;

  @Column({ type: 'boolean', default: false })
  status_validacao!: boolean;

  @Column({ type: 'varchar', length: 255, nullable: true })
  recovery_token!: string | null;

  @Column({ type: 'datetime', nullable: true })
  token_expires!: Date | null;
}
