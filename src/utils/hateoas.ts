import { Request } from "express"

// Generate HATEOAS links

// base link
export function generateBaseUrl(req: Request ) {
    return `${req.protocol}://${req.get("host")}${req.baseUrl}`;
};

// album links
export function generateAlbumLinks(req: Request, id: string) {
    const baseUrl = generateBaseUrl(req);

    return {
        self: { href: `${baseUrl}/albums/${id}` },
        artist: { href: `${baseUrl}/albums/${id}/artist` },
        genre: { href: `${baseUrl}/albums/${id}/genre` },
    }
};

// artist links
export function generateArtistLinks(req: Request, id: string) {
    const baseUrl = generateBaseUrl(req);

    return {
        self: { href: `${baseUrl}/artists/${id}` },
        albums: { href: `${baseUrl}/artists/${id}/albums` }
    }
}

// genre links
export function generateGenreLinks(req: Request, id: string) {
    const baseUrl = generateBaseUrl(req);

    return {
        self: { href: `${baseUrl}/genres/${id}` },
        albums: { href: `${baseUrl}/genres/${id}/albums` }
    }
}
