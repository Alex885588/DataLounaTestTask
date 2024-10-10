import { IsNotEmpty, IsString, MinLength, Matches } from 'class-validator';

export class CreateItemDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    item_name: string;

    @IsNotEmpty()
    @IsString()
    item_currency: string;

    @IsNotEmpty()
    @Matches(/^\d+(\.\d{1,2})?$/) 
    item_price: string; 
}

export class UpdateItemDto {
    @IsString()
    @MinLength(3)
    item_name?: string;

    @IsString()
    item_currency?: string;

    @Matches(/^\d+(\.\d{1,2})?$/)
    item_price?: string;
}
