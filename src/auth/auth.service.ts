import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { User, UserDocument } from 'src/user/schema/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { hash, compare } from 'bcrypt';
import { LoginAuthDto } from './dto/login-auth.dto';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {

  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private jwtService:JwtService
  ){}

  async register(userObject: RegisterAuthDto) {
    try{
      const { password, ...userDataWithoutPassword } = userObject;
      const plainToHash = await hash(password, 10);
      const userWithHashedPassword = { ...userDataWithoutPassword, password: plainToHash };
      const createdUser = await this.userModel.create(userWithHashedPassword);
      // Eliminar la contraseña del usuario creado antes de devolverlo
      const { password: _, ...userWithoutPassword } = createdUser.toJSON();
      return userWithoutPassword;
    }catch (error) {
      if (error.code === 11000) {
        throw new HttpException(
          'Ya existe un usuario con ese correo, verificar información',
          HttpStatus.CONFLICT
        );
      }
      throw new HttpException(
        'Ocurrió un error al registrar el usuario',
        HttpStatus.CONFLICT
      );
    }
    
  }

  async login(userLogin: LoginAuthDto) {
    const { email, password } = userLogin;
    const findUser = await this.userModel.findOne({ email });
    if (!findUser) throw new HttpException('USER_NOT_FOUND', HttpStatus.NOT_FOUND);
  
    const checkPassword = await compare(password, findUser.password);
    if (!checkPassword) throw new UnauthorizedException();
  
    // Create a new object excluding the password field
    const sanitizedUser = {
      id: findUser._id,
      name: findUser.name,
      roles: findUser.roles,
    };
  
    const token = await this.jwtService.sign(sanitizedUser);
    const data = { user: sanitizedUser, token };
    return data;
  }
  

}
