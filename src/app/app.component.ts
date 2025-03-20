import { Component, OnInit } from '@angular/core';
import { QuizzesService } from './services/quizzes.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'questionnaire-builder-app-ang';

  quizzesContent!: any[];

  constructor(public quizzesService: QuizzesService) {}

  ngOnInit(): void {
    
    // Getting data about articles from the Firebase
    this.quizzesService.getQuizzes().subscribe(
      data => {
        this.quizzesContent = data;
        console.log(this.quizzesContent);
      }
    );

  }
}
