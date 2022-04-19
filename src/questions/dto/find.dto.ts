import { ApiProperty } from '@nestjs/swagger';

export class FindQuestionDTO {
  @ApiProperty()
  id: number;
}
