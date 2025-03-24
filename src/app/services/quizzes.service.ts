import { Injectable, inject } from '@angular/core';
// import { inject } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Firestore, collection, collectionData, doc, deleteDoc } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class QuizzesService {

  private firestore = inject(Firestore);

  getQuizzes(): Observable<any[]> {
    const articlesCollection = collection(this.firestore, 'quizId');
    return collectionData(articlesCollection, {idField: 'quizId'}) as Observable<any[]>;
  }

  deleteQuiz(quizId: string): Promise<void> {
    const quizDocRef = doc(this.firestore, `quizId/${quizId}`);
    return deleteDoc(quizDocRef)
      .then(() => console.log(`Quiz with ID ${quizId} deleted successfully.`))
      .catch(error => console.error("Error deleting quiz:", error));
  }
  
}
