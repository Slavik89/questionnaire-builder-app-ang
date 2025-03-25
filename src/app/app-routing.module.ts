import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogComponent } from './components/catalog/catalog.component';
import { QuizBuilderComponent } from './components/quiz-builder/quiz-builder.component';
import { QuizTakingComponent } from './components/quiz-taking/quiz-taking.component';
import { QuizEditingComponent } from './components/quiz-editing/quiz-editing/quiz-editing.component';

export const routes: Routes = [
  { path: 'catalog', component: CatalogComponent },   
  { path: 'quiz-building', component: QuizBuilderComponent },
  { path: 'quiz-taking', component: QuizTakingComponent }, 
  { path: 'quiz-editing', component: QuizEditingComponent }, 
  { path: '',   redirectTo: 'catalog', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
