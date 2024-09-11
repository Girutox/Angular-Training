import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'temp',
  standalone: true
})
export class TemperaturePipe implements PipeTransform {

  transform(value: string | number, inputType: 'cel' | 'fah', outputType?: 'cel' | 'fah') {
    let val: number;

    if (typeof value == 'string') {
      val = parseFloat(value);
    } else {
      val = value;
    }

    let outputTemp: number;
    let symbol: '°C' | '°F';
    if (inputType == 'cel' && outputType == 'fah') {
      outputTemp = val * (9 / 5) + 32;
      symbol = '°F';
    } else if (inputType == 'fah' && outputType == 'cel') {
      outputTemp = (val - 32) * (5 / 9);
      symbol = '°C';
    } else {
      outputTemp = val;
      symbol = inputType == 'cel' ? '°C' : '°F';
    }

    return `${outputTemp.toFixed(2)} ${symbol}`;
  }

}
