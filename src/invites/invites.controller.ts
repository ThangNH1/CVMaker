import { Body, Controller, Get, Post, Put, Query } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AccountsService } from "src/accounts/accounts.service";
import { ResetInviteDTO } from "./dto/reset.dto";
import { UpdateInviteDTO } from "./dto/update.dto";
import { InvitesService } from "./invites.service";

@ApiTags('Invite')
@ApiBearerAuth('access-token')
@Controller('invite')
export class InvitesController {
    constructor(
        private invitesService: InvitesService
    ) { }
    @Get('find')
    async findInviter(@Query('code') code: string){
        return await this.invitesService.findInviter(code).catch(err=>{return err})
    }
    @Post('reset')
    async resetInviteCount(@Body() resetInviteDTO:ResetInviteDTO){
        return await this.invitesService.resetInvite(resetInviteDTO)
    }
    @Put('update')
    async updateInvite(@Body() updateInvite:UpdateInviteDTO){
        return await this.invitesService.updateInvite(updateInvite)
    }
    
}