import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Accounts } from 'src/entity/accounts.entity';
import { Fields } from 'src/entity/field.entity';
import { Resumes } from 'src/entity/resumes.entity';
import { Repository } from 'typeorm';
import { CreateResumeDTO } from './dto/create.dto';
import { RemoveResumeDTO } from './dto/remove.dto';
import { UpdateResumeDTO } from './dto/update.dto';
import * as PDFDocument from 'pdfkit';
import * as fs from 'fs';
import { argv } from 'process';
const RELATION = ['answers', 'field'];
@Injectable()
export class ResumesService {
  constructor(
    @InjectRepository(Accounts)
    private accountRepository: Repository<Accounts>,
    @InjectRepository(Fields)
    private fieldRepository: Repository<Fields>,
    @InjectRepository(Resumes)
    private resumeRepository: Repository<Resumes>,
  ) { }
  // create a Resumes
  async createResumes(
    accountID: number,
    createdResume: CreateResumeDTO,
  ): Promise<any> {
    const theAccount = await this.accountRepository.findOne({
      id: accountID,
    });
    const theField = await this.fieldRepository.findOne({
      id: createdResume.fieldID,
    });
    if (!theAccount || !theField) return new NotFoundException();
    return this.resumeRepository.save({ account: theAccount, field: theField });
  }
  //get Resumes List
  async getResumesList(): Promise<Resumes[]> {
    return this.resumeRepository.find({ relations: RELATION });
  }
  //remove Resume
  async removeResume(removedResume: RemoveResumeDTO): Promise<any> {
    const resume = await this.resumeRepository.findOne(removedResume);
    if (!resume) throw new NotFoundException();
    return this.resumeRepository.remove(resume);
  }
  //update Resume
  async updateResume(updatedResume: UpdateResumeDTO): Promise<any> {
    const resume = await this.resumeRepository.findOne({
      id: updatedResume.id,
    });
    const field = await this.fieldRepository.findOne({
      id: updatedResume.fieldId,
    });
    if (!resume || !field) throw new NotFoundException();
    return this.resumeRepository.update(updatedResume.id, { field: field });
  }
  // get final resume
  async getCVList(): Promise<Resumes[]> {
    return await this.resumeRepository.find({
      relations: ['account', 'field', 'answers', 'answers.question'],
    });
  }
  //  get final resume by id
  async getCVbyId(userId: number, id: number): Promise<Resumes> {
    // const account = await this.accountRepository.findOne({ id: userId });
    // const cv = await this.resumeRepository.findOne({
    //   where: { id, account },
    //   relations: ['account', 'field', 'answers', 'answers.question'],
    // });
    const cv = await this.resumeRepository
      .createQueryBuilder('resume')
      .leftJoinAndSelect('resume.account', 'account')
      .leftJoinAndSelect('resume.field', 'field')
      .leftJoinAndSelect('resume.answers', 'answer')
      .leftJoinAndSelect('answer.question', 'question')

      .where('resume.id =:id', { id })
      // .andWhere('answer.accountId =:userId', { userId })
      .andWhere('question.field = resume.field')
      .getOne();
    if (!cv) throw new NotFoundException();
    return cv;
  }
  // async generatePDF(id: number):Promise<any> {
  //   let cv = await this.getCVbyId(id)
  //   carbone.render('src/resumes/template.odt', cv, function (err, result) {
  //     if (err) {
  //       return console.log(err);
  //     }
  //     fs.writeFileSync('result.pdf', result);
  //   })
  // }

  // async generatePDF(id:number):Promise<any>{
  //   let data = await this.getCVbyId(id)
  //   let cv = {data,convertTo : 'pdf'}

  //   const writeStream = fs.createWriteStream(path.join('src', 'resumes', 'result.odt'))
  //   const carboneStream = carboneSDK.render(path.join('src', 'resumes', 'template.odt'), cv)

  //   carboneStream.on('error', (err) => {
  //     console.error(err)
  //   })

  //   writeStream.on('close', () => {
  //     console.log('File rendered')
  //   })

  //   carboneStream.pipe(writeStream)
  // }



  // async createPDF(userId: number, id: number, res) {
  //   const cv = await this.getCVbyId(userId, id);
  //   const doc = new PDFDocument();
  //   const path = `src/file/${Date.now()}.pdf`;
  //   let test;
  //   doc.pipe((test = fs.createWriteStream(path)));
  //   doc.registerFont('Times New Roman ', 'src/font-times-new-roman.ttf');
  //   doc.image(cv.account.avatar_url, 200, 50, {
  //     fit: [250, 300],
  //     align: 'center',
  //   });
  //   doc.moveDown();

  //   doc.fontSize(26).text(cv.account.fullname, 100, 300, { align: 'center' });
  //   doc
  //     .font('Times New Roman ')
  //     .fontSize(18)
  //     .text(cv.account.applyPosition, { align: 'center' })
  //     .moveDown();
  //   doc.fontSize(20).text('Contact Info');
  //   doc.fontSize(14).text('  - ' + cv.account.email);

  //   doc.moveDown();
  //   doc.fontSize(20).text('Skills');
  //   doc
  //     .fontSize(14)
  //     .text('  - ' + cv.account.profile.skills)
  //     .moveDown();

  //   doc.fontSize(20).text('Interest');
  //   doc
  //     .fontSize(14)
  //     .text('  - ' + cv.account.profile.interest)
  //     .moveDown();

  //   doc.fontSize(20).text('Objective');
  //   doc
  //     .fontSize(14)
  //     .text('  - ' + cv.account.profile.objective)
  //     .moveDown();

  //   doc.fontSize(20).text('Education');
  //   doc
  //     .fontSize(14)
  //     .text('  - ' + cv.account.profile.education)
  //     .moveDown();

  //   doc.fontSize(20).text('Work Experience');
  //   doc
  //     .fontSize(14)
  //     .text('  - ' + cv.account.profile.workExperience)
  //     .moveDown();

  //   doc.fontSize(20).text('Activities');
  //   doc
  //     .fontSize(14)
  //     .text('  - ' + cv.account.profile.activities)
  //     .moveDown();

  //   doc.fontSize(20).text('Award');
  //   doc
  //     .fontSize(14)
  //     .text('  - ' + cv.account.profile.award)
  //     .moveDown();

  //   doc.fontSize(20).text('Certification');
  //   doc
  //     .fontSize(14)
  //     .text('  - ' + cv.account.profile.certification)
  //     .moveDown();

  //   for (let i = 0; i < cv.field.question.length; i++) {
  //     doc.fontSize(20).text(cv.field.question[i].content);
  //     for (let j = 0; j < cv.field.question[i].answers.length; j++) {
  //       doc.fontSize(14).text('  - ' + cv.field.question[i].answers[j].answer);
  //     }
  //   }
  //   doc.end();
  //   test.on('finish', async function () {
  //     res.download(path);
  //   });
  //   console.log(path);
  // }
}
