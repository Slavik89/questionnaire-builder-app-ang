import { Component, OnInit, inject } from '@angular/core';
import { QuizzesService } from '../../services/quizzes.service';

@Component({
  selector: 'app-catalog',
  standalone: false,
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.scss'
})
export class CatalogComponent {

  quizzesContent!: any[];

  quizzes$ = inject(QuizzesService).getQuizzes();


  ngOnInit(): void {
    this.quizzes$.subscribe(
      data => {
        this.quizzesContent = data;
        console.log(this.quizzesContent);
      }
    );
  }

}
