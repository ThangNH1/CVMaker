import { ApiProperty } from '@nestjs/swagger';

export class RemoveQuestionDTO {
  @ApiProperty()
  id: number;
}
