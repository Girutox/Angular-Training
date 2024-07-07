import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'shorten'
})
export class ShortenPipe implements PipeTransform {
  transform(value: any, ...args: any[]) {
    const text = <string>value;
    const limit = <number>args[0];

    if (text.length > limit) {
      return `${(<string>value).substring(0, limit)}...`
    }
    return text;
  }
}