import { ApiProperty } from "@nestjs/swagger";

export class FindInviteCodeDTO {
    @ApiProperty()
    code: string
}