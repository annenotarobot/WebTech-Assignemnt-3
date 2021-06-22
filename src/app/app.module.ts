import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDialogModule} from '@angular/material/dialog';

import {AppComponent} from './app.component';
import {PopupComponent} from './utils/popup/popup.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSelectModule} from '@angular/material/select';
import {BubbleComponent} from './utils/bubble/bubble.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatListModule} from '@angular/material/list';


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
    MatSelectModule, DragDropModule, ScrollingModule, MatButtonToggleModule, MatListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
