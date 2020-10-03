import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sliceKeepLastWord',
})
export class SliceKeepLastWordPipe implements PipeTransform {
  transform(value: string, ...args: number[]): unknown {
    const size = args[0];
    if (!value || value.length <= size) {
      return value;
    }

    const space = ' ';
    let finalValue: string;
    const words = value.split(space);

    if (words.length >= 1) {
      finalValue = words[0];
    }

    for (let index = 1; index < words.length; index++) {
      const word = words[index];
      finalValue = `${finalValue}${space}${word}`;
      if (finalValue.length >= size) {
        if (index < words.length - 1) {
          finalValue = `${finalValue}...`;
        }
        break;
      }
    }

    return finalValue;
  }
}
