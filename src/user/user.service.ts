import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserService {

  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async findAll(page: number, limit: number) {
    let users;
    let totalElements;
    const skip = (page - 1) * limit;
    try{
      const [resultList, totalList] = await Promise.all([
        this.userModel.find({},  '-__v -_id -password').skip(skip).limit(limit), // Lista paginada
        this.userModel.countDocuments() // Total de elementos
      ]);
      users = resultList;
      totalElements = totalList; // 
    } catch (error) {
      throw new HttpException('Ocurrió un error al obtener los usuarios',HttpStatus.CONFLICT);
    }
    if (users.length === 0) {
      throw new HttpException('No se encontraron elementos', HttpStatus.NOT_FOUND);
    }
    return { users, totalElements };
  }

  async findOne(id: string) {
    var existingUser = "";
    try {
      existingUser = await this.userModel.findOne({ id });
     
    } catch (error) {
      throw new HttpException('Ocurrió un error al obtener el usuario',HttpStatus.CONFLICT);
    }
    if (!existingUser) {
      throw new HttpException('El usuario no se encontró', HttpStatus.NOT_FOUND);
    }
    return existingUser;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    let updatedUser
    try {
      updatedUser = await this.userModel.findOneAndUpdate({ id }, updateUserDto, { new: true });

    } catch (error) {
      if (error.code === 11000 && error.keyPattern && error.keyPattern.title) {
        throw new HttpException(
          'Ya existe un usuario con ese correo, verificar información',
          HttpStatus.CONFLICT
        );
      }
      throw new HttpException(
        'Ocurrió un error al actualizar el usuario',
        HttpStatus.CONFLICT
      );
    }

    if (!updatedUser) {
      throw new HttpException('El usuario no se encontró', HttpStatus.NOT_FOUND);
    }
    const { password, _id, ...userWithoutPasswordAndId } = updatedUser.toObject();
    return userWithoutPasswordAndId;
  }

  async remove(id: string) {
    let deletedUser;
    try {
      deletedUser = await this.userModel.findOneAndDelete({ id });

    } catch (error) {
      throw new HttpException('Ocurrió un error al eliminar el usuario',HttpStatus.CONFLICT);
    }
    if (!deletedUser) {
      throw new HttpException('El usuario que se intento eliminar, no existe', HttpStatus.NOT_FOUND);
    }
  }
}
