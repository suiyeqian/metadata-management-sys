import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'my-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})

export class ModalComponent implements OnChanges {
  @Input() msg: any;
  
  
  
  constructor() {
    
  }
  
  ngOnChanges() {
    console.log(this.msg);

  }
}