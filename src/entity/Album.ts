import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn, OneToMany } from "typeorm"
import { Artist } from "./Artist"
import { Genre } from "./Genre"
import { Review } from "./Review"

@Entity()
export class Album extends BaseEntity {

    @PrimaryGeneratedColumn("uuid")
    id!: string

    @Column("varchar", { length: 255 })
    title!: string

    @Column("int")
    year!: number

    @ManyToOne(() => Artist, (artist) => artist.albums)
    @JoinColumn({name: 'artist_id', referencedColumnName: 'id'})
    artist: Artist

    @ManyToOne(() => Genre, (genre) => genre.albums)
    @JoinColumn({name: 'genre_id', referencedColumnName: 'id'})
    genre: Genre

    @OneToMany(() => Review, (review) => review.album)
    reviews?: Review[]
}
