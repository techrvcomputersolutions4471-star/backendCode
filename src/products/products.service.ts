import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'

@Injectable()
export class ProductsService {
    constructor(private prisma: PrismaService) { }

    async findAll(category?: string, limit?: number, featured?: boolean) {
        return this.prisma.product.findMany({
            where: {
                ...(category && { category }),
                ...(featured && { isFeatured: true }),
                isVisible: true,
            },
            orderBy: { createdAt: 'desc' },
            take: limit || 100,
        })
    }

    async findOne(slug: string) {
        return this.prisma.product.findUnique({ where: { slug } })
    }

    async create(dto: CreateProductDto) {
        const slug = dto.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '')
        return this.prisma.product.create({ data: { ...dto, slug } })
    }

    async update(id: string, dto: UpdateProductDto) {
        return this.prisma.product.update({ where: { id }, data: dto })
    }

    async remove(id: string) {
        return this.prisma.product.delete({ where: { id } })
    }
}