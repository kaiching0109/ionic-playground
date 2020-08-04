import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../recipes.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.page.html',
  styleUrls: ['./recipe-detail.page.scss'],
})
export class RecipeDetailPage implements OnInit {

  loadedRecipe: Recipe;
  constructor(private activatedRoute: ActivatedRoute, router: Router, private recipeService: RecipeService) {
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if(!paramMap.has('recipeId')){
      } else {
        const recipeId = paramMap.get('recipeId');
        this.loadedRecipe = this.recipeService.getRecipe(recipeId);
      }
    })
  }

}
