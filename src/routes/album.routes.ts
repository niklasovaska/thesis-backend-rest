import * as express from 'express'
import { AlbumController } from '../controllers/album.controller'

const albumRouter = express.Router()

albumRouter.get('/albums', AlbumController.getAllAlbums)

export { albumRouter }