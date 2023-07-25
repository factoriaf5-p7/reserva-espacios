import { Injectable } from '@nestjs/common';
// import moment from 'moment';
import moment from 'moment-business-days';

moment.locale('es');

@Injectable()
export class DateToolService {
  calcBusinessDays(start: string, end: string) {
    return moment(end, 'DD-MM-YYYY').businessDiff(moment(start, 'DD-MM-YYYY'));
  }
  getTimeFromDate(start: string) {
    return moment(start, 'DD-MM-YYYY hh:mm').get('hour');
  }
  getDateFromNumberOfDays(start: string, n: number) {
    return moment(start, 'DD-MM-YYYY hh:mm')
      .businessAdd(n)
      .format('DD/MM/YYYY');
  }
}
