export const getMonthIdxFrom = (date: string): number => {
   return new Date(date).getMonth(); 
}

export const getYearFrom = (date: string): number => {
   return new Date(date).getFullYear(); 
}