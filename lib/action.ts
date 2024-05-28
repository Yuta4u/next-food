"use server"

import { redirect } from "next/navigation"
import { saveMeal } from "./meals"
import { TMeal } from "@/components/meals/meal-type"

// export const shareMeal = async (prevState: any, formData: any) => {
export const shareMeal = async (formData: any) => {
  "use server"
  const formObject: any = {}
  formData.forEach((value: any, key: string) => {
    formObject[key] = value
  })

  if (formObject.title) {
    const meal = {
      title: formObject.title,
      summary: formObject.summary,
      instructions: formObject.instructions,
      image: formObject.image,
      creator: formObject.name,
      creator_email: formObject.email,
    }
    await saveMeal(meal)
    redirect("/meals")
  } else {
    throw new Error()
  }
}
