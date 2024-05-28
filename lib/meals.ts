import { TMeal } from "@/components/meals/meal-type"
import sql from "better-sqlite3"
import slugify from "slugify"
import xss from "xss"
import fs from "node:fs"

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

export async function saveMeal(meal: any) {
  console.log(meal, "ini meal")
  meal.slug = slugify(meal.title, { lower: true })
  meal.instructions = xss(meal.instructions)

  const extension = meal.image.name.split(".").pop()
  const fileName = `${meal.slug}.${extension}`

  const stream = fs.createWriteStream(`public/images/${fileName}`)
  const bufferedImage = await meal.image.arrayBuffer()

  stream.write(Buffer.from(bufferedImage), (error) => {
    if (error) {
      throw new Error("Failed saving image")
    }
  })

  meal.image = `/images/${fileName}`
  db.prepare(
    `
    INSERT INTO meals 
      (title, summary, instructions, creator, creator_email, image, slug)
      VALUES (
        @title,
        @summary,
        @instructions,
        @creator,
        @creator_email,
        @image,
        @slug
      );
  `
  ).run(meal)
}
