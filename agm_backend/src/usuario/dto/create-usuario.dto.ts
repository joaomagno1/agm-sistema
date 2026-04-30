import { IsString, IsEmail, IsNotEmpty, Matches } from 'class-validator';

export class CreateUsuarioDto {
  @IsString()
  @IsNotEmpty({ message: 'O primeiro nome não pode estar vazio.' })
  firstName!: string;

  @IsString()
  @IsNotEmpty({ message: 'O sobrenome não pode estar vazio.' })
  lastName!: string;

  @IsString()
  @IsNotEmpty({ message: 'O nome de usuário não pode estar vazio.' })
  username!: string;

  @IsEmail({}, { message: 'Formato de e-mail inválido.' })
  email!: string;

  @IsString()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/, {
    message: 'A senha deve ter 8+ caracteres, com maiúsculas, minúsculas e números.',
  })
  password!: string;
}