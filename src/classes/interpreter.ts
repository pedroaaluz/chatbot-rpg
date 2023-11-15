import type { IBotQuestion } from "../types/IQuestion";

export class Interpreter {
  // remove accent, 'ç' and special characters
  normalize(string:string) {
    return string.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  }    

  exec(string: string, rules: IBotQuestion['answerRules']) {
    const findMatchRule = rules.find(({regex}) => regex.test(string));
    
    console.log('rule', { findMatchRule });

    return findMatchRule?.value
  }

}