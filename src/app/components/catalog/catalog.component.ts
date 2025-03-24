import { Component, OnInit, inject } from '@angular/core';
import { QuizzesService } from '../../services/quizzes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-catalog',
  standalone: false,
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.scss'
})
export class CatalogComponent implements OnInit {

  quizzesContent!: any[];
  quizzes$ = inject(QuizzesService).getQuizzes();

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.quizzes$.subscribe(
      data => {
        this.quizzesContent = data;
        console.log(this.quizzesContent);
      }
    );
  }

  onOptionClick(option: string) {
    if (option === "Run") {
      console.log('Succes');
      console.log(option);
      this.router.navigate(['/quiz-taking']);
    } else {
      console.log('Failed');
      console.log('Another option');
    }
  }

}
