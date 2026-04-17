import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger'
import { ProductsService } from './products.service'
import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'
import { JwtAuthGuard } from '../auth/jwt.guard'

@ApiTags('products')
@Controller('products')
export class ProductsController {
    constructor(private productsService: ProductsService) { }

    @Get()
    @ApiQuery({ name: 'category', required: false })
    @ApiQuery({ name: 'limit', required: false })
    @ApiQuery({ name: 'featured', required: false })
    findAll(
        @Query('category') category?: string,
        @Query('limit') limit?: number,
        @Query('featured') featured?: boolean,
    ) {
        return this.productsService.findAll(category, limit, featured)
    }

    @Get(':slug')
    findOne(@Param('slug') slug: string) {
        return this.productsService.findOne(slug)
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    create(@Body() dto: CreateProductDto) {
        return this.productsService.create(dto)
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    update(@Param('id') id: string, @Body() dto: UpdateProductDto) {
        return this.productsService.update(id, dto)
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    remove(@Param('id') id: string) {
        return this.productsService.remove(id)
    }
}