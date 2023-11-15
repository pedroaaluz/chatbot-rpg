interface conditions {
    status: string;
    message: string;
    conditions: Record<number,string>[]
  }
  
export type IStatusRules = Record<string, conditions>
  