export class CreateUserDto {
  email: string;
  name: string;
  password_hash: string;
  avatar?: string;
  cnic?: string;
  birthdate?: Date;
  phone?: string;
  address?: string;
}
