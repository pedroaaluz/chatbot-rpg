export type IStatusRules ={
  status:  'kenobi' | 'contrabandist' |'rebel' |  'jedi' | 'imperial';
  message: string;
  conditions: Record<number,string>[]
}
  