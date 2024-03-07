import { TagResponseDto } from '../dto/response/tag.response.dto';
import { TagEntity } from '../../../database/entities/tag.entity';

export class TagMapper {
  public static toResponseDto(tagEntity: TagEntity): TagResponseDto {
    return {
      name: tagEntity.name,
      articlesCount: tagEntity.articlesCount,
    };
  }

  public static toListResponseDto(tagsEntities: TagEntity[]): TagResponseDto[] {
    return tagsEntities.map(this.toResponseDto);
  }
}
