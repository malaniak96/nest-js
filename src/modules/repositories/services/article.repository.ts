import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { ArticleEntity } from '../../../database/entities/article.entity';
import { ArticleListRequestDto } from '../../article/models/dto/request/article-list.request.dto';
import { IUserData } from '../../auth/interfaces/user-data.interface';

@Injectable()
export class ArticleRepository extends Repository<ArticleEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(ArticleEntity, dataSource.manager);
  }
  public async getList(
    query: ArticleListRequestDto,
    userData: IUserData,
  ): Promise<[ArticleEntity[], number]> {
    const queryBuilder = this.createQueryBuilder('article');
    queryBuilder.leftJoinAndSelect(
      'article.likes',
      'like',
      'like.user_id = :myId',
    );
    queryBuilder.leftJoinAndSelect('article.user', 'user');
    queryBuilder.leftJoinAndSelect(
      'user.followings',
      'follow',
      'follow.follower_id = :myId',
    );
    queryBuilder.setParameter('myId', userData.userId);
    queryBuilder.addOrderBy('article.created', 'DESC');
    queryBuilder.take(query.limit);
    queryBuilder.skip(query.offset);
    return await queryBuilder.getManyAndCount();
  }

  public async getArticleById(
    articleId: string,
    userData: IUserData,
  ): Promise<ArticleEntity> {
    const queryBuilder = this.createQueryBuilder('article');
    queryBuilder.leftJoinAndSelect(
      'article.likes',
      'like',
      'like.user_id = :myId',
    );
    queryBuilder.leftJoinAndSelect('article.user', 'user');
    queryBuilder.leftJoinAndSelect(
      'user.followings',
      'follow',
      'follow.follower_id = :myId',
      { myId: userData.userId },
    );
    queryBuilder.where('article.id = :articleId', { articleId });

    return await queryBuilder.getOne();
  }
}
