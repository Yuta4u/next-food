import sql from "better-sqlite3"

const db = sql("meals.db")

export async function getMeals() {
  await new Promise((resolve) => setTimeout(resolve, 2000))
  const query = "SELECT * FROM meals"
  return db.prepare(query).all()
}

export function getMeal(slug: string) {
  const query = "SELECT * From meals WHERE slug = ?"
  return db.prepare(query).get(slug)
}
