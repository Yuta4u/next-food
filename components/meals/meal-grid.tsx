import classes from "./meal-grid.module.css"
import MealItem from "./meal-item"
import { TMeal, TMeals } from "./meal-type"

export default function MealsGrid({ meals }: TMeals) {
  return (
    <ul className={classes.meals}>
      {meals.map((meal: any) => (
        <li id={`${meal.id}`}>
          <MealItem {...meal} />
        </li>
      ))}
    </ul>
  )
}
