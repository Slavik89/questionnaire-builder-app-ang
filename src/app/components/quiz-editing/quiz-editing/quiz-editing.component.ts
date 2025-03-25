import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { QuizDataService } from '../../../services/quiz-data/quiz-data.service';

@Component({
  selector: 'app-quiz-editing',
  standalone: false,
  templateUrl: './quiz-editing.component.html',
  styleUrl: './quiz-editing.component.scss'
})
export class QuizEditingComponent implements OnInit {

  quizTitle: string = '';
  quizQuestions: any[] = [];

  // quizEditingForm: FormGroup;

  constructor(private router: Router, private quizDataService: QuizDataService, private fb: FormBuilder) {
   
/*     this.quizEditingForm = this.fb.group({
      completedQuiz: this.fb.array([]),
      totalTime: [0],
      quizTitle: ''
    }); */
  }

  ngOnInit(): void {
    const quizData = this.quizDataService.getQuizData();
    console.log('Quiz-Editing', quizData);

    if (quizData) {
      // Якщо дані є, зберігаємо їх у змінні
      this.quizTitle = quizData.title;
      this.quizQuestions = quizData.questions;
    }
  }

}
