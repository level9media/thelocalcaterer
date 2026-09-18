CREATE TABLE `lunchOrders` (
	`id` int AUTO_INCREMENT NOT NULL,
	`parentName` varchar(255) NOT NULL,
	`email` varchar(320) NOT NULL,
	`studentName` varchar(255) NOT NULL,
	`allergies` text,
	`selectedMeals` json NOT NULL,
	`mealCount` int NOT NULL,
	`totalCents` int NOT NULL,
	`stripePaymentIntentId` varchar(255),
	`stripeSessionId` varchar(255),
	`paymentStatus` enum('pending','paid','failed','refunded') NOT NULL DEFAULT 'pending',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `lunchOrders_id` PRIMARY KEY(`id`)
);
