import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from "typeorm"
import { Album } from "./Album"

@Entity()
export class Artist extends BaseEntity {
    
    @PrimaryGeneratedColumn("uuid")
    id!: string

    @Column("varchar", { unique: true, length: 255 })
    name!: string

    @OneToMany(() => Album, (album) => album.artist)
    albums?: Album[]
}