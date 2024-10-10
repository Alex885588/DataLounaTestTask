import { Module } from '@nestjs/common';
import { ItemController } from './controllers/items.controller';
import { ItemService } from './services/items.service';
import { RedisService } from './services/redis.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './models/user';
import { Item } from './models/item';
import { Purchase } from './models/purchase';
import { PurchaseController } from './controllers/purchase.controller';
import { UserController } from './controllers/user.controller';
import { CronService } from './services/cronJob.service';
import { PurchaseService } from './services/purchase.service';
import { UserService } from './services/user.service';
import { PurchaseItemController } from './controllers/purchaseItem.controller';
import { BusinessLogicService } from './services/businessLogic.service';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: +process.env.DB_PORT || 5432,
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'Alex445577&&',
      database: process.env.DB_NAME || 'DataLounaTaskDB',
      entities: [User, Item, Purchase],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Purchase, User, Item]),
  ],
  controllers: [ItemController, PurchaseController, UserController, PurchaseItemController],
  providers: [RedisService, CronService, PurchaseService, UserService, ItemService, BusinessLogicService],
})
export class AppModule { }
