import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { TokenType } from '../enums/token-type.enum';
import { TokenService } from '../services/token.service';
import { RefreshTokenRepository } from '../../repositories/services/refresh-token.repository';
import { UserRepository } from '../../repositories/services/user.repository';

@Injectable()
export class JwtRefreshGuard implements CanActivate {
  constructor(
    private tokenService: TokenService,
    private refreshRepository: RefreshTokenRepository,
    private userRepository: UserRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const refreshToken = request.get('Authorization')?.split('Bearer ')[1];
    if (!refreshToken) {
      throw new UnauthorizedException();
    }
    const payload = await this.tokenService.verifyToken(
      refreshToken,
      TokenType.REFRESH,
    );
    if (!payload) {
      throw new UnauthorizedException();
    }

    const isExist = await this.refreshRepository.isTokenExist(refreshToken);
    if (!isExist) {
      throw new UnauthorizedException();
    }

    const user = await this.userRepository.findOneBy({
      id: payload.userId,
    });
    if (!user) {
      throw new UnauthorizedException();
    }
    request.user = { user, deviceId: payload.deviceId };
    return true;
  }
}
