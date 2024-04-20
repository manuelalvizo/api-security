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
    const { password } = userObject;
    const plainToHash = await hash(password, 10);
    userObject = {...userObject, password:plainToHash};
    return this.userModel.create(userObject);
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
