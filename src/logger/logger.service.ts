import { Injectable, Scope } from '@nestjs/common';

@Injectable({scope: Scope.DEFAULT})
export class LoggerService {
  private reqId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

  log(message: string) {
    const date = new Date();
    const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`;
    console.log(`[LOG] ${formattedDate} REQ[${this.reqId}]: ${message}`);
  }
}
