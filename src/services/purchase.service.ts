import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Purchase } from 'src/models/purchase';
import { CreatePurchaseDto, UpdatePurchaseDto } from 'src/dto/purchase.dto';
import { User } from 'src/models/user';
import { Item } from 'src/models/item';

@Injectable()
export class PurchaseService {
    constructor(
        @InjectRepository(Purchase)
        private readonly purchaseRepository: Repository<Purchase>,
    ) { }

    async create(createPurchaseDto: CreatePurchaseDto): Promise<Purchase> {
        const newUser = this.purchaseRepository.create({
            user_id: createPurchaseDto.userId,
            item_id: createPurchaseDto.itemId
        });
        return this.purchaseRepository.save(newUser);
    }

    async findAll(): Promise<Purchase[]> {
        return this.purchaseRepository.find({ relations: ['user', 'item'] });
    }

    async findOne(id: number): Promise<Purchase> {
        return this.purchaseRepository.findOne({ where: { id }, relations: ['user', 'item'] });
    }

    async remove(id: number): Promise<void> {
        await this.purchaseRepository.delete(id);
    }
}
