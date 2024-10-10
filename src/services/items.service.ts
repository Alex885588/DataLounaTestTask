import { Injectable, NotFoundException } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import axios, { AxiosError } from 'axios';
import { RedisService } from './redis.service';
import { CreateItemDto } from 'src/dto/item.dto';
import { Repository } from 'typeorm';
import { Item } from 'src/models/item';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ItemService {
  private readonly SKINPORT_API_URL = 'https://api.skinport.com/v1/items?app_id=730&currency=EUR&tradable=';

  constructor(private readonly redisService: RedisService,
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>) { }

  async getItems(): Promise<any> {
    const cachedItems = await this.redisService.get('items');
    if (cachedItems) {
      return JSON.parse(cachedItems);
    }
    try {
      const responseUnTradable: AxiosResponse<any> = await axios.get(`${this.SKINPORT_API_URL}0`);
      const responseTradable: AxiosResponse<any> = await axios.get(`${this.SKINPORT_API_URL}1`);
      const result: Record<string, any[]> = {};
      responseTradable.data.forEach(item1 => {
        const matchingItems = responseUnTradable.data.find(item2 => item2.market_hash_name === item1.market_hash_name)
        if (matchingItems) {
          item1.untradable_min_price = matchingItems.min_price;
        }
        result[item1.market_hash_name] = item1;
      });
      await this.redisService.set('items', JSON.stringify(result), 3600);

      return result;

    } catch (error) {
      console.log(error)
      throw new Error('Failed to fetch items from the API');
    }
  }

  async create(createItemDto: CreateItemDto): Promise<Item> {
    const newItem = this.itemRepository.create(createItemDto);
    return this.itemRepository.save(newItem);
  }

  async getItemByKey(key: string): Promise<any> {
    const cachedItems = await this.redisService.get('items');
    if (cachedItems) {
      const items = JSON.parse(cachedItems);
      const item = items[key];
      if (!item) {
        throw new NotFoundException(`Item with key "${key}" not found`);
      }
      return item;
    }
    throw new NotFoundException(`No items found in cache`);
  }
}
