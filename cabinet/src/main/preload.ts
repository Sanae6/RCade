/// <reference lib="dom" />

import { contextBridge, ipcRenderer } from 'electron';
import type { RcadeAPI, GameInfo } from '../shared/types';

const rcadeAPI: RcadeAPI = {
  getGames: () => ipcRenderer.invoke('get-games'),
  loadGame: async (game: GameInfo) => {
    const portsPromise = new Promise<void>((resolve) => {
      ipcRenderer.once("plugin-ports", ({ ports }, { structure }) => {
        const mappedPorts: Record<string, Record<string, MessagePort>> = {};

        console.log({ ports, structure });

        // Transfer all ports to renderer via postMessage
        window.postMessage(
          { type: 'plugin-ports-ready', structure },
          '*',
          ports // Transfer the ports array
        );

        resolve();
      });
    });

    const { url } = await ipcRenderer.invoke('load-game', game);

    return { url };
  },
  unloadGame: (gameId: string, version: string) => ipcRenderer.invoke('unload-game', gameId, version),
  onMenuKey: (callback: () => void) => {
    const listener = () => callback();
    ipcRenderer.on('menu-key-pressed', listener);
    return () => ipcRenderer.removeListener('menu-key-pressed', listener);
  },
};

contextBridge.exposeInMainWorld('rcade', rcadeAPI);
