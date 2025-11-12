import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn, OneToMany, CreateDateColumn, BeforeInsert } from "typeorm"
import { Artist } from "./Artist"
import { Genre } from "./Genre"
import { Review } from "./Review"
import { Track } from "./Track"
import slugify from "slugify"

@Entity()
export class Album extends BaseEntity {

    @PrimaryGeneratedColumn("uuid")
    id!: string

    @Column("varchar", { length: 255 })
    title!: string

    @Column("varchar", { unique: true })
    slug!: string

    @Column("int")
    year!: number

    @Column("varchar", { name: "image_url", length: 255 })
    imageUrl!: string

    @ManyToOne(() => Artist, (artist) => artist.albums)
    @JoinColumn({name: 'artist_id', referencedColumnName: 'id'})
    artist: Artist

    @ManyToOne(() => Genre, (genre) => genre.albums)
    @JoinColumn({name: 'genre_id', referencedColumnName: 'id'})
    genre: Genre

    @OneToMany(() => Track, (track) => track.album)
    tracks?: Track[]

    @OneToMany(() => Review, (review) => review.album)
    reviews?: Review[]

    @CreateDateColumn({ name: "created_at", type: "timestamp" })
    createdAt!: Date

    @BeforeInsert()
    generateSlug() {
        this.slug = slugify(this.title, { lower: true })
    }
}
