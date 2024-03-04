import { Exclude } from 'class-transformer';
import { TokenResponseDto } from './token.response';

@Exclude()
export class AuthUserResponseDto {
  tokens: TokenResponseDto;

  user: any;
}
