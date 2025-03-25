import { Component, OnInit, inject } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'questionnaire-builder-app-ang';

  quizzesContent!: any[];


  ngOnInit(): void {  }

}
