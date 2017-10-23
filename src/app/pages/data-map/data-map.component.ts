import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BackendService } from '../../core/services/backend.service';
import { DatamapOptionService } from './dataMap-option.service';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'my-data-map',
  templateUrl: './data-map.component.html',
  styleUrls: ['./data-map.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class DataMapComponent implements OnInit {
  pagetitle = '数据地图';
  searchModel= {
    tableName: '',
    dbName: ''
  };
  searchListData = [];
  isChNm = false;
  tableName: string;
  bloodRelationModalData = {};
  searchList = [];
  searchResult = false;
  searchTime = {};
  isFocus = false;


  relatedOption: any;
  bloodRelationMapOption: any;
  showAlert = false;
  inputAlert = false;


  private tableNameType = /[\u4E00-\u9FA5\uF900-\uFA2D]/;
  private searchTableListUrl = 'datamap/searchTableInfo';
  private bubbleDataUrl = 'datamap/searchDataMap';
  private searchBloodRelationTableUrl = 'datamap/searchTableBloodRelationInfo';


  constructor(
    private backendService: BackendService,
    private datamapOpt: DatamapOptionService,
    private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.getBubbleData();
  }

  getBubbleData(): void {
    this.backendService
        .getAll(this.bubbleDataUrl)
        .then((res) => this.bubbleOption(res));
  }

  openModal(content): void {
    this.modalService.open(content, { windowClass: 'help-modal', size:'lg' });
  }
  getTableList(name: string): void {
    this.backendService
        .getItemsByJsonParams(this.searchTableListUrl,{tableName: name})
        .then((res) => {
          this.searchList = res;
          this.bloodRelationModalData = res;
        });
  }

  showSearchList(): void {
    this.isFocus = true;
    this.showAlert = false;
  }

  chooseTable($event): void {
    let str = $event.target.innerHTML;
    let dbName = str.split('.')[0];
    let tableName = str.split('.')[1];
    this.searchModel.tableName = tableName;
    this.searchModel.dbName = dbName + '.';
    this.isFocus = false;
// console.log(this.searchModel);
  }

  hideSearchList(): void {
    setTimeout(() => {
      this.isFocus = false;
    }, 200);
  }


  delaySearch(msg: string, fn: any, wait: number): any {
    if (this.searchTime[msg]) {
        window.clearTimeout(this.searchTime[msg]);
        delete this.searchTime[msg];
    }
    return this.searchTime[msg] = window.setTimeout(() => {
        fn();
        delete this.searchTime[msg];
    }, wait);
  }

  tableNameChange(name: string): void {
// console.log(this.searchModel);
// console.log(name);
    if (name.indexOf('.') !== -1) {
      if (name.match(/\./g).length > 1) {
        this.inputAlert = true;
        this.searchModel.tableName = '';
      }else {
        if (this.tableNameType.test(name)) {
          this.isChNm = true;
        }else {
          this.isChNm = false;
        }
        this.tableName = name.split('.')[1];
        this.searchModel.tableName = name.split('.')[1];
        this.searchModel.dbName = name.split('.')[0] + '.';
      }
    }else {
      if (this.tableNameType.test(name)) {
        this.isChNm = true;
      }else {
        this.isChNm = false;
      }
      this.searchModel.dbName = '';
      this.tableName = name;
      this.searchModel.tableName = name;
    }
    if (name) {
      this.delaySearch('send', () => {
        this.getTableList(this.tableName);
      }, 500);
    }else {
      return;
    }
  }

  unique(arr: Array<any>): Array<any> {
    let ret = [];
    let len = arr.length;
    let isRepeat;
    for (let i = 0; i < len; i++) {
      isRepeat = false;
      for (let j = i + 1; j < len; j++) {
        if (arr[i].stringVal === arr[j].stringVal) {
          isRepeat = true;
          break;
        }
      }
      if (!isRepeat) {
          ret.push(arr[i]);
      }
    }
    return ret;
  }

  // 中文字符排序
  order(words: string): string {
      return words.split('').sort(function(a, b){
        return a.localeCompare(b);
      }).join('');
  }

  onSearch(): void {
    if (this.searchModel.tableName.trim()) {
      this.backendService
        .getItemsByJsonParams(this.searchBloodRelationTableUrl, {tableName: this.searchModel.tableName.trim(),dbName: this.searchModel.dbName.replace('.','').trim()})
        .then((res) => {
          if (!res) {
            this.showAlert = true;
          }else {
            (res.subTableBloodDTO || res.parentTableBloodDTO) ? this.renderBloodRelationMap(res) : this.showAlert = true;
          }
        });
    }
  }

  bubbleOption(data: any): void {
    let initOp = this.datamapOpt.getOption();
    let links = [];
    for (let i = 0; i < data.length; i++) {
      for (let key in data[i].dataAreaRelationMap) {
        if (data[i].dataAreaRelationMap.hasOwnProperty(key)) {
          let obj = {
            source: '',
            target: '',
            lineStyle: {
              normal: {
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 1,
                  y2: 0,
                  colorStops: [{
                      offset: 0, color: '#28b4fc' // 0% 处的颜色
                  }, {
                      offset: 1, color: '#4a50fb' // 100% 处的颜色
                  }],
                  globalCoord: false // 缺省为 false
                }
              }
            },
            label: {
              normal: {
                color: '#222'
              }
            },
            value: 0
          };
          obj.source = data[i].dataAreaName;
          obj.target = key;
          obj.value = data[i].dataAreaRelationMap[key];
          links.push(obj);
          if (obj.source === obj.target) {
            links.pop();
          }
        }
      }
    }
    let seriesData = data.map(function(node) {
      return {
        id: node.dataAreaName,
        name: node.tableCnt + '\n' + node.dataAreaName.substring(0, 3) + '\n' + node.dataAreaName.substring(3),
        symbol: '',
        value: node.tableCnt,
        symbolSize: node.tableCnt,
        draggable: true,
        itemStyle: {
          normal: {}
        },
      };
    });
    initOp.series[0].data = seriesData;
    initOp.series[0].links = links;
    initOp.series[0].label.normal.textStyle.fontSize = 16; 
    initOp.tooltip['show'] = false;
    this.relatedOption = initOp;
    this.adjustBubble(this.relatedOption);
// console.log(this.relatedOption);
  }


  adjustBubble(opt: any): void {
    opt.series[0].data.map((node: any) => {
      node.symbolSize = ((value: any): number => {
        if (value < 50) {
          return 80;
        }else if (50 <= value && value < 100) {
          return 85;
        }else if (100 <= value && value < 200) {
          return 95;
        }else if (200 <= value && value < 300) {
          return 105;
        }else if (300 <= value && value < 500) {
          return 115;
        }else if (500 <= value && value < 1000) {
          return 125;
        }else {
          return 135;
        }
      })(node.symbolSize);

      node.itemStyle.normal = ((str: string): object => {
         switch (str) {
          case '大数据稽核':
            return {
              color: {
                type: 'radial',
                x: 0.5,
                y: 0.5,
                r: 0.5,
                colorStops: [{
                    offset: 0, color: 'rgba(252,184,70,0.9)' // 0% 处的颜色
                }, {
                    offset: 1, color: 'rgb(246,146,45)' // 100% 处的颜色
                }],
                globalCoord: false
              },
              shadowColor: 'rgba(246,146,45,0.7)',
              shadowBlur: 20,
              shadowOffsetX: 0,
              shadowOffsetY: 0
            };
          case '在线运营分析':
            return {
              color: {
                type: 'radial',
                x: 0.5,
                y: 0.5,
                r: 0.5,
                colorStops: [{
                    offset: 0, color: 'rgba(148,120,202,0.9)' // 0% 处的颜色
                }, {
                    offset: 1, color: 'rgb(102,64,178)' // 100% 处的颜色
                }],
                globalCoord: false
              },
              shadowColor: 'rgba(102,64,178,0.7)',
              shadowBlur: 20,
              shadowOffsetX: 0,
              shadowOffsetY: 0
            };
          case '信贷基础数据':
            return {
              color: {
                type: 'radial',
                x: 0.5,
                y: 0.5,
                r: 0.5,
                colorStops: [{
                    offset: 0, color: 'rgba(40,180,252,0.9)' // 0% 处的颜色
                }, {
                    offset: 1, color: 'rgb(74,80,251)' // 100% 处的颜色
                }],
                globalCoord: false
              },
              shadowColor: 'rgba(74,80,251,0.7)',
              shadowBlur: 20,
              shadowOffsetX: 0,
              shadowOffsetY: 0
            };
          case '信贷风控应用':
            return {
              color: {
                type: 'radial',
                x: 0.5,
                y: 0.5,
                r: 0.5,
                colorStops: [{
                    offset: 0, color: 'rgba(106,186,110,0.9)' // 0% 处的颜色
                }, {
                    offset: 1, color: 'rgb(16,95,24)' // 100% 处的颜色
                }],
                globalCoord: false
              },
              shadowColor: 'rgba(16,95,24,0.7)',
              shadowBlur: 20,
              shadowOffsetX: 0,
              shadowOffsetY: 0
            };
          case '分期基础数据':
            return {
              color: {
                type: 'radial',
                x: 0.5,
                y: 0.5,
                r: 0.5,
                colorStops: [{
                    offset: 0, color: 'rgba(40,180,252,0.9)' // 0% 处的颜色
                }, {
                    offset: 1, color: 'rgb(74,80,251)' // 100% 处的颜色
                }],
                globalCoord: false
              },
              shadowColor: 'rgba(74,80,251,0.7)',
              shadowBlur: 20,
              shadowOffsetX: 0,
              shadowOffsetY: 0
            };
          case '分期风控应用':
            return {
              color: {
                type: 'radial',
                x: 0.5,
                y: 0.5,
                r: 0.5,
                colorStops: [{
                    offset: 0, color: 'rgba(251,183,69,0.9)' // 0% 处的颜色
                }, {
                    offset: 1, color: 'rgb(248,146,43)' // 100% 处的颜色
                }],
                globalCoord: false
              },
              shadowColor: 'rgba(248,146,43,0.7)',
              shadowBlur: 20,
              shadowOffsetX: 0,
              shadowOffsetY: 0
            };
          case '在线基础数据':
            return {
              color: {
                type: 'radial',
                x: 0.5,
                y: 0.5,
                r: 0.5,
                colorStops: [{
                    offset: 0, color: 'rgba(40,180,252,0.9)' // 0% 处的颜色
                }, {
                    offset: 1, color: 'rgb(74,80,251)' // 100% 处的颜色
                }],
                globalCoord: false
              },
              shadowColor: 'rgba(74,80,251,0.7)',
              shadowBlur: 20,
              shadowOffsetX: 0,
              shadowOffsetY: 0
            };
          case '小牛司南':
            return {
              color: {
                type: 'radial',
                x: 0.5,
                y: 0.5,
                r: 0.5,
                colorStops: [{
                    offset: 0, color: 'rgba(21,221,244,0.9)' // 0% 处的颜色
                }, {
                    offset: 1, color: 'rgb(27,142,190)' // 100% 处的颜色
                }],
                globalCoord: false
              },
              shadowColor: 'rgba(27,142,190,0.7)',
              shadowBlur: 20,
              shadowOffsetX: 0,
              shadowOffsetY: 0
            };
          case '数据质量平台':
            return {
              color: {
                type: 'radial',
                x: 0.5,
                y: 0.5,
                r: 0.5,
                colorStops: [{
                    offset: 0, color: 'rgba(181,11,252,0.9)' // 0% 处的颜色
                }, {
                    offset: 1, color: 'rgb(123,37,255)' // 100% 处的颜色
                }],
                globalCoord: false
              },
              shadowColor: 'rgba(123,37,255,0.7)',
              shadowBlur: 20,
              shadowOffsetX: 0,
              shadowOffsetY: 0
            };
          case '新财富基础数据':
            return {
              color: {
                type: 'radial',
                x: 0.5,
                y: 0.5,
                r: 0.5,
                colorStops: [{
                    offset: 0, color: 'rgba(40,180,252,0.9)' // 0% 处的颜色
                }, {
                    offset: 1, color: 'rgb(74,80,251)' // 100% 处的颜色
                }],
                globalCoord: false
              },
              shadowColor: 'rgba(74,80,251,0.7)',
              shadowBlur: 20,
              shadowOffsetX: 0,
              shadowOffsetY: 0
            };
          case '新财富运营分析':
            return {
              color: {
                type: 'radial',
                x: 0.5,
                y: 0.5,
                r: 0.5,
                colorStops: [{
                    offset: 0, color: 'rgba(252,201,69,0.9)' // 0% 处的颜色
                }, {
                    offset: 1, color: 'rgb(246,162,5)' // 100% 处的颜色
                }],
                globalCoord: false
              },
              shadowColor: 'rgba(246,162,5,0.7)',
              shadowBlur: 20,
              shadowOffsetX: 0,
              shadowOffsetY: 0
            };
          case '爬虫基础数据':
            return {
              color: {
                type: 'radial',
                x: 0.5,
                y: 0.5,
                r: 0.5,
                colorStops: [{
                    offset: 0, color: 'rgba(40,180,252,0.9)' // 0% 处的颜色
                }, {
                    offset: 1, color: 'rgb(74,80,251)' // 100% 处的颜色
                }],
                globalCoord: false
              },
              shadowColor: 'rgba(74,80,251,0.7)',
              shadowBlur: 20,
              shadowOffsetX: 0,
              shadowOffsetY: 0
            };
          case '赋格基础数据':
            return {
              color: {
                type: 'radial',
                x: 0.5,
                y: 0.5,
                r: 0.5,
                colorStops: [{
                    offset: 0, color: 'rgba(40,180,252,0.9)' // 0% 处的颜色
                }, {
                    offset: 1, color: 'rgb(74,80,251)' // 100% 处的颜色
                }],
                globalCoord: false
              },
              shadowColor: 'rgba(74,80,251,0.7)',
              shadowBlur: 20,
              shadowOffsetX: 0,
              shadowOffsetY: 0
            };
          case '钱罐子运营分析':
            return {
              color: {
                type: 'radial',
                x: 0.5,
                y: 0.5,
                r: 0.5,
                colorStops: [{
                    offset: 0, color: 'rgba(248,96,82,0.9)' // 0% 处的颜色
                }, {
                    offset: 1, color: 'rgb(241,48,51)' // 100% 处的颜色
                }],
                globalCoord: false
              },
              shadowColor: 'rgba(241,48,51,0.7)',
              shadowBlur: 20,
              shadowOffsetX: 0,
              shadowOffsetY: 0
            };
          case '黑名单':
            return {
              color: {
                type: 'radial',
                x: 0.5,
                y: 0.5,
                r: 0.5,
                colorStops: [{
                    offset: 0, color: 'rgba(113,112,112,0.9)' // 0% 处的颜色
                }, {
                    offset: 1, color: 'rgb(14,15,12)' // 100% 处的颜色
                }],
                globalCoord: false
              },
              shadowColor: 'rgba(14,15,12,0.7)',
              shadowBlur: 20,
              shadowOffsetX: 0,
              shadowOffsetY: 0
            };
          case '牛鼎丰基础平台数据':
            return {
              color: {
                type: 'radial',
                x: 0.5,
                y: 0.5,
                r: 0.5,
                colorStops: [{
                    offset: 0, color: 'rgba(40,180,252,0.9)' // 0% 处的颜色
                }, {
                    offset: 1, color: 'rgb(74,80,251)' // 100% 处的颜色
                }],
                globalCoord: false
              },
              shadowColor: 'rgba(74,80,251,0.7)',
              shadowBlur: 20,
              shadowOffsetX: 0,
              shadowOffsetY: 0
            };
          default:
            break;
        }
      })(node.id);
    });

    opt.series[0].links.map((node: any) => {
      node['stringVal'] = this.order(node.source + node.target);
    });

    opt.series[0].links = this.unique(opt.series[0].links);
// console.log(opt);
  }


  renderBloodRelationMap(data: any): void {
    let initOp = this.datamapOpt.getOption();
    let seriesData = [];
    let links = [];
    seriesData[0] = {
      id: data.id.toString(),
      name: data.tableName.substring(0, 10) + '\n' + data.tableName.substring(10),
      symbolSize: 100,
      tips: `表名：${data.tableName}<br>
             库名：${data.dbNm}<br>
             创建时间：${data.createTime}<br>
             最后修改时间：${data.dataUpdateTime}<br>
             负责人：${data.dbOwnerName || '无'}<br>
             表空间大小：${data.physicsStore}M`,
      edgeSymbol: 'arrow',
      x: 300,
      y: 300,
      itemStyle: {
        normal: {
          color: {
            type: 'radial',
            x: 0.5,
            y: 0.5,
            r: 0.5,
            colorStops: [{
                offset: 0, color: 'rgba(248,96,82,0.9)' // 0% 处的颜色
            }, {
                offset: 1, color: 'rgba(242,50,50,0.9)' // 100% 处的颜色
            }],
            globalCoord: false // 缺省为 false
          },
          shadowColor: 'rgba(242,50,50,0.33)',
          shadowBlur: 20,
          shadowOffsetX: 0,
          shadowOffsetY: 0
        }
      },
      draggable: false
    };
    let arr1 = data.subTableBloodDTO;
    let arr2 = data.parentTableBloodDTO;

    if (arr1) {
      for (let i = 0; i < arr1.length; i++) {
        let element = {
          id: arr1[i].id.toString(),
          name: '',
          tips: '',
          x: (300 + (Math.random() * (20 - 0) + i * 20)),
          y: (100 + (Math.random() * (20 - 0) + i * 20)),
          symbolSize: 100,
          itemStyle: {
            normal: {
              color: {
                type: 'radial',
                x: 0.5,
                y: 0.5,
                r: 0.5,
                colorStops: [{
                    offset: 0, color: 'rgba(29,174,250,0.9)' // 0% 处的颜色
                }, {
                    offset: 1, color: 'rgba(73,79,248,0.9)' // 100% 处的颜色
                }],
                globalCoord: false // 缺省为 false
              },
              shadowColor: 'rgba(0,71,177,0.33)',
              shadowBlur: 9,
              shadowOffsetX: 0,
              shadowOffsetY: 0
            }
          },
          draggable: false
        };
        let link = {
          source: '',
          target: '',
          tip: '',
          symbolSize: [5, 15],
          lineStyle: {
            normal: {
              color: '#1caffa'
            }
          },
          label: {
            normal: {
              show: false
            }
          }
        };
        link.source = data.id.toString();
        link.target = arr1[i].id.toString();
        link.tip = `job_name：${arr1[i].jobInfo.jobName}<br>
                    job创建时间：${arr1[i].jobInfo.createTime}<br>
                    job负责人：${arr1[i].jobInfo.createBy}<br>
                    最后运行时间：${arr1[i].jobInfo.updateTime}`;
        link['value'] = 100;
        links.push(link);

        element.tips = `表名：${arr1[i].tableName}<br>
                        库名：${arr1[i].dbNm}<br>
                        创建时间：${arr1[i].createTime}<br>
                        最后修改时间：${arr1[i].dataUpdateTime}<br>
                        负责人：${arr1[i].dbOwnerName || '无'}<br>
                        表空间大小：${arr1[i].physicsStore}M`;
        element.name = arr1[i].tableName.substring(0, 10) + '\n' + arr1[i].tableName.substring(10);
        seriesData.push(element);

        if (arr1[i].subTableBloodDTO) {
          for (let j = 0; j < arr1[i].subTableBloodDTO.length; j++) {
            let element = {
              id: arr1[i].subTableBloodDTO[j].id.toString(),
              name: '',
              tips: '',
              symbolSize: 100,
              x: (300 + (Math.random() * 20 + (i + j) * 20)),
              y: (100 + (Math.random() * 20 + (i + j) * 20)),
              itemStyle: {
                normal: {
                  color: {
                    type: 'radial',
                    x: 0.5,
                    y: 0.5,
                    r: 0.5,
                    colorStops: [{
                        offset: 0, color: 'rgba(29,174,250,0.9)' // 0% 处的颜色
                    }, {
                        offset: 1, color: 'rgba(73,79,248,0.9)' // 100% 处的颜色
                    }],
                    globalCoord: false // 缺省为 false
                  },
                  shadowColor: 'rgba(0,71,177,0.33)',
                  shadowBlur: 9,
                  shadowOffsetX: 0,
                  shadowOffsetY: 0
                }
              },
              draggable: false
            };
            let link = {
              source: '',
              target: '',
              tip: '',
              symbolSize: [5, 15],
              lineStyle: {
                normal: {
                  color: '#1caffa'
                }
              },
              label: {
                normal: {
                  show: false
                }
              }
            };
            link.source = arr1[i].id.toString();
            link.target = arr1[i].subTableBloodDTO[j].id.toString();
            link.tip = `job_name：${arr1[i].subTableBloodDTO[j].jobInfo.jobName}<br>
                        job创建时间：${arr1[i].subTableBloodDTO[j].jobInfo.createTime}<br>
                        job负责人：${arr1[i].subTableBloodDTO[j].jobInfo.createBy}<br>
                        最后运行时间：${arr1[i].subTableBloodDTO[j].jobInfo.updateTime}`;
            link['value'] = 100;
            links.push(link);

            element.tips = `表名：${arr1[i].subTableBloodDTO[j].tableName}<br>
                          库名${arr1[i].subTableBloodDTO[j].dbNm}<br>
                          创建时间：${arr1[i].subTableBloodDTO[j].createTime}<br>
                          最后修改时间：${arr1[i].subTableBloodDTO[j].dataUpdateTime}<br>
                          负责人：${arr1[i].subTableBloodDTO[j].dbOwnerName || '无'}<br>
                          表空间大小：${arr1[i].subTableBloodDTO[j].physicsStore}M`;
            element.name = arr1[i].subTableBloodDTO[j].tableName.substring(0, 10) + '\n' + arr1[i].subTableBloodDTO[j].tableName.substring(10);
            seriesData.push(element);
          }
        }
      }
    }
    if (arr2) {
      for (let i = 0; i < arr2.length; i++) {
        let element = {
          id: arr2[i].id.toString(),
          name: '',
          tips: '',
          symbolSize: 100,
          x: (300 - (Math.random() * (20 - 0) + i * 20)),
          y: (100 + (Math.random() * (20 - 0) + i * 20)),
          itemStyle: {
            normal: {
              color: {
                type: 'radial',
                x: 0.5,
                y: 0.5,
                r: 0.5,
                colorStops: [{
                    offset: 0, color: 'rgba(29,174,250,0.9)' // 0% 处的颜色
                }, {
                    offset: 1, color: 'rgba(73,79,248,0.9)' // 100% 处的颜色
                }],
                globalCoord: false // 缺省为 false
              },
              shadowColor: 'rgba(0,71,177,0.33)',
              shadowBlur: 9,
              shadowOffsetX: 0,
              shadowOffsetY: 0
            }
          },
          draggable: false
        };
        let link = {
          source: '',
          target: '',
          tip: '',
          symbolSize: [5, 15],
          lineStyle: {
            normal: {
              color: '#1caffa'
            }
          },
          label: {
            normal: {
              show: false
            }
          }
        };
        link.target = data.id.toString();
        link.source = arr2[i].id.toString();
        link.tip = `job_name：${arr2[i].jobInfo.jobName}<br>
                    job创建时间：${arr2[i].jobInfo.createTime}<br>
                    job负责人：${arr2[i].jobInfo.createBy}<br>
                    最后运行时间：${arr2[i].jobInfo.updateTime}`;
        link['value'] = 100;
        links.push(link);

        element.tips = `表名：${arr2[i].tableName}<br>
                        库名${arr2[i].dbNm}<br>
                        创建时间：${arr2[i].createTime}<br>
                        最后修改时间：${arr2[i].dataUpdateTime}<br>
                        负责人：${arr2[i].dbOwnerName || '无'}<br>
                        表空间大小：${arr2[i].physicsStore}M`;
        element.name = arr2[i].tableName.substring(0, 10) + '\n' + arr2[i].tableName.substring(10);
        seriesData.push(element);
        if (arr2[i].parentTableBloodDTO) {
          for (let j = 0; j < arr2[i].parentTableBloodDTO.length; j++) {
            let element = {
              id: arr2[i].parentTableBloodDTO[j].id.toString(),
              name: '',
              tips: '',
              symbolSize: 100,
              x: (300 - (Math.random() * 20 + (i + j) * 20)),
              y: (100 + (Math.random() * 20 + (i + j) * 20)),
              itemStyle: {
                normal: {
                  color: {
                    type: 'radial',
                    x: 0.5,
                    y: 0.5,
                    z: 0.5,
                    colorStops: [{
                        offset: 0, color: 'rgba(29,174,250,0.9)' // 0% 处的颜色
                    }, {
                        offset: 1, color: 'rgba(73,79,248,0.9)' // 100% 处的颜色
                    }],
                    globalCoord: false // 缺省为 false
                  },
                  shadowColor: 'rgba(0,71,177,0.33)',
                  shadowBlur: 9,
                  shadowOffsetX: 0,
                  shadowOffsetY: 0
                }
              },
              draggable: false
            };
            let link = {
              source: '',
              target: '',
              tip: '',
              symbolSize: [5, 15],
              lineStyle: {
                normal: {
                  color: '#1caffa'
                }
              },
              label: {
                normal: {
                  show: false
                }
              }
            };
            link.target = arr2[i].id.toString();
            link.source = arr2[i].parentTableBloodDTO[j].id.toString();
            link.tip = `job_name：${arr2[i].parentTableBloodDTO[j].jobInfo.jobName}<br>
                        job创建时间：${arr2[i].parentTableBloodDTO[j].jobInfo.createTime}<br>
                        job负责人：${arr2[i].parentTableBloodDTO[j].jobInfo.createBy}<br>
                        最后运行时间：${arr2[i].parentTableBloodDTO[j].jobInfo.updateTime}`;
            link['value'] = 100;
            links.push(link);

            element.tips = `表名：${arr2[i].parentTableBloodDTO[j].tableName}<br>
                            库名${arr2[i].parentTableBloodDTO[j].dbNm}<br>
                            创建时间：${arr2[i].parentTableBloodDTO[j].createTime}<br>
                            最后修改时间：${arr2[i].parentTableBloodDTO[j].dataUpdateTime}<br>
                            负责人：${arr2[i].parentTableBloodDTO[j].dbOwnerName || '无'}<br>
                            表空间大小：${arr2[i].parentTableBloodDTO[j].physicsStore}M`;
            element.name = arr2[i].parentTableBloodDTO[j].tableName.substring(0, 10) + '\n' + arr2[i].parentTableBloodDTO[j].tableName.substring(10);
            seriesData.push(element);
          }
        }
      }
    }
    seriesData = this.unique2(seriesData);
    initOp.series[0].data = seriesData;
    initOp.series[0].links = links;
    initOp.series[0]['edgeSymbol'] = ['circle', 'arrow'];
    initOp.series[0].label.normal.textStyle.fontSize = 14;
    initOp.series[0].force.edgeLength = 50;
    initOp.tooltip.formatter = (params: any): any => {
      if (params.data.tip) {
        return params.data.tip;
      }else {
        return params.data.tips;
      }
    };
// console.log(initOp);
    this.bloodRelationMapOption = initOp;
    this.searchResult = true;
  }


  unique2(arr: Array<any>): Array<any> {
    let ret = [];
    let len = arr.length;
    let tmp = {};
    for (let i = 0; i < len; i++) {
        if (!tmp[arr[i].name]) {
            tmp[arr[i].name] = 1;
            ret.push(arr[i]);
        }
    }
    return ret;
  }
}
