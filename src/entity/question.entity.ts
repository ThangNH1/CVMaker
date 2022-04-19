import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Answers } from './answers.entity';
import { Fields } from './field.entity';

@Entity()
export class Questions {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  content: string;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @OneToMany(() => Answers, (answer) => answer.question)
  answers: Answers[];
  @ManyToOne(() => Fields, (field) => field.question, {
    cascade: true,
  })
  field: Fields;
}
