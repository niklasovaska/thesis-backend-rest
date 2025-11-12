import { Request, Response } from "express"
import { AppDataSource } from "../data-source"
import { generateAlbumLinks, generateArtistLinks, generateGenreLinks } from "../utils/hateoas"
import { globalCatchAsync } from "../utils/globalCatchAsync"
import { decodeCursor, encodeCursor } from "../utils/cursorEncoder"
import { NotFoundError } from "../utils/errors/NotFoundError"
import { Album } from "../entity/Album"

const albumRepository = AppDataSource.getRepository(Album)

export class AlbumController {

    static getAlbumsPaginated = globalCatchAsync( async (req: Request, res: Response) => {
        const limit = Number(req.query.limit) || 12;
        const cursor = decodeCursor(req.query.cursor as string);

        const builder = Album
            .createQueryBuilder("album")
            .orderBy("album.id", "ASC")
            .take(limit + 1);

        if(cursor) {
            builder.where("album.id > :cursor", { cursor });
        }

        const result = await builder.getMany();
        const hasNextPage = result.length > limit;
        const albums = result.slice(0, limit);
        const nextCursor = hasNextPage ? encodeCursor(albums[albums.length - 1].id) : null;
        const baseUrlFull = `${req.protocol}://${req.get("host")}${req.baseUrl}`;

        res.json({
            items: albums.map((album) => ({
                id: album.id,
                title: album.title,
                year: album.year,
                _links: generateAlbumLinks(req, album.id),
            })),
            _links: {
                self: { href: `${baseUrlFull}/albums?limit=${limit}${cursor ? `&cursor=${req.query.cursor}`: ``}` },
                nextCursor: nextCursor ? { href: `albums?limit=${limit}&cursor=${nextCursor}`} : null
            }
        });
    });

    static getAlbumById = globalCatchAsync( async (req: Request, res: Response) => {
        const album = await albumRepository.findOne({
            where: { id: req.params.id }
        });

        if(!album) throw new NotFoundError("Album");

        return res.status(200).json({
            id: album.id,
            title: album.title,
            year: album.year,
            _links: generateAlbumLinks(req, album.id),
        });
    });

    static getAlbumArtist = globalCatchAsync( async(req: Request, res: Response) => {
        const album = await albumRepository.findOne({
            where: { id: req.params.id },
            relations: ["artist"],
        });

        if(!album) return res.status(404).json({ message: "Album not found" });

        res.status(200).json({   
            id: album.artist.id,
            name: album.artist.name,
            _links: generateArtistLinks(req, album.artist.id),
            
        });
    });

    static getAlbumGenre = globalCatchAsync( async(req: Request, res: Response) => {
        const album = await albumRepository.findOne({
            where: { id: req.params.id },
            relations: ["genre"],
        });

        if(!album) return res.status(404).json({ message: "Album not found" });

        res.status(200).json({
            id: album.genre.id,
            name: album.genre.name,
            _links: generateGenreLinks(req, album.genre.id),
            
        });
    });

    static getAlbumTracks = globalCatchAsync( async(req: Request, res: Response) => {
        const album = await albumRepository.findOne({
            where: { id: req.params.id },
            relations: ["tracks"],
        });

        if(!album) return res.status(404).json({ message: "Album not found" });

        res.status(200).json({
            tracks: album.tracks?.map((track) => ({
                id: track.id,
                title: track.title,
                trackNumber: track.trackNumber,
            })),
        })
    });

    static getAlbumReviews = globalCatchAsync( async(req: Request, res: Response) => {
        const album = await albumRepository.findOne({
            where: { id: req.params.id },
            relations: ["reviews"],
        });
        if(!album) return res.status(404).json({ message: "Album not found" });

        res.status(200).json({
            reviews: album.reviews?.map((review) => ({
                id: review.id,
                rating: review.rating,
                content: review.content,
            })),
        })
    });
};
