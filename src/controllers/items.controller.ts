import { Controller, Get } from '@nestjs/common';
import { ItemService } from '../services/items.service'

@Controller('items')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Get()
  async getItems() {
    return await this.itemService.getItems();
  }
}
