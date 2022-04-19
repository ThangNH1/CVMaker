import { ApiProperty } from '@nestjs/swagger';

export class UpdateFieldDTO {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;
}
