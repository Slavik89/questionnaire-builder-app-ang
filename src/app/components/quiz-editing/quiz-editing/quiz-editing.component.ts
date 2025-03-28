import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { QuizDataService } from '../../../services/quiz-data/quiz-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-quiz-editing',
  standalone: false,
  templateUrl: './quiz-editing.component.html',
  styleUrl: './quiz-editing.component.scss'
})
export class QuizEditingComponent implements OnInit {

  quizTitle: string = '';
  quizDescription: string = '';
  quizQuestions: any[] = [];
  quizId: string = '';

  quizEditingForm: FormGroup;

  questionTypes = ['Single choice', 'Multiple choices', 'Text'];

  constructor(
    private router: Router, 
    private quizDataService: QuizDataService, 
    private fb: FormBuilder,
    private snackBar: MatSnackBar) {
   
    this.quizEditingForm = this.fb.group({            
      title: [ '', [Validators.required, Validators.minLength(3)]],
      description: ['', Validators.required],
      questions: this.fb.array([])
    });
  }

  ngOnInit(): void {
    const quizData = this.quizDataService.getQuizData();
    // console.log('Quiz-Editing', quizData);

    if (quizData) {
      // Якщо дані є, зберігаємо їх у змінні
      this.quizTitle = quizData.title;
      this.quizQuestions = quizData.questions;
      this.quizDescription = quizData.description;
      this.quizId = quizData.quizId;

            // Заповнення FormArray
      this.quizEditingForm.setControl('questions', this.fb.array(
        this.quizQuestions.map(q => this.fb.group({
          question: [q.question, Validators.required],
          type: [q.type, Validators.required],
          options: this.fb.array(q.type !== 'Text' ? q.options.map((opt:any) => this.fb.group({ optionText: [opt.optionText, Validators.required] })) : [])
        }))
      ));

          // Оновлюємо значення в формі
      this.quizEditingForm.patchValue({
        title: this.quizTitle,
        description: this.quizDescription,
      });
    }
  }

  get questions(): FormArray {
    return this.quizEditingForm.get('questions') as FormArray;
  }

    // Додавання нового питання
  addQuestion() {
    this.questions.push(this.fb.group({
      question: ['', Validators.required],
      options: this.fb.array([]),
      type: ['Single choice', Validators.required],  
    }));    
  }

  // Видалення питання за індексом
  removeQuestion(index: number) {
    this.questions.removeAt(index);
  }

  getOptions(questionIndex: number): FormArray {
    return this.questions.at(questionIndex).get('options') as FormArray;
  }

  addOption(questionIndex: number): void {
    const question = this.questions.at(questionIndex);
    if (question.get('type')?.value !== 'Text') { // Перевіряємо тип питання
      this.getOptions(questionIndex).push(this.fb.group({
        optionText: ['', Validators.required]
      }));
    }
  }

    // Видалення варіанту відповіді
  removeOption(questionIndex: number, optionIndex: number): void {
    this.getOptions(questionIndex).removeAt(optionIndex);
  } 
  
  cancel() {
    this.router.navigate(['/catalog']);
  }

  onSubmit() {

    this.quizDataService.updateQuiz(this.quizEditingForm.value, this.quizId)
    .then(() => {
      // console.log('Quiz updated successfully!');
      this.snackBar.open('Quiz updated successfully!', 'Close', {
        duration: 3000, 
        panelClass: ['snack-success'] 
      });
      this.router.navigate(['/catalog']);
    })
    .catch(error => {
      this.snackBar.open('Error updating quiz!', 'Close', {
        duration: 3000, 
        panelClass: ['snack-error'] 
      });
    });

  }

}
