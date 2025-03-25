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
  quizDescription: string = '';
  quizQuestions: any[] = [];

  quizEditingForm: FormGroup;

  questionTypes = ['Single choice', 'Multiple choices', 'Text'];

  constructor(private router: Router, private quizDataService: QuizDataService, private fb: FormBuilder) {
   
    this.quizEditingForm = this.fb.group({            
      title: [ '', [Validators.required, Validators.minLength(3)]],
      description: ['', Validators.required],
      questions: this.fb.array([])
    });
  }

  ngOnInit(): void {
    const quizData = this.quizDataService.getQuizData();
    console.log('Quiz-Editing', quizData);

    if (quizData) {
      // Якщо дані є, зберігаємо їх у змінні
      this.quizTitle = quizData.title;
      this.quizQuestions = quizData.questions;
      this.quizDescription = quizData.description;

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
  

  onSubmit() {
    console.log('Save Changes', this.quizEditingForm.value);
  }

}
