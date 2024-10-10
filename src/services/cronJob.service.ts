import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { RedisService } from './redis.service';
import { AxiosResponse } from 'axios';
import axios from 'axios';

@Injectable()
export class CronService {
    private readonly SKINPORT_API_URL = 'https://api.skinport.com/v1/items?app_id=730&currency=EUR&tradable=';

    constructor(private readonly redisService: RedisService) { }

    @Cron(CronExpression.EVERY_10_MINUTES)
    async handleCron() {
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
            console.error('Error updating items:', error);
        }
    }
}
