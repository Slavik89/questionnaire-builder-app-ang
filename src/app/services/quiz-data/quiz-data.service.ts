import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Firestore, collection, collectionData, doc, deleteDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class QuizDataService {

  private firestore = inject(Firestore);
  private quizData: { title: string; questions: any[] } | null = null;
  

  getQuizzes(): Observable<any[]> {
    const articlesCollection = collection(this.firestore, 'quizId');
    return collectionData(articlesCollection, {idField: 'quizId'}) as Observable<any[]>;
  }

  setQuizData(quizData: any) {
    this.quizData = quizData; // Зберігаємо об'єкт у сервісі
    console.log("Set quiz data service", this.quizData);
  }

  getQuizData() {
    return this.quizData;
  }

  deleteQuiz(quizId: string): Promise<void> {
    const quizDocRef = doc(this.firestore, `quizId/${quizId}`);
    return deleteDoc(quizDocRef)
      .then(() => console.log(`Quiz with ID ${quizId} deleted successfully.`))
      .catch(error => console.error("Error deleting quiz:", error));
  }

}  
