import { app } from "electron";
import { existsSync, readFileSync, writeFileSync } from "fs";
import path from "path";

const settingsPath = path.join(app.getPath('userData'), 'menu-settings.json');

export class Settings {
  public lastGameId?: string = undefined;

  load() {
    if (existsSync(settingsPath)) try {
      console.debug("[@rcade/menu] Loading settings from", settingsPath)

      const settings = readFileSync(settingsPath, "utf8");
      const newSettings = JSON.parse(settings);
      Object.assign(this, newSettings);
    } catch (error) {
      console.error("[@rcade/menu] Failed to load settings", error);
    }
  }

  update(callback: (settings: Settings) => void) {
    try {
      callback(this);
    } catch (error) {
      console.error("[@rcade/menu] Error while updating settings", error)
    }
    try {
      writeFileSync(settingsPath, JSON.stringify(this))
    } catch (error) {
      console.error("[@rcade/menu] Failed to save settings", error)
    }
  }
}

export const SETTINGS: Settings = new Settings;
