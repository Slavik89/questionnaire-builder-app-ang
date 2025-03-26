import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizDataService } from '../../services/quiz-data/quiz-data.service'; 
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { QuizTakingService } from '../../services/quiz-taking/quiz-taking.service';

@Component({
  selector: 'app-quiz-taking',
  standalone: false,
  templateUrl: './quiz-taking.component.html',
  styleUrl: './quiz-taking.component.scss'
})
export class QuizTakingComponent implements OnInit, OnDestroy {

  quizTitle: string | undefined = "";
  quizQuestions: any[] | undefined = [];
  quizId: string = '';

  quizTakingForm: FormGroup;

  timer: number = 0;  
  elapsedTime: string = "00:00:00";

  private startTime!: number;
  private timerInterval!: any;

  constructor(private router: Router, private quizDataService: QuizDataService, private fb: FormBuilder, private quizTaking$: QuizTakingService) {
    // Ініціалізація форми
    this.quizTakingForm = this.fb.group({
      completedQuiz: this.fb.array([]),
      totalTime: [0],
      quizTitle: ''
    });
  }

  ngOnInit(): void {

    const quizData = this.quizDataService.getQuizData();

    if (quizData) {
      // Якщо дані є, зберігаємо їх у змінні
      this.quizTitle = quizData.title;
      this.quizQuestions = quizData.questions;
      this.quizId = quizData.quizId;
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
    this.quizTakingForm.setControl('completedQuiz', this.fb.array(questions));
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
  
  get completedQuiz(): FormArray {
    return this.quizTakingForm.get('completedQuiz') as FormArray;
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
    return String.fromCharCode(97 + index) + ')'; 
  }  

  onSubmit() {
    if (this.quizTakingForm.valid) {

      this.stopTimer();      
      const elapsedMs = Date.now() - this.startTime;
      const totalSeconds = Math.floor(elapsedMs / 1000);
      this.quizTakingForm.patchValue({ totalTime: totalSeconds, quizTitle: this.quizTitle });

      const quizData = { ...this.quizTakingForm.value, quizId: this.quizId };
      console.log('Form Value:', quizData);

      this.quizTaking$.submitQuiz(quizData).subscribe({
        next: () => {
          console.log("Quiz submitted successfully");
          this.router.navigate(['/catalog']);
        },
        error: (err) => {
          console.error("Error adding quiz:", err);
        }
      });
    }
  }

}
