import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quiz-taking',
  standalone: false,
  templateUrl: './quiz-taking.component.html',
  styleUrl: './quiz-taking.component.scss'
})
export class QuizTakingComponent implements OnInit {

  constructor(private router: Router) {}

  ngOnInit(): void {

    console.log('quiz-taking');

  }

}
