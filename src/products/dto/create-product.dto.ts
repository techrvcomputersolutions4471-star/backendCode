import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsString, IsInt, IsOptional, IsBoolean, IsArray } from 'class-validator'

export class CreateProductDto {
    @ApiProperty() @IsString() title: string
    @ApiProperty() @IsString() category: string // laptop | desktop | printer
    @ApiPropertyOptional() @IsOptional() @IsString() processor?: string
    @ApiPropertyOptional() @IsOptional() @IsString() ram?: string
    @ApiPropertyOptional() @IsOptional() @IsString() storage?: string
    @ApiPropertyOptional() @IsOptional() @IsString() displaySize?: string
    @ApiPropertyOptional() @IsOptional() @IsString() os?: string
    @ApiProperty() @IsInt() price: number
    @ApiProperty() @IsString() condition: string // refurbished | new
    @ApiPropertyOptional() @IsOptional() @IsString() grade?: string
    @ApiPropertyOptional() @IsOptional() @IsString() description?: string
    @ApiPropertyOptional() @IsOptional() @IsArray() images?: string[]
    @ApiPropertyOptional() @IsOptional() @IsBoolean() isVisible?: boolean
    @ApiPropertyOptional() @IsOptional() @IsBoolean() isFeatured?: boolean
}