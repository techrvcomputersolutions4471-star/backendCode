import { Module } from '@nestjs/common'
import { EnquiriesService } from './enquiries.service'
import { EnquiriesController } from './enquiries.controller'
import { PrismaModule } from '../prisma/prisma.module'

@Module({
  imports: [PrismaModule],
  providers: [EnquiriesService],
  controllers: [EnquiriesController],
})
export class EnquiriesModule { }