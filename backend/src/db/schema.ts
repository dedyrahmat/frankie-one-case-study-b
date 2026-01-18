import { sql } from "drizzle-orm";
import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const countries = ["USA", "AUS", "IDN"] as const;

export const addressTable = sqliteTable("address_table", {
  id: int("id").primaryKey({ autoIncrement: true }),
  countryCode: text("country_code", { enum: countries }).notNull(),
  // USA/AUS: Address Line 1, IDN: Street Address
  addressLine1: text("address_line_1").notNull(),
  addressLine2: text("address_line_2"),
  postalCode: text("postal_code").notNull(),

  // USA: City, IDN: City/Regency
  city: text("city"),

  // --- Country Specific Logic ---

  // USA/AUS: State, IDN: Province
  region: text("region").notNull(),
  // AUS: Suburb
  suburb: text("suburb"),
  // IDN: District (Kecamatan)
  district: text("district"),
  // IDN: Village (Kelurahan/Desa)
  village: text("village"),
  createdAt: text()
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});

export type Address = typeof addressTable.$inferSelect;
export type InsertAddress = typeof addressTable.$inferInsert;
