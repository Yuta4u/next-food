export type TMeal = {
  id: number
  title: string
  slug: string
  image?: any
  summary: string
  creator: string
  creator_email: string
  instructions: string
}

export type TMeals = {
  meals: TMeal[] | unknown[]
}
