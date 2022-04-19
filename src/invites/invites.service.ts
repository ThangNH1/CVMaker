import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Accounts } from "src/entity/accounts.entity";
import { Invites } from "src/entity/invites.entity";
import { Repository } from "typeorm";
import { FindInviteCodeDTO } from "./dto/find.dto";
import { ResetInviteDTO } from "./dto/reset.dto";
import { UpdateInviteDTO } from "./dto/update.dto";

@Injectable()
export class InvitesService {
    constructor(
        @InjectRepository(Invites)
        private invitesRepository:Repository<Invites>,
        @InjectRepository(Accounts)
        private accountsRepository:Repository<Accounts>
    ){}
    async findInviter(inviteCode:string):Promise<any>{
        // return this.invitesRepository.findOne({inviteCode:inviteCode})
        const getInviteId = await this.invitesRepository.findOne({inviteCode:inviteCode})
        return await this.accountsRepository.findOne(getInviteId.id)
    }
    async resetInvite(resetInvite:ResetInviteDTO):Promise<any>{
        let invite = await this.invitesRepository.findOne({id:resetInvite.id})
        return this.invitesRepository.update(invite.id,{inviteCount:0})
    }
    async updateInvite(updateInvite:UpdateInviteDTO):Promise<any>{
        let invite = await this.invitesRepository.findOne({id:updateInvite.id})
        if(updateInvite.newCode){
            return await this.invitesRepository.update(invite.id,{inviteCode:updateInvite.newCode})
        }
    }
}

/*
                           _
                        _ooOoo_
                       o8888888o
                       88" . "88
                       (| -_- |)
                       O\  =  /O
                    ____/`---'\____
                  .'  \\|     |//  `.
                 /  \\|||  :  |||//  \
                /  _||||| -:- |||||_  \
                |   | \\\  -  /'| |   |
                | \_|  `\`---'//  |_/ |
                \  .-\__ `-. -'__/-.  /
              ___`. .'  /--.--\  `. .'___
           ."" '<  `.___\_<|>_/___.' _> \"".
          | | :  `- \`. ;`. _/; .'/ /  .' ; |
          \  \ `-.   \_\_`. _.'_/_/  -' _.' /
===========`-.`___`-.__\ \___  /__.-'_.'_.-'================
                        `=--=-'                    
*/