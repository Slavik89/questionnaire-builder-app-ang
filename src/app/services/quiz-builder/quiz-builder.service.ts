import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class QuizBuilderService {

  private quizCollection: any;

  constructor(private firestore: Firestore) {
    this.quizCollection = collection(this.firestore, 'quizId');
  }
  
  addQuiz(quiz: any): Observable<any> {
    return from(addDoc(this.quizCollection, quiz));
  }
  
}
