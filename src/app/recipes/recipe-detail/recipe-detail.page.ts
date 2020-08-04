import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../recipes.service';
import { Recipe } from '../recipe.model';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.page.html',
  styleUrls: ['./recipe-detail.page.scss'],
})
export class RecipeDetailPage implements OnInit {

  loadedRecipe: Recipe;
  constructor(
    private activatedRoute: ActivatedRoute, 
    private router: Router, 
    private recipeService: RecipeService, 
    private alertCtl: AlertController
    ) {
    }
    
    ngOnInit() {
      this.activatedRoute.paramMap.subscribe(paramMap => {
        if(!paramMap.has('recipeId')){
          this.router.navigate(['/recipes'])
        } else {
          const recipeId = paramMap.get('recipeId');
          this.loadedRecipe = this.recipeService.getRecipe(recipeId);
        }
      })
  }

  onDeleteRecipe() {
    this.alertCtl.create({
      header: 'Confirm', 
      message: 'Are you sure to remove this recipe?',
      buttons: [
      {
        text: 'Cancel',
        role: 'cancel'
      },
      {
        text: 'Delete',
        handler: () => { 
          this.recipeService.deleteRecipe(this.loadedRecipe?.id);
          this.router.navigate(['/recipes'])
        }
      }
    ]
    }, ).then(alertEle => alertEle.present())
  }
}
