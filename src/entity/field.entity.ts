import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Questions } from './question.entity';
import { Resumes } from './resumes.entity';

@Entity()
export class Fields {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: true })
  name!: string;
  @Column({ nullable: true })
  description: string;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @OneToMany(() => Questions, (question) => question.field)
  question: Questions[];
  @OneToMany(() => Resumes, (resume) => resume.field)
  resumes: Resumes[];
}
