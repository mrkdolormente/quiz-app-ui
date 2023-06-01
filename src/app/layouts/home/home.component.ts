import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  constructor(private readonly _router: Router) {}

  redirectToQuiz() {
    this._router.navigate(['/quiz']);
  }
}
