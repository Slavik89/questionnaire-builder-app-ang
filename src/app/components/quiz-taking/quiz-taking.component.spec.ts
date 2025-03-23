import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizTakingComponent } from './quiz-taking.component';

describe('QuizTakingComponent', () => {
  let component: QuizTakingComponent;
  let fixture: ComponentFixture<QuizTakingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuizTakingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuizTakingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
