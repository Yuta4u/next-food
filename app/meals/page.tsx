import Link from "next/link"
import classes from "./page.module.css"
import MealsGrid from "@/components/meals/meal-grid"
import { getMeals } from "@/lib/meals"
import { TMeal } from "@/components/meals/meal-type"
import { Suspense } from "react"

async function Meals() {
  const meals: TMeal[] | unknown[] = await getMeals()
  return <MealsGrid meals={meals} />
}

export default async function MealsPage() {
  return (
    <>
      <header className={classes.header}>
        <h1>
          Delicious meals, <span className={classes.highlight}>by you</span>
        </h1>
        <p>
          Choose your favorite recipe and cook it yourself. It is easy and fun!
        </p>
        <p className={classes.cta}>
          <Link href="/meals/share">Share your favorite Recipe</Link>
        </p>
      </header>
      <main className={classes.main}>
        <Suspense
          fallback={<p className={classes.loading}>Fetching data...</p>}
        >
          <Meals />
        </Suspense>
      </main>
    </>
  )
}
