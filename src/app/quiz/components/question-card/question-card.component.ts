import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-question-card',
  templateUrl: './question-card.component.html',
  styleUrls: ['./question-card.component.scss'],
  host: {
    class: 'question-card',
  },
})
export class QuestionCardComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
