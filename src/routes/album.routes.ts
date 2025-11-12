import * as express from 'express'
import { AlbumController } from '../controllers/album.controller'

const albumRouter = express.Router();

albumRouter.get('/albums', AlbumController.getAlbumsPaginated);

albumRouter.get('/albums/:id', AlbumController.getAlbumById);

albumRouter.get('/albums/:id/artist', AlbumController.getAlbumArtist);

albumRouter.get('/albums/:id/genre', AlbumController.getAlbumGenre);

albumRouter.get('/albums/:id/tracks', AlbumController.getAlbumTracks);

albumRouter.get('/albums/:id/reviews', AlbumController.getAlbumReviews);

export { albumRouter }