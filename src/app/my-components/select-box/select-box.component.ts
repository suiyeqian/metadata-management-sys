import { Component, Input, EventEmitter, Output, OnChanges } from '@angular/core';

@Component({
  selector: 'my-select-box',
  templateUrl: './select-box.component.html',
  styleUrls: ['./select-box.component.scss']
})
export class SelectBoxComponent implements OnChanges {
  @Input() resultDesc: string;
  @Input() options: Array<any>;
  @Input() advancedOps: Array<any>;
  @Output() onSelectChanged = new EventEmitter<any>();

  advancedOpt = {};

  constructor() {
  }

  ngOnChanges() {
  }

  openCard(advancedOpt: any): void {
    if ( !advancedOpt.selMore || advancedOpt !== this.advancedOpt ) {
      this.advancedOpt = advancedOpt;
      advancedOpt.selMore = true;
    } else {
      advancedOpt.selMore = false;
    }
  }

  select(selOpt, item): void {
    if (!selOpt.selMore) {
      let curIndex = selOpt.selResult.indexOf(item.cdeValue);
      if (selOpt.selResult.length > 1) {
        return;
      }
      if (curIndex !== -1) {
        selOpt.selResult.splice(curIndex, 1);
      } else {
        selOpt.selResult[0] = item.cdeValue;
      }
      selOpt.ifSingle = selOpt.selResult.length ? true : false;
      // let results = [this.options, this.advancedOps];
      this.onSelectChanged.emit();
      // this.getTables('byOption');
    } else {
      let curIndex = selOpt.tmpResult.indexOf(item.cdeValue);
      if ( curIndex !== -1) {
        selOpt.tmpResult.splice(curIndex, 1);
      } else {
        selOpt.tmpResult.push(item.cdeValue);
      }
    }
  }

  selOk(selOpt: any): void {
    selOpt.selResult = [...selOpt.tmpResult];
    selOpt.selMore = false;
    this.onSelectChanged.emit();
    // this.getTables('byOption');
  }
}
