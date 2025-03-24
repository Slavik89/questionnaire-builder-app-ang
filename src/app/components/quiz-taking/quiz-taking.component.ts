import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizDataService } from '../../services/quiz-data/quiz-data.service'; 

@Component({
  selector: 'app-quiz-taking',
  standalone: false,
  templateUrl: './quiz-taking.component.html',
  styleUrl: './quiz-taking.component.scss'
})
export class QuizTakingComponent implements OnInit {

  quizTitle: string | undefined = "";
  quizQuestions: string[] | undefined = [];

  constructor(private router: Router, private quizDataService: QuizDataService) {}

  ngOnInit(): void {

    const quizData = this.quizDataService.getQuizData();

    if (quizData) {
      // Якщо дані є, зберігаємо їх у змінні
      this.quizTitle = quizData.title;
      this.quizQuestions = quizData.questions;
    }

    console.log('quiz-taking', this.quizTitle, this.quizQuestions);

  }

}
