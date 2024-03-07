import { DataSource, Repository } from 'typeorm';

import { TagEntity } from '../../../database/entities/tag.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TagRepository extends Repository<TagEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(TagEntity, dataSource.manager);
  }

  public async getPopular(): Promise<TagEntity[]> {
    const queryBuilder = this.createQueryBuilder('tag');

    queryBuilder.leftJoin('tag.articles', 'article');
    queryBuilder.addSelect('COUNT(article.id)', 'tag_articlesCount');
    queryBuilder.groupBy('tag.id');
    queryBuilder.orderBy('"tag_articlesCount"', 'DESC');
    queryBuilder.limit(10);

    return await queryBuilder.getMany();
  }
}
