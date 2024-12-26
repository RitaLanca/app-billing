/* eslint-disable @typescript-eslint/no-explicit-any */
export interface chartProps<T> {
    xAxisDataKey: string,
    yAxisDataKey: string,
    dataset: T[] | undefined,
    xAxisTickFormatter?: (value: any, index: number) => string,
    yAxisTickFormatter?: (value: any, index: number) => string,
  }

  export interface annualRevenueProps {
    year: number,
    total: number,
  }
  
  export interface monthlyRevenueProps {
    date: string,
    value: number,
  }
  export type datasetProps<T> = T[];
