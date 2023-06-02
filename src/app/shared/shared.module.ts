import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopBarComponent } from './top-bar/top-bar.component';
import { WrapperComponent } from './wrapper/wrapper.component';
import { RouterModule } from '@angular/router';
import { ButtonComponent } from './button/button.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [TopBarComponent, WrapperComponent, ButtonComponent],
  imports: [CommonModule, RouterModule, MatIconModule],
  exports: [TopBarComponent, WrapperComponent, ButtonComponent],
})
export class SharedModule {}
