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
  // quizBuilderData: any ={title:'', description:''};

  // quizzes$ = inject(QuizBuilderService);

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

  saveSurvey() {
    if (this.quizBuilderForm.valid) {
      // this.quizBuilderData = this.quizBuilderForm.value;
      console.log('Save', this.quizBuilderForm.value);


      
/*       this.quizzes$.addQuiz(this.quizBuilderForm).subscribe({
        next: () => {
          console.log("Quiz added successfully");
          this.router.navigate(['/catalog']);
        },
        error: (err) => {
          console.error("Error adding quiz:", err);
        }
      }); */
      
    }
  }

}
