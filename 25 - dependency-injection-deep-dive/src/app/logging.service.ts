import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggingService {

  constructor() { }

  log(message: string) {
    const date = `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`;
    console.log(`[${date}]: ${message}`);
  }
}
