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
      next: () => console.log(`Quiz with ID ${quiz.quizId} deleted successfully.`),
      error: (error) => console.error("Error deleting quiz:", error)
    }); 
  }
}
