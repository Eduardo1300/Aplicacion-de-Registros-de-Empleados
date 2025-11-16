import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    // ...existing components...
  ],
  imports: [
    BrowserModule,
    CommonModule, // Ensure CommonModule is imported
    // ...existing modules...
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}