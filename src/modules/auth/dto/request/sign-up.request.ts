import { PickType } from '@nestjs/swagger';
import { AuthBaseRequestDto } from './auth-base.request';

export class SignUpRequestDto extends PickType(AuthBaseRequestDto, [
  'deviceId',
  'name',
  'email',
  'password',
]) {}
