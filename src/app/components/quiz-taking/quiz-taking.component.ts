import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizDataService } from '../../services/quiz-data/quiz-data.service'; 
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-quiz-taking',
  standalone: false,
  templateUrl: './quiz-taking.component.html',
  styleUrl: './quiz-taking.component.scss'
})
export class QuizTakingComponent implements OnInit, OnDestroy {

  quizTitle: string | undefined = "";
  quizQuestions: any[] | undefined = [];

  quizTakingForm: FormGroup;

  timer: number = 0;  
  elapsedTime: string = "00:00:00";

  private startTime!: number;
  private timerInterval!: any;

  constructor(private router: Router, private quizDataService: QuizDataService, private fb: FormBuilder) {
    // Ініціалізація форми
    this.quizTakingForm = this.fb.group({
      questions: this.fb.array([]),
      totalTime: [0]
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
    this.startTimer();
  }

  ngOnDestroy(): void {
    this.stopTimer(); 
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

    // Запуск таймера
  startTimer() {
    this.startTime = Date.now();
    this.timerInterval = setInterval(() => {
      const elapsedMs = Date.now() - this.startTime;
      const totalSeconds = Math.floor(elapsedMs / 1000);
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;

      this.elapsedTime = `${this.pad(hours)}:${this.pad(minutes)}:${this.pad(seconds)}`;
    }, 1000);
  }

  pad(value: number): string {
    return value.toString().padStart(2, "0");
  }

    // Зупинка таймера
  stopTimer() {
    if (this.timerInterval) {      
      clearInterval(this.timerInterval);
    }
  }  

  getOptionLabel(index: number): string {
    return String.fromCharCode(97 + index) + ')'; // 97 - код 'a' в ASCII
  }
  

  onSubmit() {
    if (this.quizTakingForm.valid) {


      this.stopTimer();
      // Запис фінального часу у totalTime
      const elapsedMs = Date.now() - this.startTime;
      const totalSeconds = Math.floor(elapsedMs / 1000);
      this.quizTakingForm.patchValue({ totalTime: totalSeconds });

      console.log('Total time spent:', this.elapsedTime);
      console.log('Form Value:', this.quizTakingForm.value);
    }
  }

}
