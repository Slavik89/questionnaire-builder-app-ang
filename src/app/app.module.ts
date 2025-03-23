import { NgModule } from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { firebaseConfig } from '../environments/environment';
import { provideHttpClient } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { QuizBuilderComponent } from './components/quiz-builder/quiz-builder.component'; 

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { CatalogComponent } from './components/catalog/catalog.component';
import { RouterOutlet, provideRouter } from '@angular/router';
import { routes } from './app-routing.module';
import { setLogLevel, LogLevel } from '@angular/fire';
import { MatRadioModule } from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import { QuizTakingComponent } from './components/quiz-taking/quiz-taking.component';

@NgModule({
  declarations: [
    AppComponent,
    QuizBuilderComponent,
    CatalogComponent,
    QuizTakingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,  
    MatButtonModule,
    MatIconModule,

    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatRadioModule,
    MatSelectModule
  ],
  providers: [
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()),
    provideHttpClient(),
    provideRouter(routes)
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 

  constructor() {
    
    setLogLevel(LogLevel.SILENT); 
  }
}
