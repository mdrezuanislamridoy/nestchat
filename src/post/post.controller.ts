import { Controller, Get, Param } from '@nestjs/common';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}
  @Get(':id/getPost')
  getPost(@Param('id') id: string) {
    this.postService.getPost(id);
  }
}
