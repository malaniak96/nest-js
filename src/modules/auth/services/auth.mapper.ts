import { UserEntity } from '../../../database/entities/user.entity';
import { TokenResponseDto } from '../dto/response/token.response';
import { AuthUserResponseDto } from '../dto/response/auth-user.response';

export class AuthMapper {
  public static toResponseDto(
    userEntity: UserEntity,
    tokens: TokenResponseDto,
  ): AuthUserResponseDto {
    return {
      user: userEntity,
      tokens,
    };
  }
}
