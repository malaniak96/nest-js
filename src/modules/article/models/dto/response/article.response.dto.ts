import { UserResponseDto } from '../../../../user/dto/response/user.response.dto';

export class ArticleResponseDto {
  id: string;
  title: string;
  description: string;
  body: string;
  created: Date;
  updated: Date;
  isLiked: boolean;
  user?: UserResponseDto;
}
