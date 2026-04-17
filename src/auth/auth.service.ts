import { Injectable, UnauthorizedException, ConflictException, NotFoundException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { PrismaService } from '../prisma/prisma.service'
import { LoginDto } from './dto/login.dto'
import { RegisterDto } from './dto/register.dto'
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwt: JwtService,
    ) { }

    async register(dto: RegisterDto) {
        const existingUser = await this.prisma.adminUser.findUnique({
            where: { email: dto.email },
        })

        if (existingUser) {
            throw new ConflictException('Email already exists')
        }

        const hashedPassword = await bcrypt.hash(dto.password, 10)

        const user = await this.prisma.adminUser.create({
            data: {
                email: dto.email,
                passwordHash: hashedPassword,
            },
        })

        return { message: 'User created successfully', userId: user.id }
    }

    async login(dto: LoginDto) {
        const user = await this.prisma.adminUser.findUnique({
            where: { email: dto.email },
        })
        if (!user) throw new UnauthorizedException('Invalid credentials')

        const valid = await bcrypt.compare(dto.password, user.passwordHash)
        if (!valid) throw new UnauthorizedException('Invalid credentials')

        const token = this.jwt.sign({ sub: user.id, email: user.email })
        return { access_token: token }
    }

    async deleteAdmin(id: string) {
        const user = await this.prisma.adminUser.findUnique({
            where: { id },
        })

        if (!user) {
            throw new NotFoundException('Admin user not found')
        }

        await this.prisma.adminUser.delete({
            where: { id },
        })

        return { message: 'User deleted successfully' }
    }
}