import { ApiProperty } from '@nestjs/swagger';

export class CreateAnswerDTO {
  @ApiProperty()
  questionId: number;
  @ApiProperty()
  resumeId: number;
  // @ApiProperty()
  // accountId: number;
  @ApiProperty()
  answer: string;
}
