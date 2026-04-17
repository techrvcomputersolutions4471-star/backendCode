import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { EnquiriesService } from './enquiries.service'
import { CreateEnquiryDto } from './dto/create-enquiry.dto'
import { JwtAuthGuard } from '../auth/jwt.guard'

@ApiTags('enquiries')
@Controller('enquiries')
export class EnquiriesController {
    constructor(private enquiriesService: EnquiriesService) { }

    @Post()
    create(@Body() dto: CreateEnquiryDto) {
        return this.enquiriesService.create(dto)
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    findAll() {
        return this.enquiriesService.findAll()
    }

    @Patch(':id/resolve')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    resolve(@Param('id') id: string) {
        return this.enquiriesService.markResolved(id)
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    remove(@Param('id') id: string) {
        return this.enquiriesService.remove(id)
    }
}