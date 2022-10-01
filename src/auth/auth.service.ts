import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { FirebaseService } from 'src/firebase/firebase.service';
import { UsersService } from 'src/users/users.service';
import { verifyPassword } from 'src/utils/hashing';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, UserCredential } from 'firebase/auth';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { FirebaseError } from 'firebase/app';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private firebaseSevice: FirebaseService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);

    const isPasswordValid = await verifyPassword(pass, user.password_hash);
    if (isPasswordValid) {
      const { password_hash, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: User) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async loginFirebase(email: string, password: string) {
    try {
      const userCredential: UserCredential = await signInWithEmailAndPassword(
        this.firebaseSevice.auth,
        email,
        password
      )

      const user = await this.usersService.findOneByEmail(userCredential.user.email);

      const payload = { email: user.email, sub: user.id };
      return {
        access_token: this.jwtService.sign(payload),
      };
        
    } catch (error) {
      if (error instanceof FirebaseError) {
        throw new BadRequestException(error) 
      }
      
      console.warn(`ERROR: ${error}`) 
      throw new BadRequestException(error)     
    }
  }


  async registerFirebase(body: CreateUserDto) {
    const existingUser = await this.usersService.findOneByEmail(body.email)

    if (existingUser) {
      throw new BadRequestException('User email already exists')
    }

    const userCredential: UserCredential = await createUserWithEmailAndPassword(
      this.firebaseSevice.auth,
      body.email,
      body.password_hash
    )

    if (userCredential) {
      return this.usersService.create(body)
    }
  }
}
