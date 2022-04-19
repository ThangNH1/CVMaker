import { ApiProperty } from '@nestjs/swagger';
export class UpdateAccountDTO {
  @ApiProperty()
  // username: string;
  // @ApiProperty()
  // password: string;
  @ApiProperty({ nullable: true, required: false })
  newFullName: string;
  @ApiProperty({ nullable: true, required: false })
  newPassword?: string;
  @ApiProperty({ nullable: true, required: false })
  newEmail?: string;
}
