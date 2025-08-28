import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm"
import { Album } from "./Album"
import { AppUser } from "./AppUser"

@Entity()
export class Review extends BaseEntity {

    @PrimaryGeneratedColumn("uuid")
    id!: string

    @Column("float")
    rating!: number

    @Column("varchar", {length: 255})
    content!: string

    @ManyToOne(() => Album, (album) => album.reviews)
    @JoinColumn({name: 'album_id', referencedColumnName: 'id'})
    album: Album

    @ManyToOne(() => AppUser, (user) => user.reviews)
    @JoinColumn({name: 'user_id', referencedColumnName: 'id'})
    user: AppUser
}