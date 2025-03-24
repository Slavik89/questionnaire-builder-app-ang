import { TestBed } from '@angular/core/testing';

import { QuizTakingService } from './quiz-taking.service';

describe('QuizTakingService', () => {
  let service: QuizTakingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuizTakingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
