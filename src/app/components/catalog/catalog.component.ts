import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { QuizDataService } from '../../services/quiz-data/quiz-data.service';

@Component({
  selector: 'app-catalog',
  standalone: false,
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.scss'
})
export class CatalogComponent implements OnInit {

  quizzesContent!: any[];
  quizzes$ = inject(QuizDataService).getQuizzes();  

  constructor(private router: Router, private quizDataService: QuizDataService) {}

  ngOnInit(): void {
    this.quizzes$.subscribe(
      data => {
        this.quizzesContent = data;
        console.log(this.quizzesContent);
      }
    );
  }

  onOptionClick(option: string, title?: string, questions?: any[],) {
    if (option === "Run") {
      console.log('Succes');
      console.log(option, title, questions);
      console.log(this.quizzesContent);
      this.quizDataService.setQuizData({ title, questions });

      this.router.navigate(['/quiz-taking']);
    } else {
      console.log('Failed');
      console.log('Another option');
    }
  }

}
