import { z } from 'zod';

export const VersionsSchema = z.object({
  node: z.string(),
  chrome: z.string(),
  electron: z.string(),
});

export type Versions = z.infer<typeof VersionsSchema>;

export interface GameInfo {
  id: string;
  name: string;
  latestVersion: string;
  dependencies: {
    name: string,
    version: string,
  }[];
}

export interface LoadGameResult {
  url: string;
  pluginPorts: Record<string, Record<string, MessagePort>>;
}

export interface RcadeAPI {
  getGames: () => Promise<GameInfo[]>;
  loadGame: (game: GameInfo) => Promise<LoadGameResult>;
  unloadGame: (gameId: string, version: string) => Promise<void>;
  onMenuKey: (callback: () => void) => () => void;
}
