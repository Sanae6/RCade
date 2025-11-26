import * as z from "zod";
import * as jose from "jose";

const GITHUB_OIDC_ISSUER = "https://token.actions.githubusercontent.com";
const GITHUB_OIDC_JWKS_URI = `${GITHUB_OIDC_ISSUER}/.well-known/jwks`;

const GithubOIDCClaims = z.object({
    iss: z.string().nonempty(),
    aud: z.string().nonempty(),
    sub: z.string().nonempty(),
    repository: z.string().nonempty(),
    repository_owner: z.string().nonempty(),
    repository_owner_id: z.string().nonempty(),
    actor: z.string().nonempty(),
    actor_id: z.string().nonempty(),
    ref: z.string().nonempty(),
    sha: z.string().nonempty(),
    workflow: z.string().nonempty(),
    run_id: z.string().nonempty(),
    run_number: z.string().nonempty(),
    run_attempt: z.string().nonempty(),
    iat: z.number(),
    exp: z.number(),
    nbf: z.number(),
});


const JWK = z.object({
    kty: z.string().nonempty(),
    use: z.string().nonempty(),
    kid: z.string().nonempty(),
    alg: z.string().nonempty(),
    n: z.string(),
    e: z.string(),
    x5c: z.array(z.string()),
    x5t: z.string(),
});

type JWK =z.Infer<typeof JWK>

const JWKResponse = z.object({
    keys: z.array(JWK),
});

export class GithubOIDCValidator {
    private keys: JWK[]; 

    private constructor(keys: JWK[]) {
        this.keys = keys;
    }

    public static async new(extra_keys: JWK[] = []): Promise<GithubOIDCValidator> {
        const res = await fetch(GITHUB_OIDC_JWKS_URI);

        if (!res.ok) {
            throw new Error(`failed to fetch JWKS: ${res.status}`);
        }
        const body = await res.json();
  
        const { keys } = JWKResponse.parse(body);

        return new GithubOIDCValidator(keys.concat(extra_keys));
    };

    public async validate(token: string): Promise<boolean> {
        // TODO: validate token
        return Promise.reject(false);
    }
}
