import { ApiProperty } from '@nestjs/swagger';

export class CreateQuestionDTO {
  @ApiProperty()
  content: string;

  @ApiProperty()
  fieldID: number;
}
