import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class CreatePurchaseDto {
    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    userId: number; 

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    itemId: number; 
}

export class UpdatePurchaseDto {
    @IsNumber()
    @IsPositive()
    userId?: number;

    @IsNumber()
    @IsPositive()
    itemId?: number;
}
