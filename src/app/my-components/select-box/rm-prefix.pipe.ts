import { Pipe, PipeTransform } from '@angular/core';
/*
 * Raise the value exponentially
 * Takes an exponent argument that defaults to 1.
 * Usage:
 *   value | myRmPrefix
 * Example:
 *   {{ xn-abc |  myRmPrefix}}
 *   formats to: abc
*/
@Pipe({name: 'myRmPrefix'})
export class RmPrefixPipe implements PipeTransform {
  transform(value: string): string {
    return value.split('-')[1];
  }
}
