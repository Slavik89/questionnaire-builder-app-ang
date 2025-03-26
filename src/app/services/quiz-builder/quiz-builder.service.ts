import { Injectable, NgZone, inject } from '@angular/core';
import { Observable, from } from 'rxjs';
import { Firestore, collection, collectionData, addDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class QuizBuilderService {

  // private firestore = inject(Firestore);
  // private quizCollection = collection(this.firestore, 'quizzes');

  private quizCollection: any;

  constructor(private firestore: Firestore, private zone: NgZone) {
    this.quizCollection = collection(this.firestore, 'quizId');
  }

  
  addQuiz(quiz: any): Observable<any> {
    return from(addDoc(this.quizCollection, quiz).then(() => console.log("Quiz added successfully", quiz)));
  }
  
}
