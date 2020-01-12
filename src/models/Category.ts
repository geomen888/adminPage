import {
    Column,
    Entity,
    ManyToOne, BaseEntity
} from 'typeorm';

import { ObjectType, Field } from "type-graphql";


import Supervisor from './Admin';
@ObjectType()
@Entity()
export default class Category extends BaseEntity {
    @Field() 
    @Column()
    name: string;

    @ManyToOne(
        type => Supervisor,
        supervisor => supervisor.categories,
        {
            primary: true, // Use this as part of composite primary key (no need for auto inc primary key).
            nullable: false // Can't use as part of composite primary key without this.
        }
    )
    supervisor: Supervisor;

}