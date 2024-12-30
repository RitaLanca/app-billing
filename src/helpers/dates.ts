import dayjs from 'dayjs';
import { YYYYMMMDD_FORMAT } from '@/constants/datetime';

export const getMonthIdxFrom = (date: string): number => {
   return new Date(date).getMonth(); 
}

export const getYearFrom = (date: string): number => {
   return new Date(date).getFullYear(); 
}

const convertStringToDateFormat = (date: string, format: string) => {
   const t = dayjs(date).format(format);
   return t;
 }

export const convertToYYYYMMDD = (date: string) => convertStringToDateFormat(date, YYYYMMMDD_FORMAT );
