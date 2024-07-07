import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrl: './recipe-edit.component.css'
})
export class RecipeEditComponent implements OnInit {
  manageRecipeForm: FormGroup;

  currentName: string;
  editMode = false;

  get getDefaultIngredients() {
    return (<FormArray>this.manageRecipeForm.get('ingredients')).controls;
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.currentName = params.name;
      this.editMode = params.name != null;

      this.initForm();
    })
  }

  initForm() {
    const recipe = (this.editMode) ? this.recipeService.getRecipe(this.currentName) : null;
    const defaultIngredients = new FormArray([]);

    if (recipe != null) {
      for (const ingredient of recipe?.ingredients) {
        defaultIngredients.push(new FormGroup({
          name: new FormControl(ingredient.name, Validators.required),
          amount: new FormControl(ingredient.amount, [
            Validators.required,
            Validators.pattern(/^[1-9]+[0-9]*$/)
          ])
        }))
      }
    }

    this.manageRecipeForm = new FormGroup({
      name: new FormControl(recipe?.name ?? null, Validators.required),
      imageURL: new FormControl(recipe?.imagePath ?? null, Validators.required),
      description: new FormControl(recipe?.description ?? null, Validators.required),
      ingredients: defaultIngredients
    });
  }

  onAddIngredient() {
    (<FormArray>this.manageRecipeForm.get('ingredients')).push(new FormGroup({
      name: new FormControl(null, Validators.required),
      amount: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[1-9]+[0-9]*$/)
      ])
    }))
  }

  onDeleteRecipe() {
    this.recipeService.deleteItem(this.currentName);

    this.router.navigate(['/recipes']);
  }

  onDeleteRecipeIngredient(index: number) {
    (<FormArray>this.manageRecipeForm.get('ingredients')).removeAt(index);
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onSubmit() {
    const recipe: Recipe = {
      name: this.manageRecipeForm.get('name').value,
      imagePath: this.manageRecipeForm.get('imageURL').value,
      description: this.manageRecipeForm.get('description').value,
      ingredients: this.manageRecipeForm.get('ingredients').value
    }

    if (this.editMode) {
      this.recipeService.updateRecipe(recipe);
    } else {
      this.recipeService.addRecipe(recipe);
    }

    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
