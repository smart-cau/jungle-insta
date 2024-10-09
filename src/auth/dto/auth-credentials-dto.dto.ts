import { IsEmail, IsString, Matches, MaxLength } from 'class-validator';

export class AuthCredentialsDto {
  @IsEmail()
  email: string;

  @IsString()
  @MaxLength(40)
  @Matches(/^[a-z0-9]+$/, {
    message: 'password only accepts english and number',
  })
  password: string;
}
