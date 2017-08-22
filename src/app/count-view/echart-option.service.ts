import { Injectable }    from '@angular/core';

@Injectable()
export class EchartOptionService {
  constructor() {}

  getOption(type: string ) {
    let option;
    switch (type) {
    case 'line':
    option = {
      tooltip: {
        trigger: 'axis',
        textStyle: {
          align: 'left'
        }
      },
      legend: {
        data: []
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      color: ['#16c6eb', '#29e9bd', '#ae8ad1', '#f4c42d', '#f44336', '#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae'],
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: [],
        splitLine: {
          show: true,
          lineStyle: {
            type: 'dashed'
          }
        }
      },
      yAxis: {
        type: 'value',
        splitLine: {
          show: true,
          lineStyle: {
            type: 'dashed'
          }
        },
        axisLabel : {
          formatter: '{value} 个'
        }
      },
      series: []
    };
      break;
    case 'bar':
      option = {
        tooltip : {
          trigger: 'axis',
          axisPointer : {
            type : 'shadow'
          },
          formatter: '{b}：{c} GB'
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: [],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
          }
        ],
        series: [
          {
            type: 'bar',
            barWidth: '60%',
            label: {
              normal: {
                  show: true,
                  position: 'top',
              }
            },
            data: [],
            itemStyle: {
              normal: {
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [{
                    offset: 0, color: '#2aeabe'
                  }, {
                    offset: 1, color: '#15c6eb'
                  }],
                }
              }
            }
          }
        ]
      };
      break;
    default:
      throw new Error('Undefined chart type');
    }
    return option;
  }
}
