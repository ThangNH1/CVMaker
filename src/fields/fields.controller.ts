import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateFieldDTO } from './dto/create.dto';
import { FieldsService } from './fields.service';
import { RemoveFieldDTO } from './dto/remove.dto';
import { UpdateFieldDTO } from './dto/update.dto';
import { FindFieldDTO } from './dto/find.dto';
import { Roles } from 'src/authorization/role.decorator';
import { Role } from 'src/enum/role.enum';
import { JwtAuthGuard } from 'src/guard/jwt-auth.guard';
import { RolesGuard } from 'src/guard/roles.guard';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
@ApiTags('Fields')
@ApiBearerAuth('access-token')
@Roles(Role.Admin)
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('fields')
export class FieldsController {
  constructor(private fieldsService: FieldsService) {}

  // Post Create Field
  @Post('create')
  @ApiOperation({ summary: 'Create a field with name and description' })
  @ApiConsumes('application/x-www-form-urlencoded')
  async createField(@Body() createdField: CreateFieldDTO) {
    return await this.fieldsService.createField(createdField);
  }
  // Delte Remove Field
  @Delete('remove')
  @ApiOperation({ summary: 'Remove field by id' })
  @ApiConsumes('application/x-www-form-urlencoded')
  async removeField(@Body() removedField: RemoveFieldDTO) {
    return await this.fieldsService.removeField(removedField);
  }
  //Put Update Field
  @Put('update')
  @ApiOperation({ summary: 'Update Field by id with new name and description' })
  @ApiConsumes('application/x-www-form-urlencoded')
  async updateField(@Body() updatedField: UpdateFieldDTO) {
    return await this.fieldsService.updateField(updatedField);
  }
  // Get Field List
  @Get('list')
  @ApiOperation({ summary: 'Get all fields' })
  async getFields() {
    return await this.fieldsService.getFieldList();
  }
  // Get Field
  @Get('find')
  @ApiOperation({ summary: 'Find field by id' })
  async getField(@Query() field: FindFieldDTO) {
    return await this.fieldsService.findField(field);
  }
}
