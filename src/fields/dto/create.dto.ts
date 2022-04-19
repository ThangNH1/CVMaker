import { ApiProperty } from '@nestjs/swagger';

export class CreateFieldDTO {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;
}
