import { Injectable, NgZone, inject } from '@angular/core';
import { Observable, from } from 'rxjs';
import { Firestore, collection, collectionData, addDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class QuizBuilderService {

  private quizCollection: any;

  constructor(private firestore: Firestore, private zone: NgZone) {
    this.quizCollection = collection(this.firestore, 'quizId');
  }

  
  addQuiz(quiz: any): Observable<any> {
    return from(addDoc(this.quizCollection, quiz));
  }
  
}
