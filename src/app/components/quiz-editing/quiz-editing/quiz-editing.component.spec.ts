import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizEditingComponent } from './quiz-editing.component';

describe('QuizEditingComponent', () => {
  let component: QuizEditingComponent;
  let fixture: ComponentFixture<QuizEditingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuizEditingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuizEditingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
