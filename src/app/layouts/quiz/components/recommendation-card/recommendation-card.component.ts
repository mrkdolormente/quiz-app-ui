import { DOCUMENT } from '@angular/common';
import { Component, Inject, Input } from '@angular/core';
import { RECOMMENDATIONS } from 'src/app/constants/recommendations';
import { Recommendation } from 'src/app/models/recommendation.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-recommendation-card',
  templateUrl: './recommendation-card.component.html',
})
export class RecommendationCardComponent {
  @Input() recommendation: Recommendation | null = null;

  constructor(@Inject(DOCUMENT) private readonly _document: Document) {}

  redirectToTestAndTrain(): void {
    this._document.location.href = environment.testAndTrainUrl;
  }
}
