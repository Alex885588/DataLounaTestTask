import { Controller, Post, Body } from '@nestjs/common';
import { BusinessLogicService } from 'src/services/businessLogic.service';

@Controller('purchase-item')
export class PurchaseItemController {
    constructor(private readonly businessLogicService: BusinessLogicService) { }

    @Post()
    async create(@Body("user_id") user_id: number, @Body("item_name") item_name: string, @Body("suggested_price") suggested_price: string) {
        return this.businessLogicService.buyItem(user_id, item_name, suggested_price);
    }

}
