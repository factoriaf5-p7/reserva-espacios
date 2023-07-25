jest.mock('@nestjs/jwt');
import { AuthGuard } from './auth.guard';
import { JwtService } from '@nestjs/jwt';

describe('JwtGuard', () => {
  it('should be defined', () => {
    const mockJwtService = new JwtService({});
    expect(new AuthGuard(mockJwtService)).toBeDefined();
  });
});
