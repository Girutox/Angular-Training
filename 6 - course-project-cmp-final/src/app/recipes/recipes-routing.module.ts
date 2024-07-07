import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuardService } from "../auth/auth-guard.service";

import { RecipeDefaultComponent } from "./recipe-detail/recipe-default/recipe-default.component";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeResolverService } from "./recipe-resolver.service";
import { RecipesComponent } from "./recipes.component";

const routes: Routes = [
  {
    path: "",
    canActivate: [AuthGuardService],
    component: RecipesComponent,
    children: [
      {
        path: '',
        component: RecipeDefaultComponent,
        pathMatch: "full"
      },
      {
        path: "new",
        component: RecipeEditComponent,
        resolve: [RecipeResolverService]
      },
      {
        path: ":name",
        component: RecipeDetailComponent,
        resolve: [RecipeResolverService]
      },      
      {
        path: ":name/edit",
        component: RecipeEditComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
}) 
export class RecipesRoutingModule {

}