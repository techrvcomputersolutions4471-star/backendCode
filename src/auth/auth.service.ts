import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { PrismaService } from '../prisma/prisma.service'
import { LoginDto } from './dto/login.dto'
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwt: JwtService,
    ) { }

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
}