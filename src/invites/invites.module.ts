import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AccountsModule } from "src/accounts/accounts.module";
import { AccountsService } from "src/accounts/accounts.service";
import { Accounts } from "src/entity/accounts.entity";
import { Invites } from "src/entity/invites.entity";
import { InvitesController } from "./invites.controller";
import { InvitesService } from "./invites.service";

@Module({
    imports:[TypeOrmModule.forFeature([Invites, Accounts])],
    controllers:[InvitesController],
    providers:[InvitesService],
    exports:[InvitesService]
})
export class InvitesModule {}