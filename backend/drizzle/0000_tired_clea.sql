CREATE TABLE `address_table` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`country_code` text NOT NULL,
	`address_line_1` text NOT NULL,
	`address_line_2` text,
	`postal_code` text NOT NULL,
	`city` text,
	`region` text NOT NULL,
	`suburb` text,
	`district` text,
	`village` text,
	`createdAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
