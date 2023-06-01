import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopBarComponent } from './top-bar/top-bar.component';
import { WrapperComponent } from './wrapper/wrapper.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [TopBarComponent, WrapperComponent],
  imports: [CommonModule, RouterModule],
  exports: [TopBarComponent, WrapperComponent],
})
export class SharedModule {}
