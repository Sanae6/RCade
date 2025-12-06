CREATE INDEX `game_authors_game_id_version_idx` ON `game_authors` (`game_id`,`game_version`);--> statement-breakpoint
CREATE INDEX `game_dependencies_game_id_version_idx` ON `game_dependencies` (`game_id`,`game_version`);--> statement-breakpoint
CREATE INDEX `game_version_categories_game_id_version_idx` ON `game_version_categories` (`game_id`,`game_version`);--> statement-breakpoint
CREATE INDEX `game_version_categories_category_id_idx` ON `game_version_categories` (`category_id`);--> statement-breakpoint
CREATE INDEX `game_versions_game_id_idx` ON `game_versions` (`game_id`);--> statement-breakpoint
CREATE INDEX `games_name_idx` ON `games` (`name`);