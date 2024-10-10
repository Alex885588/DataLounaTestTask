import { Injectable } from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { ItemService } from './items.service';
import { UserService } from './user.service';


@Injectable()
export class BusinessLogicService {
    constructor(private readonly purchaseService: PurchaseService,
        private readonly itemService: ItemService,
        private readonly userService: UserService) { }

    async buyItem(user_id: number, itemName: string, suggestedPrice: string) {
        const user = await this.userService.findOne(user_id)
        const item = await this.itemService.getItemByKey(itemName)
        if (parseFloat(user.balance) < parseFloat(suggestedPrice) || parseFloat(suggestedPrice) < item.min_price) {
            throw new Error("Not enough balance")
        }
        const itemToBuy = await this.itemService.create({ item_currency: item.currency, item_name: itemName, item_price: item.min_price })
        await this.purchaseService.create({ itemId: itemToBuy.id, userId: user.id })
        const currentBalance = parseFloat(user.balance);
        const suggestedPriceValue = parseFloat(item.min_price)
        await this.userService.update(user.id, { balance: (currentBalance - suggestedPriceValue).toString() })
        return itemToBuy
    }
}
