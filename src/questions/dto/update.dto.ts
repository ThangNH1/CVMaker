import { ApiProperty } from '@nestjs/swagger';

export class UpdateQuestionDTO {
  @ApiProperty()
  id: number;
  @ApiProperty()
  content: string;
}
