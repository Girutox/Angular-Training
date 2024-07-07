import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { Form, NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('form') shoppingForm: NgForm;
  currentEditedName: string;
  subscription: Subscription;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.subscription = this.shoppingListService.editStarted.subscribe((name: string) => {
      this.currentEditedName = name;
      this.setFormValues(this.currentEditedName);
    })
  }

  onAddIngredient() {
    const values = this.shoppingForm.value;

    if (this.currentEditedName) { // Update
      this.shoppingListService.updateIngredient(new Ingredient(values.name, +values.amount));
    } else { // Add
      this.shoppingListService.addIngredient(new Ingredient(values.name, +values.amount));
    }

    this.clearForm();
  }

  setFormValues(name: string) {
    const ingredient = this.shoppingListService.getIngredient(this.currentEditedName);

    this.shoppingForm.setValue(
      {
        name: ingredient.name,
        amount: ingredient.amount
      }
    );
  }

  clearForm() {
    this.shoppingForm.reset();
    this.currentEditedName = "";
  }

  onDelete() {
    this.shoppingListService.deleteIngredient(this.currentEditedName);
    this.clearForm();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
