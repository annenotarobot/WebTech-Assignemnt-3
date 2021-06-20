import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDialogModule } from '@angular/material/dialog';

import { AppComponent } from './app.component';
import { PopupComponent } from './utils/popup/popup.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSelectModule} from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { BubbleComponent } from './utils/bubble/bubble.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import * as $ from 'jquery';  


@NgModule({
  declarations: [
    AppComponent,
    PopupComponent,
    BubbleComponent
  ],
  imports: [
    BrowserModule, HttpClientModule,
    MatDialogModule, MatInputModule,
    MatButtonModule, MatCardModule, MatFormFieldModule, BrowserAnimationsModule, MatExpansionModule,
    MatSelectModule, DragDropModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
