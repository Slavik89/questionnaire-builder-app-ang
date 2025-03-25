import { Injectable, inject } from '@angular/core';
import { Observable, from } from 'rxjs';
import { Firestore, collection, collectionData, doc, deleteDoc, addDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class QuizTakingService {

  private submittedQuiz: any;

  constructor(private firestore: Firestore) {
    this.submittedQuiz = collection(this.firestore, 'submittedQuizzesId');
  }
  
  submitQuiz(quiz: any): Observable<any> {
    return from(addDoc(this.submittedQuiz, quiz).then(() => console.log("Quiz added successfully", quiz)));
  } 
}
