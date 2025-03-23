import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QuizBuilderService } from '../../services/quiz-builder/quiz-builder.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-quiz-builder',
  standalone: false,
  templateUrl: './quiz-builder.component.html',
  styleUrl: './quiz-builder.component.scss'
})
export class QuizBuilderComponent {

  quizBuilderForm!: FormGroup;
  quizBuilderData: any ={title:'', description:''};

  // quizzes$ = inject(QuizBuilderService);

  constructor(private fb: FormBuilder, private quizzes$: QuizBuilderService, private router: Router) {
    this.quizBuilderForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
    });
  }

  saveSurvey() {
    if (this.quizBuilderForm.valid) {
      this.quizBuilderData = this.quizBuilderForm.value;
      console.log('Save', this.quizBuilderData);
      
      this.quizzes$.addQuiz(this.quizBuilderData).subscribe({
        next: () => {
          console.log("Quiz added successfully");
          this.router.navigate(['/catalog']);
        },
        error: (err) => {
          console.error("Error adding quiz:", err);
        }
      });
      
    }
  }

}
