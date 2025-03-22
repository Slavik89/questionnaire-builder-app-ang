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
    this.quizCollection = collection(this.firestore, 'quizzes');
  }

  /*
  addQuiz(quiz: any): Observable<any> {
    return from(addDoc(this.quizCollection, quiz).then(() => console.log("Quiz added successfully", quiz)));
  }  
    */
  
  /*
  addQuiz(quiz: any): Observable<any> {
    return new Observable((observer) => {
      addDoc(this.quizCollection, quiz).then(() => {
        this.zone.run(() => {
          console.log("Quiz added successfully", quiz);
          observer.next("Quiz added successfully");
        });
      }).catch((error) => {
        this.zone.run(() => {
          observer.error(error);
        });
      });
    });
  }
  */

  addQuiz(quiz: any): Observable<any> {
   
    return new Observable((observer) => {
      this.zone.run(() => {
        addDoc(this.quizCollection, quiz)
          .then(() => {
            console.log("Quiz added successfully", quiz);
            observer.next("Quiz added successfully");
            observer.complete();
          })
          .catch((error) => {
            observer.error(error);
          });
      });
    });
  }

}
