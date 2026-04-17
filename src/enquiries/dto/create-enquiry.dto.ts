import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsString, IsOptional } from 'class-validator'

export class CreateEnquiryDto {
    @ApiProperty() @IsString() name: string
    @ApiProperty() @IsString() phone: string
    @ApiPropertyOptional() @IsOptional() @IsString() deviceType?: string
    @ApiPropertyOptional() @IsOptional() @IsString() issue?: string
}