import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { Purchase } from './purchase';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    fullName: string;

    @Column()
    balance: string;

    @CreateDateColumn()
    createdAt: Date;

    @OneToMany(() => Purchase, (purchase) => purchase.user)
    purchases: Purchase[];
}
