import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ReceiveArticleDto } from './dtos/ReceiveArticle.dto';
import { ArticleService } from './article.service';

@Controller("articles")
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

@Post('receive')
receiveArticle(@Body() receiveArticleDto : ReceiveArticleDto){
this.articleService.redirectArticleData(receiveArticleDto);
}

@Get(':id')
async getAllArticlesFromUser(@Param('id')userId:number){
  const listings = await this.articleService.getAllArticlesFromUser(userId);
  return listings;
}

}








