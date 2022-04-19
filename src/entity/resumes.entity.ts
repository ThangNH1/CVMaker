import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Accounts } from './accounts.entity';
import { Fields } from './field.entity';
import { Answers } from './answers.entity';

@Entity()
export class Resumes {
  @PrimaryGeneratedColumn()
  id: number;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @ManyToOne(() => Accounts, (account) => account.resumes, {
    cascade: true,
  })
  account: Accounts;
  @ManyToOne(() => Fields, (field) => field.resumes, {
    cascade: true,
  })
  field: Fields;
  @OneToMany(() => Answers, (answers) => answers.resume)
  answers: Answers[];
}
