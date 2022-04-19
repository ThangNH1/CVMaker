import { ApiProperty } from '@nestjs/swagger';

export class RemoveFieldDTO {
  @ApiProperty()
  id: number;
}
