import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-quiz-builder',
  standalone: false,
  templateUrl: './quiz-builder.component.html',
  styleUrl: './quiz-builder.component.scss'
})
export class QuizBuilderComponent {

  quizBuilderForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.quizBuilderForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
    });
  }

  saveSurvey() {
    if (this.quizBuilderForm.valid) {
      const quizbuilderData = this.quizBuilderForm.value;
      console.log('Save', quizbuilderData);
    }
  }

}
