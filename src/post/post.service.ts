import { Injectable } from '@nestjs/common';

@Injectable()
export class PostService {
  getPost(param: string) {
    console.log(param);
  }
}
