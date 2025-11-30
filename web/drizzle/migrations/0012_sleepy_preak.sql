DROP TABLE `plugin_authors`;--> statement-breakpoint
DROP TABLE `plugin_versions`;--> statement-breakpoint
DROP TABLE `plugins`;--> statement-breakpoint
ALTER TABLE `game_versions` ADD `status` text NOT NULL DEFAULT 'pending';--> statement-breakpoint
UPDATE `game_versions` SET `status` = 'published';