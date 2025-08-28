import { Request, Response } from "express"
import { AppDataSource } from "../data-source"
import { Album } from "../entity/Album"

export class AlbumController {
    static getAllAlbums = async (req: Request, res: Response) => {
        const albumRepository = AppDataSource.getRepository(Album)
        const albums = await albumRepository.find()

        return res.status(200).json({
            data: albums
        })
    }
}
