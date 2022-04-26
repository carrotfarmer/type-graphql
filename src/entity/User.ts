import { Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@ObjectType()
export class User extends BaseEntity {
	@PrimaryGeneratedColumn()
	@Field(() => ID)
	id: number;

	@Column()
	@Field(() => String)
	firstName: string;

	@Column()
	@Field(() => String)
	lastName: string;

	@Column("text", { unique: true })
	@Field(() => String)
	email: string;

	@Field()
	name: string;

	@Column()
	password: string;
}
