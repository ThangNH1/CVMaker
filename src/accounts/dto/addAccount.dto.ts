import { ApiProperty } from '@nestjs/swagger';
export class AddAccountDTO {
  @ApiProperty()
  username: string;
  @ApiProperty()
  password: string;
  @ApiProperty()
  fullname: string;
  @ApiProperty()
  email: string;
  @ApiProperty({ required: false })
  inviteCode?: string;
}
