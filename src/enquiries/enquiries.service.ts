import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CreateEnquiryDto } from './dto/create-enquiry.dto'

@Injectable()
export class EnquiriesService {
    constructor(private prisma: PrismaService) { }

    create(dto: CreateEnquiryDto) {
        return this.prisma.enquiry.create({ data: dto })
    }

    findAll() {
        return this.prisma.enquiry.findMany({ orderBy: { createdAt: 'desc' } })
    }

    markResolved(id: string) {
        return this.prisma.enquiry.update({
            where: { id },
            data: { isResolved: true },
        })
    }

    remove(id: string) {
        return this.prisma.enquiry.delete({ where: { id } })
    }
}