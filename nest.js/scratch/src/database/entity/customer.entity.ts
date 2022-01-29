import { Column, PrimaryGeneratedColumn } from "typeorm";

export class Customer {
    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    firstName : string;

    @Column()
    lastName : string;

    @Column({default : true})
    isActive : boolean;
}