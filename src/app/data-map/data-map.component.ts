import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BackendService } from '../shared/backend.service';
import { datamapOptionService } from './dataMap-option.service';

@Component({
  selector: 'my-data-map',
  templateUrl: './data-map.component.html',
  styleUrls: ['./data-map.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class DataMapComponent implements OnInit {
  pagetitle = '数据地图';
  searchModel= { };
  searchListData = [];
  isChNm = false;
  tableName: string;
  searchResult = false;
  bloodRelationModalData = {};
  searchList = [];
  isSearch = true;

  relatedOption: any;
  bloodRelationMapOption: any;

  private tableNameType = /[\u4E00-\u9FA5\uF900-\uFA2D]/;
  private searchTableListUrl = 'datamap/searchTableInfo';
  private bubbleDataUrl = 'datamap/searchDataMap';
  private searchBloodRelationTableUrl = 'datamap/searchBloodRelationInfo';

  
  constructor(
    private backendService: BackendService,
    private datamapOpt: datamapOptionService) {
  }

  ngOnInit(): void {
  // console.log(sessionStorage.getItem('searchListData'));
    this.getBubbleData();
    sessionStorage.getItem('searchListData') || this.getTableListData();
  }

  getBubbleData(): void {
    this.backendService
        .getAll(this.bubbleDataUrl)
        .then((res) => this.bubbleOption(res));
  }

  // 缓存搜索提示数据
  getTableListData(): void {
    this.backendService
        .getItemsByJsonParams(this.searchTableListUrl, {})
        .then((res) => {
          sessionStorage.setItem('searchListData', res);
        })
  }

  getTableList(name: string): void {
    this.backendService
        .getItemsByJsonParams(this.searchTableListUrl,{tableName: name})
        .then((res) => {
          // res.length > 20 ? this.searchList = res.splice(0, 20) : this.searchList = res;
          this.searchList = res;
          this.bloodRelationModalData = res;
console.log(this.searchList);
        })
  }

  tableNameChange(name: string): void {
console.log(this.isSearch);
    this.tableName = name;
    if (this.tableNameType.test(name)) {
      this.isChNm = true;
    }else {
      this.isChNm = false;
    }
    let self = this;
    if (!this.isSearch ) return;
    this.isSearch = false;
    !name || this.getTableList(name);
    setTimeout(function() {
      self.isSearch = true;
    }, 3000);
  }

  bubbleOption(data): void {
// console.log(data);
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
        name: node.tableCnt + '\n' + (node.dataAreaName).substr(0, 3) + '\n' + (node.dataAreaName).substr(3, 20),
        symbol: '',
        symbolSize: node.tableCnt,
        draggable: true,
        itemStyle: {
          normal: {
            // color: node.color
          }
        },
      }
    });
    initOp.series[0].data = seriesData;
    initOp.series[0].links = links;
    initOp.series[0].label.normal.textStyle.fontSize = 16;
    this.relatedOption = initOp;
    this.adjustBubble(this.relatedOption);
// console.log(this.relatedOption);
  }

  
  adjustBubble(opt) {
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
            };;
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
      })(node.id)
    })

    opt.series[0].links.map((node: any) => {
      node['stringVal'] = this.order(node.source + node.target);
    })

    opt.series[0].links = this.unique(opt.series[0].links);
// console.log(res);
console.log(opt);
  }

  unique(arr) {
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
  order(words): string {
      return words.split('').sort(function(a, b){
          return a.localeCompare(b);
      }).join('');
  }


  onSearch(): void {
    this.backendService
        .getItemsByJsonParams(this.searchBloodRelationTableUrl, {tableName: this.tableName})
        .then((res) => {
          res.groupBlood ? this.renderBloodRelationMap(res) : alert('无血缘关系');
console.log(res);
        })
  }

  renderBloodRelationMap(data: any): void {
    let initOp = this.datamapOpt.getOption();
    let seriesData = [];
    let links = [];
    seriesData[0] = {
      id: data.groupBlood.groupId,
      name: data.tableName,
      symbolSize: 100,
      edgeSymbol: 'arrow',
      itemStyle: {
        normal: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
                offset: 0, color: '#f86052' // 0% 处的颜色
            }, {
                offset: 1, color: '#f23232' // 100% 处的颜色
            }],
            globalCoord: false // 缺省为 false
          }
        }
      },
      draggable: true
    };
    let arr1 = data.groupBlood.subGroupBloodDTO;
    let arr2 = data.groupBlood.parentGroupBloodDTO;
    if (arr1) {
      for (let i = 0; i < arr1.length; i++) {
        let element = {
          id: '',
          name: '',
          symbolSize: 100,
          itemStyle: {
            normal: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                    offset: 0, color: '#1daefa' // 0% 处的颜色
                }, {
                    offset: 1, color: '#494ff8' // 100% 处的颜色
                }],
                globalCoord: false // 缺省为 false
              }
            }
          },
          draggable: true
        }
        let link = {
          source: '',
          target: '',
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
          // value: 100
        }
        link.source = data.groupBlood.groupId;
        link.target = arr1[i].groupId;
        links.push(link);

        element.id = arr1[i].groupId;
        element.name = arr1[i].groupName;
        seriesData.push(element);
        if (arr1[i].subGroupBloodDTO) {
          for (let j = 0; j < arr1[i].subGroupBloodDTO.length; j++) {
            let element = {
              id: '',
              name: '',
              symbolSize: 100,
              itemStyle: {
                normal: {
                  color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [{
                        offset: 0, color: '#1daefa' // 0% 处的颜色
                    }, {
                        offset: 1, color: '#494ff8' // 100% 处的颜色
                    }],
                    globalCoord: false // 缺省为 false
                  }
                }
              },
              draggable: true
            }
            let link = {
              source: '',
              target: '',
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
              // value: 100
            }
            link.source = data.groupBlood.groupId;
            link.target = arr1[i].subGroupBloodDTO[j].groupId;
            links.push(link);
            element.id = arr1[i].subGroupBloodDTO[j].groupId;
            element.name = arr1[i].subGroupBloodDTO[j].groupName;
            seriesData.push(element);
          }
        }
      }
    }
    if(arr2) {
      for (let i = 0; i < arr2.length; i++) {
        let element = {
          id: '',
          name: '',
          symbolSize: 100,
          itemStyle: {
            normal: {
              color: {
                type: 'radial',
                x: 0.5,
                y: 0.5,
                r: 0.5,
                // y2: 1,
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
          draggable: true,
        }
        let link = {
          source: '',
          target: '',
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
          // value: 100
        }
        link.target = data.groupBlood.groupId;
        link.source = arr2[i].groupId;
        links.push(link);

        element.id = arr2[i].groupId;
        element.name = arr2[i].groupName;
        seriesData.push(element);
        if (arr2[i].parentGroupBloodDTO) {
          for (let j = 0; j < arr2[i].parentGroupBloodDTO.length; j++) {
            let element = {
              id: '',
              name: '',
              symbolSize: 100,
              itemStyle: {
                normal: {
                  color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [{
                        offset: 0, color: '#1daefa' // 0% 处的颜色
                    }, {
                        offset: 1, color: '#494ff8' // 100% 处的颜色
                    }],
                    globalCoord: false // 缺省为 false
                  }
                }
              },
              draggable: true
            }
            let link = {
              source: '',
              target: '',
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
              // value: 100
            }
            link.target = data.groupBlood.groupId;
            link.source = arr2[i].parentGroupBloodDTO[j].groupId;
            links.push(link);
            element.id = arr2[i].parentGroupBloodDTO[j].groupId;
            element.name = arr2[i].parentGroupBloodDTO[j].groupName;
            seriesData.push(element);
          }
        }
      }
    }
    initOp.series[0].data = seriesData;
    initOp.series[0].links = links;
    initOp.series[0]['edgeSymbol'] = ['circle', 'arrow'];
    this.bloodRelationMapOption = initOp;
    this.searchResult = true;
console.log(this.bloodRelationMapOption);
  }

  /* getItem(arr: Array): Array {
    let resArr = [];
    let links = [];
    for (let i = 0; i < arr.length; i++) {
      let obj = {
        id: '',
        name: '',
        symbolSize: 100,
        draggable: true
      }
      let link = {
        source: '',
        target: '',
        value: 100
      }
      obj.id = arr[i].groupId;
      obj.name = arr[i].groupName;
      if (arr[i].sub) {
        
      }
      resArr.push(obj);
      if (arr[i].subGroupBloodDTO) {
        resArr = resArr.concat(this.getItem(arr[i].subGroupBloodDTO))
      }else if(arr[i].parentGroupBloodDTO) {
        resArr = resArr.concat(this.getItem(arr[i].parentGroupBloodDTO));
    }
console.log(resArr);
      return resArr;
    }
  } */

}
