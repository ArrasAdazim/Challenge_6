import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("cars", (table: Knex.TableBuilder) => {
    table.bigIncrements("id").primary();
    table.string("nama", 30).notNullable();
    table.string("sewa", 30).notNullable();
    table.string("ukuran", 15);
    table.text("foto");
    table.bigInteger("user_id");
    table.bigInteger("updated_by");
    table.bigInteger("deleted_by");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
    table.timestamp("deleted_at")
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("cars");
}
