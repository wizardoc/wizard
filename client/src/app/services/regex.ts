import {Injectable} from 'react-ts-di';

/**
 * Regular Expression service, provide some validation tool and regex constants
 */

@Injectable()
export class Regex {
  test(regexLiteral: Regex.RegexLiteral, text: string): boolean {
    return regexLiteral.test(text);
  }

  /** override, the regex used must be defined first in Regex namespace */
  replace(
    regexLiteral: Regex.RegexLiteral,
    text: string,
    replaceText: string,
  ): string | undefined {
    return text.replace(regexLiteral, replaceText);
  }

  exec(
    regexLiteral: Regex.RegexLiteral,
    text: string,
  ): RegExpExecArray | undefined {
    return regexLiteral.exec(text) as RegExpExecArray | undefined;
  }

  static readonly Email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
}

export namespace Regex {
  export type RegexLiteral = RegExp;
}
