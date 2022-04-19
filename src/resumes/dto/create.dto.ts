import { ApiProperty } from '@nestjs/swagger';

export class CreateResumeDTO {
  // @ApiProperty()
  // accountID: number;

  @ApiProperty()
  fieldID: number;
}

export class ResumeIdDTO {
  @ApiProperty()
  id: number;
}
