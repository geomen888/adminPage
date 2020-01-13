import { Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    BaseEntity
} from "typeorm";

import { ObjectType, Field, ID } from "type-graphql";


import Category from "./Category";

@ObjectType()
@Entity()
export default class Supervisor extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column("text", { nullable: true })
    name: string;

    @Field()
    @Column("text", { nullable: true })
    age: number;

    @Field()
    @Column("text", { nullable: true })
    password: string;


    @OneToMany(
        type => Category,
        category => category.supervisor
    )
    categories: Category[];
}