import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogComponent } from './components/catalog/catalog.component';
import { QuizBuilderComponent } from './components/quiz-builder/quiz-builder.component';

export const routes: Routes = [
  { path: 'catalog', component: CatalogComponent }, 
  // { path: 'quiz-passing', component: CatalogComponent }, 
  { path: 'quiz-building', component: QuizBuilderComponent },
  { path: '',   redirectTo: 'catalog', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
