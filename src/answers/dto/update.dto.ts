import { ApiProperty } from '@nestjs/swagger';

export class UpdateAnswersDTO {
  @ApiProperty()
  id: number;
  @ApiProperty()
  answer: string;
}
