import { ApiProperty } from '@nestjs/swagger';

export class RemoveResumeDTO {
  @ApiProperty()
  id: number;
}
