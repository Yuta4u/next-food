"use client"

import ImagePicker from "@/components/meals/image-picker"
import classes from "./page.module.css"
import { shareMeal } from "@/lib/action"
import { SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

const schema = z.object({
  name: z.string(),
  email: z.string().email(),
  title: z.string().min(8),
  summary: z.string(),
  instructions: z.string(),
  image: z.any(),
})

type TFormFields = z.infer<typeof schema>

export default function ShareMealPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue, // Get setValue to manually set form values
  } = useForm<TFormFields>({
    resolver: zodResolver(schema),
  })

  const onSubmit: SubmitHandler<TFormFields> = async (data) => {
    await new Promise((resolve: any) => setTimeout(resolve, 2000))
    const tempFormData = new FormData()
    Object.entries(data).map((e) => tempFormData.append(e[0], e[1]))
    shareMeal(tempFormData)
  }

  return (
    <>
      <header className={classes.header}>
        <h1>
          Share your <span className={classes.highlight}>favorite meal</span>
        </h1>
        <p>Or any other meal you feel needs sharing!</p>
      </header>
      <main className={classes.main}>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={classes.row}>
            <p>
              <label htmlFor="name">Your name</label>
              <input {...register("name")} type="text" id="name" name="name" />
              {errors.name && (
                <div className={classes["error_msg"]}>
                  {errors.name.message}
                </div>
              )}
            </p>
            <p>
              <label htmlFor="email">Your email</label>
              <input
                {...register("email")}
                type="email"
                id="email"
                name="email"
              />
              {errors.email && (
                <div className={classes["error_msg"]}>
                  {errors.email.message}
                </div>
              )}
            </p>
          </div>
          <p>
            <label htmlFor="title">Title</label>
            <input {...register("title")} type="text" id="title" name="title" />
            {errors.title && (
              <div className={classes["error_msg"]}>{errors.title.message}</div>
            )}
          </p>
          <p>
            <label htmlFor="summary">Short Summary</label>
            <input
              {...register("summary")}
              type="text"
              id="summary"
              name="summary"
            />
            {errors.summary && (
              <div className={classes["error_msg"]}>
                {errors.summary.message}
              </div>
            )}
          </p>
          <p>
            <label htmlFor="instructions">Instructions</label>
            <textarea
              {...register("instructions")}
              id="instructions"
              name="instructions"
              rows={10}
            ></textarea>
            {errors.instructions && (
              <div className={classes["error_msg"]}>
                {errors.instructions.message}
              </div>
            )}
          </p>
          <ImagePicker
            label="Your image"
            name="image"
            register={register}
            setValue={setValue} // Pass setValue to ImagePicker
          />
          <p className={classes.actions}>
            <button disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </p>
        </form>
      </main>
    </>
  )
}
