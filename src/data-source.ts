import "reflect-metadata"
import { DataSource } from "typeorm"
import * as dotenv from 'dotenv'
import { Album } from "./entity/Album"
import { Artist } from "./entity/Artist"
import { AppUser } from "./entity/AppUser"
import { Genre } from "./entity/Genre"
import { Review } from "./entity/Review"

dotenv.config()

export const AppDataSource = new DataSource({
    type: "postgres",
    url: process.env.DB_CONNECT,
    synchronize: true,
    entities: [Album, Artist, Genre, AppUser, Review]
})
