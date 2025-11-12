// Helpers functions for cursor encode/decode were produced with help of ChatGPT

export function encodeCursor(value: any): string {
    return Buffer.from(JSON.stringify(value)).toString("base64url");
};

export function decodeCursor(cursor?: string): any | null {
    if(!cursor) return null;

    return JSON.parse(Buffer.from(cursor, "base64url").toString());
};