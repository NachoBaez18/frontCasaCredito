import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { HeaderModalComponent } from './header-modal.component';



@NgModule({
  declarations: [
    HeaderModalComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    HeaderModalComponent
  ],
  providers:[
    CurrencyPipe
  ]
  
})
export class HeaderModalModule { }
