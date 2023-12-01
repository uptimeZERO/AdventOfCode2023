import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AdventOfCode2023Component } from './advent-of-code2023/advent-of-code2023.component';
import { AdventOfCodeService } from './advent-of-code.service';

@NgModule({
  declarations: [
    AppComponent,
    AdventOfCode2023Component,
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent, AdventOfCodeService],
})
export class AppModule { }
