import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  BeforeInsert,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Accounts } from './accounts.entity';
import { Questions } from './question.entity';
import { Resumes } from './resumes.entity';

@Entity()
export class Answers {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  answer: string;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @ManyToOne(() => Resumes, (resume) => resume.answers, {
    cascade: true,
  })
  resume: Resumes;
  @ManyToOne(() => Questions, (question) => question.answers, {
    cascade: true,
  })
  question: Questions;
}
