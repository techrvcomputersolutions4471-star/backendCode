import { Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!'
  }

  getKeepAlive() {
    return {
      ok: true,
      service: 'techrv-backend',
      message: 'Keep alive ping received',
      timestamp: new Date().toISOString(),
    }
  }
}
