import { EventEmitter } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { Subject } from "rxjs";

export class ShoppingListService {
  ingredientsChanged = new Subject<Ingredient[]>();
  editStarted = new Subject<string>();

  ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];

  getIngredients() {
    return [...this.ingredients];
  }

  getIngredient(name: string) {
    return {...this.ingredients.find(a => a.name == name)};
  }

  addIngredient(ingredient: Ingredient) {
    let existingIngredient = this.ingredients.find((a) => a.name === ingredient.name);

    if (existingIngredient) {
      existingIngredient.amount = existingIngredient.amount + ingredient.amount;
    } else {
      this.ingredients.push(ingredient);
    }

    this.ingredientsChanged.next([...this.ingredients]);
  }

  updateIngredient(ingredient: Ingredient) {    
    let existingIngredient = this.ingredients.find((a) => a.name === ingredient.name);

    if (existingIngredient) {
      existingIngredient.amount = ingredient.amount;
    }

    this.ingredientsChanged.next([...this.ingredients]);
  }

  addIngredients(ingredients: Ingredient[]) {
    ingredients.forEach((ingredient) => {
      this.addIngredient(ingredient);
    });
  }

  deleteIngredient(name: string) {
    this.ingredients = this.ingredients.filter(a => a.name !== name);    

    this.ingredientsChanged.next([...this.ingredients]);
  }
}