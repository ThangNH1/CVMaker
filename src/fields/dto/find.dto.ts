import { ApiProperty } from '@nestjs/swagger/dist';

export class FindFieldDTO {
  @ApiProperty()
  id: number;
}
