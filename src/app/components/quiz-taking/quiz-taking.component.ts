import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizDataService } from '../../services/quiz-data/quiz-data.service'; 
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-quiz-taking',
  standalone: false,
  templateUrl: './quiz-taking.component.html',
  styleUrl: './quiz-taking.component.scss'
})
export class QuizTakingComponent implements OnInit {

  quizTitle: string | undefined = "";
  quizQuestions: any[] | undefined = [];

  quizTakingForm: FormGroup;

  constructor(private router: Router, private quizDataService: QuizDataService, private fb: FormBuilder) {
    // Ініціалізація форми
    this.quizTakingForm = this.fb.group({
      questions: this.fb.array([]),
    });
  }

  ngOnInit(): void {

    const quizData = this.quizDataService.getQuizData();

    if (quizData) {
      // Якщо дані є, зберігаємо їх у змінні
      this.quizTitle = quizData.title;
      this.quizQuestions = quizData.questions;
    }

    console.log('quiz-taking', this.quizTitle, this.quizQuestions);

    this.loadQuestions();

  }

  loadQuestions() {
    const questions = this.quizQuestions?.map(question => this.createQuestion(question)) || [];
    this.quizTakingForm.setControl('questions', this.fb.array(questions));
  }

    
  createQuestion(question: any): FormGroup {
    switch (question.type) {
      case 'Single choice':
        return this.fb.group({
          question: [question.question, Validators.required],
          options: this.fb.array(question.options.map((opt: any) => this.fb.control(opt.optionText))),
          answer: ['', Validators.required] 
        });

      case 'Multiple choices':
        return this.fb.group({
          question: [question.question, Validators.required],
          options: this.fb.array(question.options.map((opt: any) => this.fb.control(opt.optionText))),
          answers: this.fb.array(question.options.map(() => this.fb.control(false))) 
        });


      case 'Text':
        return this.fb.group({
          question: [question.question, Validators.required],
          answer: ['', Validators.required] 
        });

      default:
        return this.fb.group({
          question: [question.question, Validators.required],
        });
    }
  }
  
  get questions(): FormArray {
    return this.quizTakingForm.get('questions') as FormArray;
  }
  

  onSubmit() {
    if (this.quizTakingForm.valid) {
      console.log('Form Value:', this.quizTakingForm.value);
    }
  }

}
