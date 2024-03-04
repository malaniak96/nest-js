import { Column, Entity, ManyToMany } from 'typeorm';
import { BaseEntity } from './models/base.entity';
import { ArticleEntity } from './article.entity';
import { TableNameEnum } from './enums/table-name.enum';

@Entity(TableNameEnum.TAGS)
export class TagEntity extends BaseEntity {
  @Column('text')
  name: string;

  @ManyToMany(() => ArticleEntity, (entity) => entity.tags)
  articles?: ArticleEntity[];
}