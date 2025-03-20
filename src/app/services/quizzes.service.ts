import { Injectable } from '@angular/core';
// import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class QuizzesService {

  constructor(private http: HttpClient, public firestore: Firestore) { }

  getQuizzes() {
    const articlesCollection = collection(this.firestore, 'quizzes');
    return collectionData(articlesCollection, {idField: 'quizzes'}) as Observable<any[]>;;
  }
}
