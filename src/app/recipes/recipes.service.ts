import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipes: Recipe[] = [
    {
      id: 'r1',
      title: 'Schnitzel',
      imageUrl: 'https://dictionary.cambridge.org/ja/images/thumb/schnit_noun_002_32346.jpg?version=5.0.107',
      ingredients: ['French Fries', 'Pork Meat', 'Salad']
    },
    {
      id: 'r2',
      title: 'Spaghetti',
      imageUrl: 'https://www.thechunkychef.com/wp-content/uploads/2019/09/One-Pot-Spaghetti-feat.jpg',
      ingredients: ['Spaghetti', 'Meat', 'Tomatos']
    }
  ];

  constructor() { }

  getAllRecipes() {
    return [...this.recipes];
  }

  getRecipe(recipeId: string) {
    return this.recipes.find(recipe => recipe.id === recipeId)
  }

  deleteRecipe(recipeId: string) {
    this.recipes = this.recipes.filter(recipe => recipe?.id !== recipeId)
  }
}
