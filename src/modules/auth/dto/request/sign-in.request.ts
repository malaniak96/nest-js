import { PickType } from '@nestjs/swagger';
import { AuthBaseRequestDto } from './auth-base.request';

export class SignInRequestDto extends PickType(AuthBaseRequestDto, [
  'deviceId',
  'email',
  'password',
]) {}
