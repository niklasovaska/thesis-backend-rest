import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn } from "typeorm"
import { Album } from "./Album"

@Entity()
export class Track extends BaseEntity {
    
    @PrimaryGeneratedColumn("uuid")
    id!: string

    @Column({ name: "track_number" })
    trackNumber!: number

    @Column("varchar", { length: 255 })
    title!: string

    @ManyToOne(() => Album, (album) => album.tracks)
    @JoinColumn({ name: "album_id", referencedColumnName: "id" })
    album!: Album

}