import {Injectable} from '@wizardoc/injector';

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

  exec(regexLiteral: Regex.RegexLiteral, text: string): RegExpExecArray | undefined {
    return regexLiteral.exec(text) as RegExpExecArray | undefined;
  }
}

export namespace Regex {
  export type RegexLiteral = RegExp;
}
