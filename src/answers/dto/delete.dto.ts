import { ApiProperty } from '@nestjs/swagger';

export class RemoveAnswerDTO {
  @ApiProperty()
  id: number;
}
