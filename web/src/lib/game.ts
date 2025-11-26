import { eq, type InferSelectModel } from "drizzle-orm";
import { getDb } from "./db";
import { gameAuthors, games } from "./db/schema";

export class Game {
    public static async all(): Promise<Game[]> {
        return (await getDb().query.games.findMany({ with: { authors: true } }))
            .map(game => new Game(game));
    }

    public static async byId(id: string): Promise<Game | undefined> {
        let v = await getDb().query.games.findFirst({ with: { authors: true }, where: eq(games, id) });

        if (v === undefined) {
            return undefined;
        }

        return new Game(v);
    }

    private constructor(private data: InferSelectModel<typeof games> & { authors: InferSelectModel<typeof gameAuthors>[] }) { }

    public intoResponse(auth: { for: "recurser", rc_id: string } | { for: "public" }): object | undefined {
        if (this.data.visibility !== "public") {
            if (auth.for === "public" || auth.rc_id !== this.data.owner_rc_id)
                return undefined;
        }

        return {
            id: this.data.id,
            name: this.data.name,
            description: this.data.description,
            visibility: this.data.visibility,
            version: this.data.version,
            git: {
                ssh: `git@github.com:${this.data.github_author}/${this.data.github_repo}.git`,
                https: `https://github.com/${this.data.github_author}/${this.data.github_repo}`,
            },
            owner_rc_id: this.data.owner_rc_id,
            authors: this.data.authors,
        }
    }
}