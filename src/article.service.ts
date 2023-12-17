import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { HttpService } from '@nestjs/axios';
import { ReceiveArticleDto } from './dtos/ReceiveArticle.dto';
import User  from './user.entity';
import Listing  from './listing.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

//TODO: Implement Logic to choose on which pages the article should bge uploaded

@Injectable()
export class ArticleService {

    constructor(
        private readonly httpService: HttpService,
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        @InjectRepository(Listing)
        private readonly listingRepository: Repository<Listing>,
        ) 
        {}

    logArticle(receiveArticleDto: ReceiveArticleDto) {
        console.log(receiveArticleDto);
        
    }

    async redirectArticleData(receiveArticleDto: ReceiveArticleDto): Promise<AxiosResponse<any>> {
        const apiUrl = 'http://localhost:5050/receivelisting';
        try {
            const response: AxiosResponse<{ _id: string }> = await this.httpService.post(apiUrl, receiveArticleDto).toPromise();
            const objectId: string = response.data._id;

        
            
            console.log(objectId);


            
          } catch (error) {
            throw error;
          }

        return this.httpService.post(apiUrl, receiveArticleDto).toPromise();
    }
}
