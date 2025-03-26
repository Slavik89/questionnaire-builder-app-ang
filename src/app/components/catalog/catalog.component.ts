import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { QuizDataService } from '../../services/quiz-data/quiz-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-catalog',
  standalone: false,
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.scss'
})
export class CatalogComponent implements OnInit {

  quizzesContent!: any[];
  quizzes$ = inject(QuizDataService).getQuizzes();   
  completedQuizzes: any[] = [];  // масив з завершеними квізами

  constructor(private router: Router, private quizDataService: QuizDataService,
    private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.quizzes$.subscribe(
      data => {
        this.quizzesContent = data;
        console.log(this.quizzesContent);
      }
    );

    this.quizDataService.getCompletedQuizzes().subscribe(
      (data:any[]) => {
        console.log('Completed quizzesId', data),
        this.completedQuizzes = data;
      }
    );
  }

  onClickRun(quiz: any) {
    console.log('Run option', quiz.title, quiz.questions);
    console.log(this.quizzesContent);
    this.quizDataService.setQuizData(quiz);
    this.router.navigate(['/quiz-taking']);
  } 

  onClickEdit(quiz: any) {
    console.log('Edit option', quiz.title, quiz.questions);
    console.log(this.quizzesContent);
    this.quizDataService.setQuizData(quiz);
    this.router.navigate(['/quiz-editing']);
  } 

  onClickDelete(quiz: any) {
    this.quizDataService.deleteQuiz(quiz.quizId).subscribe({
      next: () => {        
        // Показуємо помилку
        this.snackBar.open('The quiz was deleted successfully.', 'Close', {
          duration: 3000,
          panelClass: ['error-snackbar'],
        });},
      error: (error) => {
        this.snackBar.open('Error deleting quiz. Please try again.', 'Close', {
          duration: 3000,
          panelClass: ['error-snackbar'],
        });
      }
    }); 
  }

  getCompletedCount(quizId: string): number {
    return this.completedQuizzes.filter(completedQuiz => completedQuiz.quizId === quizId).length;
  }
}
