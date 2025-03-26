import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { QuizBuilderService } from '../../services/quiz-builder/quiz-builder.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-quiz-builder',
  standalone: false,
  templateUrl: './quiz-builder.component.html',
  styleUrl: './quiz-builder.component.scss'
})
export class QuizBuilderComponent {

  quizBuilderForm: FormGroup;
    // Список доступних типів питань
  questionTypes = ['Single choice', 'Multiple choices', 'Text'];

  constructor(private fb: FormBuilder, private quizzes$: QuizBuilderService, private router: Router) {
    this.quizBuilderForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', Validators.required],
      questions: this.fb.array([this.createQuestion()]), // Стартова форма з одним питанням
    });
  }

    // Getter для доступу до FormArray
  get questions(): FormArray {
      return this.quizBuilderForm.get('questions') as FormArray;
  }

      // Метод для створення нового питання
  createQuestion(): FormGroup {
    return this.fb.group({
      question: ['', Validators.required], // Текст питання
      type: ['Single choice', Validators.required], // Тип питання
      options: this.fb.array([]), // Варіанти відповідей (порожній масив)
    });
  }

    // Додати нове питання
    addQuestion() {
      this.questions.push(this.createQuestion());
    }

      // Видалити питання
  removeQuestion(index: number) {
    this.questions.removeAt(index);
  }

      // Метод для створення нового варіанту відповіді
  createOption(): FormGroup {
    return this.fb.group({
        optionText: ['', Validators.required], // Текст варіанту відповіді
      });
  }

    // Отримати FormArray варіантів відповідей для конкретного питання
  getOptions(questionIndex: number): FormArray {
    return this.questions.at(questionIndex).get('options') as FormArray;
  }

  // Додати варіант відповіді до питання
  addOption(questionIndex: number) {
    this.getOptions(questionIndex).push(this.createOption());
  }

  // Видалити варіант відповіді
  removeOption(questionIndex: number, optionIndex: number) {
    this.getOptions(questionIndex).removeAt(optionIndex);
  }

  saveSurvey() {
    if (this.quizBuilderForm.valid) {
            
      this.quizzes$.addQuiz(this.quizBuilderForm.value).subscribe({
        next: () => {
          this.router.navigate(['/catalog']);
        },
        error: (err) => {
        }
      });
      
    }
  }

}
