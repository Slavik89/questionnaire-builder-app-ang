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

  onClickRun(title: string, questions: any[]) {
    console.log('Run option', title, questions);
    console.log(this.quizzesContent);
    this.quizDataService.setQuizData({ title, questions });
    this.router.navigate(['/quiz-taking']);
  } 

  onClickEdit(title: string, questions: any[]) {
    console.log('Edit option', title, questions);
    console.log(this.quizzesContent);
    this.quizDataService.setQuizData({ title, questions });
    this.router.navigate(['/quiz-editing']);
  } 

  onClickDelete(title: string, quizId: string) {
    console.log('Delete option', title, quizId);    
  }
}
