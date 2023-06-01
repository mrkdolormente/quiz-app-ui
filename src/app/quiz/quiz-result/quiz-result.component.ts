import { Component, OnInit } from '@angular/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-quiz-result',
  templateUrl: './quiz-result.component.html',
})
export class QuizResultComponent implements OnInit {
  spinnerColor: ThemePalette = 'primary';
  spinnerMode: ProgressSpinnerMode = 'determinate';
  spinnerValue: number = 50;
  constructor() {}

  ngOnInit(): void {}
}
