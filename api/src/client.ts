import { Game } from "./game";

export class Client {
    public static new() {
        return new Client(undefined);
    }

    public static newKeyed(cabinet_api_key: string) {
        return new Client(cabinet_api_key);
    }

    private constructor(
        private api_key: string | undefined,
    ) { }

    private baseUrl = "https://rcade.recurse.com/api/v1"

    public withBaseUrl(baseUrl: string): this {
        this.baseUrl = baseUrl;
        return this
    }

    public async getAllGames() {
        const response = await fetch(`${this.baseUrl}/games`);
        const list = await response.json();

        return list.map((g: unknown) => Game.fromApiResponse(g))
    }

    public async getGame(gameId: string) {
        const response = await fetch(`${this.baseUrl}/games/${gameId}`);
        return Game.fromApiResponse(await response.json());
    }
}