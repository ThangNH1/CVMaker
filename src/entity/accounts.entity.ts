import { Role } from 'src/enum/role.enum';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Invites } from './invites.entity';
import { Resumes } from './resumes.entity';

export class CurrentUserDTO {
  userId: number;
  username: string;
  role: Role;
  invite: string;
}
@Entity()
export class Accounts {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: true })
  username: string;
  @Column({ nullable: true })
  password: string;
  @Column({ nullable: true })
  fullname: string;
  @Column({ nullable: true })
  email: string;
  @Column({ default: '' })
  avatar_url: string;
  @Column({ default: Role.User })
  role: Role;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @OneToMany(() => Resumes, (resume) => resume.account)
  resumes: Resumes[];
  @OneToOne(() => Invites, (invite) => invite.account, { cascade: true })
  @JoinColumn()
  invite: Invites;
}
