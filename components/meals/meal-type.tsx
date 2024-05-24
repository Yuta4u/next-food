export type TMeal = {
  id: number
  title: string
  slug: string
  image: string
  summary: string
  creator: string
}

export type TMeals = {
  meals: TMeal[] | unknown[]
}
