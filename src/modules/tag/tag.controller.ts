import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { TagService } from './services/tag.service';
import { SkipAuth } from '../auth/decorators/skip-auth.decorator';
import { TagResponseDto } from './dto/response/tag.response.dto';

@ApiTags('Tag')
@Controller('tags')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @SkipAuth()
  @Get('popular')
  public async getPopular(): Promise<TagResponseDto[]> {
    return await this.tagService.getPopular();
  }
}
