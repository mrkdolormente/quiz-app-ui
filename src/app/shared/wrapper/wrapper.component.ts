import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-wrapper',
  templateUrl: './wrapper.component.html',
})
export class WrapperComponent implements OnInit {
  @Input() customClass: string = 'qu-flex qu-items-center';

  constructor() {}

  ngOnInit(): void {}
}
