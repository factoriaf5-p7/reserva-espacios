import { Test, TestingModule } from '@nestjs/testing';
import { DateToolService } from './date-tool.service';

describe('DateToolService', () => {
  let service: DateToolService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DateToolService],
    }).compile();

    service = module.get<DateToolService>(DateToolService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('calcBusinessDays() should return 5 when start date is "30/06/2023" & end date is "07/07/2023"', () => {
    const start = '30/06/2023';
    const end = '08/07/2023';
    expect(service.calcBusinessDays(start, end)).toBe(6);
  });
  it('getTimeFromDate() shoul return 12 when start is "30/06/2023T12:15"', () => {
    const start = '30/06/2023 12:15';
    expect(service.getTimeFromDate(start)).toBe(12);
  });
  it('getDateFromNumberOfDays should return "02/07/2023" when start is "30/06/2023T12:15"', () => {
    const start = '30/06/2023 12:15';
    expect(service.getDateFromNumberOfDays(start, 1)).toContain('03/07/2023');
  });
});
