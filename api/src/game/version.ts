export class GameVersion {
    public static fromApiResponse(game_id: string, response: any) {
        return new GameVersion(game_id, response);
    }

    private constructor(
        private game_id: string,
        private apiResponse: any
    ) { }

    public version(): string {
        return this.apiResponse.version as string;
    }

    public contentUrl(): string | undefined {
        if (!("contents" in this.apiResponse))
            return undefined

        const now = Date.now();

        if (now > this.apiResponse.contents.expires)
            return undefined;

        return this.apiResponse.contents.url
    }
}