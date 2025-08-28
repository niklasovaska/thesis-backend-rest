import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Review } from "./Review"

@Entity({ name: 'app_user'})
export class AppUser extends BaseEntity {
    
    @PrimaryGeneratedColumn("uuid")
    id!: string

    @Column("varchar", {unique: true, length: 20})
    name!: string

    @OneToMany(() => Review, (review) => review.user)
    reviews?: Review[]
}