DROP INDEX `game_versions_version_unique`;--> statement-breakpoint
CREATE UNIQUE INDEX `game_versions_game_id_version_unique` ON `game_versions` (`game_id`,`version`);