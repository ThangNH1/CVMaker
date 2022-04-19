import { ApiProperty } from '@nestjs/swagger';

export class UpdateResumeDTO {
  @ApiProperty()
  id: number;

  @ApiProperty()
  fieldId: number;
}
