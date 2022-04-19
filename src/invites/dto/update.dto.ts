import { ApiProperty } from "@nestjs/swagger";

export class UpdateInviteDTO {
    @ApiProperty()
    id:number
    @ApiProperty()
    newCode?:string
}