import { Component, OnInit, inject } from '@angular/core';
import { QuizzesService } from './services/quizzes.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'questionnaire-builder-app-ang';

  quizzesContent!: any[];

  quizzes$ = inject(QuizzesService).getQuizzes();


  ngOnInit(): void {

    
/*     this.quizzes$.subscribe(
      data => {
        this.quizzesContent = data;
        console.log(this.quizzesContent);
      }
    ); */

  }



}
