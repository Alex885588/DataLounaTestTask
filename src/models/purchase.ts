import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { User } from './user';
import { Item } from './item';

@Entity()
export class Purchase {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    user_id: number;

    @Column()
    item_id: number;

    @ManyToOne(() => User, (user) => user.purchases)
    user: User;

    @ManyToOne(() => Item, (item) => item.purchases)
    item: Item;

    @CreateDateColumn()
    createdAt: Date;
}
