import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { Purchase } from './purchase';

@Entity()
export class Item {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    item_name: string;

    @Column()
    item_currency: string;

    @Column()
    item_price: string;

    @CreateDateColumn()
    createdAt: Date;

    @OneToMany(() => Purchase, (purchase) => purchase.item)
    purchases: Purchase[];
}
