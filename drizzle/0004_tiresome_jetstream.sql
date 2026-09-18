CREATE TABLE `jobApplications` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`email` varchar(320) NOT NULL,
	`phone` varchar(30),
	`position` varchar(255) NOT NULL,
	`experience` varchar(100),
	`availability` varchar(100),
	`message` text,
	`status` enum('new','reviewed','interviewed','hired','rejected') NOT NULL DEFAULT 'new',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `jobApplications_id` PRIMARY KEY(`id`)
);
