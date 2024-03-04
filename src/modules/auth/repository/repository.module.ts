import { Global, Module } from '@nestjs/common';
import { UserRepository } from '../../repositories/services/user.repository';
import { ArticleRepository } from '../../repositories/services/article.repository';
import { TagRepository } from '../../repositories/services/tag.repository';
import { LikeRepository } from '../../repositories/services/like.repository';
import { CommentRepository } from '../../repositories/services/comment.repository';
import { FollowRepository } from '../../repositories/services/follow.repository';
import { RefreshTokenRepository } from './services/refresh-token.repository';

const repositories = [
  UserRepository,
  ArticleRepository,
  TagRepository,
  RefreshTokenRepository,
  LikeRepository,
  CommentRepository,
  FollowRepository,
];
@Global()
@Module({
  imports: [],
  controllers: [],
  providers: repositories,
  exports: repositories,
})
export class RepositoryModule {}
