import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Album } from "./Album"

@Entity()
export class Genre extends BaseEntity {
    
    @PrimaryGeneratedColumn("uuid")
    id!: string
    
    @Column("varchar", { unique: true, length: 255 })
    name!: string

    @OneToMany(() => Album, (album) => album.genre)
    albums?: Album[]
}