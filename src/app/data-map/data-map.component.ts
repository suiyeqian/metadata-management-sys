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
  console.log(sessionStorage.getItem('searchListData'));
    this.getBubbleData();
    // this.searchListData.length || this.getTableList();
    sessionStorage.getItem('searchListData') || this.getTableList();
  }

  getBubbleData(): void {
    this.backendService
        .getAll(this.bubbleDataUrl)
        .then((res) => this.bubbleOption(res));
  }

  getTableList(name: string): void {
    this.backendService
        .getItemsByJsonParams(this.searchTableListUrl,{tableName: name})
        .then((res) => {
          res.length > 10 ? this.searchList = res.splice(0, 10) : this.searchList = res;
          // sessionStorage.setItem('searchListData',res);
          this.bloodRelationModalData = res;
        })
  }

  tableNameChange(name: string): void {
    this.tableName = name;
    if (this.tableNameType.test(name)) {
      this.isChNm = true;
    }else {
      this.isChNm = false;
    }
    !name || this.getTableList(name);
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

      node.itemStyle.normal.color = ((str: string): object => {
         switch (str) {
          case '大数据稽核':
            return {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                  offset: 0, color: '#fcb846' // 0% 处的颜色
              }, {
                  offset: 1, color: '#f6922d' // 100% 处的颜色
              }],
              globalCoord: false
            };
          case '在线运营分析':
            return {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                  offset: 0, color: '#9478ca' // 0% 处的颜色
              }, {
                  offset: 1, color: '#6640b2' // 100% 处的颜色
              }],
              globalCoord: false
            };;
          case '信贷基础数据':
            return {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                  offset: 0, color: '#28b4fc' // 0% 处的颜色
              }, {
                  offset: 1, color: '#4a50fb' // 100% 处的颜色
              }],
              globalCoord: false
            };;
          case '信贷风控应用':
            return {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                  offset: 0, color: '#6aba6e' // 0% 处的颜色
              }, {
                  offset: 1, color: '#30a435' // 100% 处的颜色
              }],
              globalCoord: false
            };;
          case '分期基础数据':
            return {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                  offset: 0, color: '#28b4fc' // 0% 处的颜色
              }, {
                  offset: 1, color: '#4a50fb' // 100% 处的颜色
              }],
              globalCoord: false
            };;
          case '分期风控应用':
            return {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                  offset: 0, color: '#fbb745' // 0% 处的颜色
              }, {
                  offset: 1, color: '#f8922b' // 100% 处的颜色
              }],
              globalCoord: false
            };;
          case '在线基础数据':
            return {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                  offset: 0, color: '#28b4fc' // 0% 处的颜色
              }, {
                  offset: 1, color: '#4a50fb' // 100% 处的颜色
              }],
              globalCoord: false
            };;
          case '小牛司南':
            return {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                  offset: 0, color: '#15ddf4' // 0% 处的颜色
              }, {
                  offset: 1, color: '#1b8ebe' // 100% 处的颜色
              }],
              globalCoord: false
            };;
          case '数据质量平台':
            return {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                  offset: 0, color: '#b50bfc' // 0% 处的颜色
              }, {
                  offset: 1, color: '#7b25ff' // 100% 处的颜色
              }],
              globalCoord: false
            };;
          case '新财富基础数据':
            return {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                  offset: 0, color: '#28b4fc' // 0% 处的颜色
              }, {
                  offset: 1, color: '#4a50fb' // 100% 处的颜色
              }],
              globalCoord: false
            };;
          case '新财富运营分析':
            return {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                  offset: 0, color: '#fcc945' // 0% 处的颜色
              }, {
                  offset: 1, color: '#f6a205' // 100% 处的颜色
              }],
              globalCoord: false
            };;
          case '爬虫基础数据':
            return {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                  offset: 0, color: '#28b4fc' // 0% 处的颜色
              }, {
                  offset: 1, color: '#4a50fb' // 100% 处的颜色
              }],
              globalCoord: false
            };;
          case '赋格基础数据':
            return {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                  offset: 0, color: '#28b4fc' // 0% 处的颜色
              }, {
                  offset: 1, color: '#4a50fb' // 100% 处的颜色
              }],
              globalCoord: false
            };;
          case '钱罐子运营分析':
            return {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                  offset: 0, color: '#f86052' // 0% 处的颜色
              }, {
                  offset: 1, color: '#f13033' // 100% 处的颜色
              }],
              globalCoord: false
            };;
          case '黑名单':
            return {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                  offset: 0, color: '#717070' // 0% 处的颜色
              }, {
                  offset: 1, color: '#0e0f0c' // 100% 处的颜色
              }],
              globalCoord: false
            };;
          case '牛鼎丰基础平台数据':
            return {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                  offset: 0, color: '#1cb1fe' // 0% 处的颜色
              }, {
                  offset: 1, color: '#474ef2' // 100% 处的颜色
              }],
              globalCoord: false
            };;
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
