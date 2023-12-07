import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { HttpService } from '@nestjs/axios';
import { ReceiveArticleDto } from './ReceiveArticle.dto';

//TODO: Implement Logic to choose on which pages the article should bge uploaded

@Injectable()
export class ArticleService {

    constructor(private readonly httpService: HttpService) {}

    logArticle(receiveArticleDto: ReceiveArticleDto) {
        console.log(receiveArticleDto);
    }

    async redirectArticleData(receiveArticleDto: ReceiveArticleDto): Promise<AxiosResponse<any>> {
        const apiUrl = 'https://eoj3bapa9rcn4dn.m.pipedream.net';
        const apiUr2 = ''

        return this.httpService.post(apiUrl, receiveArticleDto).toPromise();
    }
}
