import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Accounts } from './accounts.entity';

@Entity()
export class Invites {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: true })
  inviteCode: string;
  @Column({ nullable: true })
  inviteBy: string;
  @Column({ nullable: true, default: 0 })
  inviteCount: number;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @OneToOne(() => Accounts, (account) => account.invite)
  @JoinColumn()
  account: Accounts;
}
