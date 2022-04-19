import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Fields } from '../entity/field.entity';
import { CreateFieldDTO } from './dto/create.dto';
import { RemoveFieldDTO } from './dto/remove.dto';
import { UpdateFieldDTO } from './dto/update.dto';
import { FindFieldDTO } from './dto/find.dto';
const RELATION = ['question']; //, 'resumes'
@Injectable()
export class FieldsService {
  constructor(
    @InjectRepository(Fields)
    private fieldsRepository: Repository<Fields>,
  ) {}

  // create a Field
  async createField(createdField: CreateFieldDTO): Promise<any> {
    return this.fieldsRepository.save(createdField);
  }

  // get Fields List
  async getFieldList(): Promise<Fields[]> {
    return this.fieldsRepository.find({ relations: RELATION });
  }

  // remove a Field
  async removeField(RemovedField: RemoveFieldDTO): Promise<any> {
    const field = await this.fieldsRepository.findOne(RemovedField);
    if (field) return this.fieldsRepository.remove(field);
    throw new NotFoundException();
  }

  // update a Field
  async updateField(updatedField: UpdateFieldDTO): Promise<any> {
    const field = await this.fieldsRepository.findOne(updatedField.id);
    if (!field) throw new NotFoundException();
    return this.fieldsRepository.update(updatedField.id, {
      name: updatedField.name,
      description: updatedField.description,
    });
  }
  // find a field
  async findField(field: FindFieldDTO): Promise<any> {
    const theField = await this.fieldsRepository.findOne(field, {
      relations: RELATION,
    });
    if (theField) return theField;
    throw new NotFoundException();
  }
}
