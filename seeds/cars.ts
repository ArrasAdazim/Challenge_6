import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("cars").del();

  // Inserts seed entries
  await knex("cars").insert([
    {
      nama: "Honda",
      sewa: "Rp. 100.000",
      ukuran: "Large",
      foto: "www.google.com",
      user_id: 1,
    },
    {
      nama: "BMW",
      sewa: "Rp. 100.000",
      ukuran: "Large",
      foto: "www.google.com",
      user_id: 2,
    },
  ]);
}
