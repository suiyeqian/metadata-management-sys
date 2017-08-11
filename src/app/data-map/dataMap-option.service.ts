import { Injectable }    from '@angular/core';

@Injectable()
export class datamapOptionService {
  constructor() {}

  getOption() {
    let option = {
    title: {},
    animationDurationUpdate: 1500,
    animationEasingUpdate: 'quinticInOut',
    series: [{
      type: 'graph',
      layout: 'force',
      force: {
        // initLayout:'circular',
        edgeLength: 200,
        repulsion: 50,
        gravity: 0.01
      },
      data: [],
      links: [],
      label: {
        normal: {
          show: true
        }
      },
      cursor: 'pointer',
      edgeLabel: {
        normal: {
          show: true,
          formatter: '{c}'
        }
      },
      roam: true,
      focusNodeAdjacency: true,
      lineStyle: {
        normal: {
          width: 1.2,
          curveness: 0.2,
          opacity: 0.7
        }
      }
    }]
  }

  return option;
  }
}
