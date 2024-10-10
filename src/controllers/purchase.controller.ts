import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { PurchaseService } from 'src/services/purchase.service';
import { CreatePurchaseDto, UpdatePurchaseDto } from 'src/dto/purchase.dto';

@Controller('purchases')
export class PurchaseController {
    constructor(private readonly purchaseService: PurchaseService) { }

    @Post()
    async create(@Body() createPurchaseDto: CreatePurchaseDto) {
        return this.purchaseService.create(createPurchaseDto);
    }

    @Get()
    async findAll() {
        return this.purchaseService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: number) {
        return this.purchaseService.findOne(id);
    }

    @Delete(':id')
    async remove(@Param('id') id: number) {
        return this.purchaseService.remove(id);
    }
}
