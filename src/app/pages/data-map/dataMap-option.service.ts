import { Injectable }    from '@angular/core';

@Injectable()
export class DatamapOptionService {
  constructor() {}

  getOption() {
    let option = {
    title: {},
    tooltip: {
      formatter: (params: any):any => {
        console.log(params);
      },
      extraCssText: 'text-align: left;'
    },
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
          textStyle: {
            color: '#fff',
            fontSize: 12
          },
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
      symbol: 'circle',
      itemStyle: {
        normal: {
          color: '自适应'
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
  };

  return option;
  }
}
