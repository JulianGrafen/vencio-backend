import { ConflictException, Injectable } from '@nestjs/common';
import axios, { AxiosResponse } from 'axios';
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
        private listingRepository: Repository<Listing>,
        ) 
        {}

 


    async redirectArticleData(receiveArticleDto: ReceiveArticleDto): Promise<AxiosResponse<any>> {
      //TODO: Refactor the function. Right now the function will redirect the data to the partner site and also save the objectID to the database
        const apiUrl = 'http://localhost:5050/receivelisting';
        try {
            const response: AxiosResponse<{ _id: string }> = await this.httpService.post(apiUrl, receiveArticleDto).toPromise();


            const objectId: string = response.data._id;
            const id: number = receiveArticleDto.userId;

            const user = await this.usersRepository.findOne({where:{id}});


            const listing = new Listing();
              listing.objectId = objectId;
              listing.user = user;

              await this.listingRepository.save(listing);
            console.log(objectId);
            
          } catch (error) {
            throw error;
          }

        return this.httpService.post(apiUrl, receiveArticleDto).toPromise();
    }


    async getAllArticlesFromUser(userId): Promise< any> {


      //TODO: Add method to send the objectIDs to partner site and receive all attributes from the article
      const id: number = userId;
      const apiUrl = 'http://localhost:5050/getlistingsbyid';


      try {
        const allListings = await this.usersRepository.findOne({ where: { id }, relations: ['listings'] });
        if (allListings === null) {
          console.log("User ID not found");
          throw new ConflictException("USER ID NOT FOUND");
        }

        const objectIdArray = allListings.listings.map((listing) => listing.objectId);

        const response: AxiosResponse<{ _id: string }> = await this.httpService.post(apiUrl, objectIdArray).toPromise();

        const title = response.data;

      
        console.log(title);
        return allListings.listings;
      } catch (error) {
        throw error;
      }
      


  }
}
