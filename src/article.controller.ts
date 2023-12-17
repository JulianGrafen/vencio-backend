import { Body, Controller, Get, Post } from '@nestjs/common';
import { ReceiveArticleDto } from './dtos/ReceiveArticle.dto';
import { ArticleService } from './article.service';

@Controller("articles")
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

@Post('receive')
receiveArticle(@Body() receiveArticleDto : ReceiveArticleDto){
this.articleService.logArticle(receiveArticleDto);
this.articleService.redirectArticleData(receiveArticleDto);


}
}
