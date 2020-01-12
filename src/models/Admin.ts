import {
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    BaseEntity
} from 'typeorm';

import { ObjectType, Field, ID } from "type-graphql";


import Category from './Category';

@ObjectType()
@Entity()
export default class Supervisor extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    name: string;

    @Field()
    @Column()
    age: number;

    @Field()
    @Column()
    password: string;


    @OneToMany(
        type => Category,
        category => category.supervisor
    )
    categories: Category[];
}