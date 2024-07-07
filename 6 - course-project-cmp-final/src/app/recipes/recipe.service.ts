import { EventEmitter } from "@angular/core";
import { Recipe } from "./recipe.model";
import { Subject } from "rxjs";

export class RecipeService {
  recipeChanged = new Subject<Recipe[]>();
  recipeSelected = new Subject<Recipe>();

  // recipes: Recipe[] = [
  //   new Recipe(
  //     'Lomo saltado',
  //     'A tasty peruvian food that all countries love',
  //     'https://upload.wikimedia.org/wikipedia/commons/c/ca/Lomo-saltado-perudelights.jpg',
  //     [
  //       {
  //         name: 'Meat',
  //         amount: 1
  //       },
  //       {
  //         name: 'French fries',
  //         amount: 20
  //       }
  //     ]
  //   ),
  //   new Recipe(
  //     'Papa a la huancaina',
  //     'My favorite dessert',
  //     'https://upload.wikimedia.org/wikipedia/commons/3/3c/Papa_huancaina.jpg',
  //     [
  //       {
  //         name: 'Potatoes',
  //         amount: 5
  //       },
  //       {
  //         name: 'Cheese',
  //         amount: 1
  //       }
  //     ])
  // ];
  recipes: Recipe[] = [];

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipeChanged.next(this.recipes);
  }

  getRecipes() {
    return [...this.recipes];
  }

  getRecipe(name: string) {
    return {...this.recipes.find(a => a.name == name)};
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);

    this.recipeChanged.next([...this.recipes]);

    console.log(recipe);    
  }

  updateRecipe(recipe: Recipe) {
    const existingRecipe = this.recipes.find(a => a.name == recipe.name);

    if (existingRecipe) {
      existingRecipe.imagePath = recipe.imagePath;
      existingRecipe.description = recipe.description;
      existingRecipe.ingredients = recipe.ingredients;
    }

    this.recipeChanged.next([...this.recipes]);
  }

  deleteItem(name: string) {
    this.recipes = [...this.recipes.filter(a => a.name != name)];

    this.recipeChanged.next([...this.recipes]);
  }
}