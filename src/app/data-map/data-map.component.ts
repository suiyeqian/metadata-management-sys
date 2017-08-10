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
  searchList = [];
  isChNm = false;
  tableName: string;
  searchResult = false;

  relatedOption: any;
  bloodRelationMapOption: any;

  private tableNameType = /^[\u4e00-\u9fa5]$/;
  private searchTableUrl = 'datamap/searchTableInfo';
  private bubbleDataUrl = 'datamap/searchDataMap';
  private searchBloodRelationTableUrl = 'datamap/searchBloodRelationInfo';

  
  constructor(
    private backendService: BackendService,
    private datamapOpt: datamapOptionService) {
  }

  ngOnInit():void {
    this.isChNm = false;
    this.getBubbleData();
    this.bloodRelationMapOption = this.datamapOpt.getOption();
  }

  getBubbleData():void {
    this.backendService
        .getAll(this.bubbleDataUrl)
        .then((res) => this.bubbleOption(res))
  }

  bubbleOption(data):void {
// console.log(data);
    let initOp = this.datamapOpt.getOption();
    let links = [];
    for (let i = 0; i < data.length; i++) {
      for (let key in data[i].dataAreaRelationMap) {
        if (data[i].dataAreaRelationMap.hasOwnProperty(key)) {
          let obj = {
            source: '',
            target: '',
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
// console.log(links);
    let seriesData = data.map(function(node) {
      return {
        id: node.dataAreaName,
        name: node.tableCnt + '\n' + node.dataAreaName,
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
    this.relatedOption = initOp;
    this.adjustBubble(this.relatedOption);
// console.log(this.relatedOption);
  }
  
  adjustBubble(opt) {
    
    opt.series[0].data.map(function(node:any) {
      node.symbolSize = ((value: any):number => {
        if (value < 50) {
          return 75;
        }else if (value >= 50 && value < 100) {
          return 85;
        }else if (100 < value && value < 200) {
          return 95;
        }else if (200 < value && value < 300) {
          return 105;
        }else if (300 < value && value < 500) {
          return 115;
        }else if (500 < value && value < 1000) {
          return 125;
        }else {
          return 135;
        }
      })(node.symbolSize);

      node.symbol = ((str: string):String => {
        
         switch (str) {
          case '大数据稽核':
            return 'image://img/大数据稽核.png';
          case '在线运营分析':
            return 'image://img/在线运营分析.png';
          case '信贷基础数据':
            return 'image://img/信贷基础数据.png';
          case '信贷风控应用':
            return 'image://img/信贷风控应用.png';
          case '分期基础数据':
            return 'image://img/分期基础数据.png';
          case '分期风控应用':
            return 'image://img/分期风控应用.png';
          case '在线基础数据':
            return 'image://img/在线基础数据.png';
          case '小牛司南':
            return 'image://img/小牛司南.png';
          case '数据质量平台':
            return 'image://img/数据质量平台.png';
          case '新财富基础数据':
            return 'image://img/新财富基础数据.png';
          case '新财富运营分析':
            return 'image://img/新财富运营分析.png';
          case '爬虫基础数据':
            return 'image://img/爬虫基础数据.png';
          case '赋格基础数据':
            return 'image://img/赋格基础数据.png';
          case '钱罐子运营分析':
            return 'image://img/钱罐子运营分析.png';
          case '黑名单':
            return 'image://img/黑名单.png';
          case '牛鼎丰基础平台数据':
            return 'image://img/牛鼎丰基础平台数据.png';
          default:
            break;
        } 
      })(node.id)
    })
console.log(opt);
    
  }


  getTableList(name: string):void {
    this.backendService
        .getItemsByJsonParams(this.searchTableUrl, {tableName: name})
        .then((res) => {
          res.length > 100 ? this.searchList = res.splice(0,100) : this.searchList = res;
console.log(this.searchList);
        })
  }

  tableNameChange(name: string):void {
console.log(name);
    this.getTableList(name);
    this.tableName = name;
    if (this.tableNameType.test(name)) {
      this.isChNm = true;
    }else {
      this.isChNm = false;
    }
console.log(this.isChNm);
  }

  onSearch():void {
    this.backendService
        .getItemsByJsonParams(this.searchBloodRelationTableUrl, {tableName: this.tableName})
        .then((res) => {
          res.groupBlood ? this.renderBloodRelationMap(res) : alert('无血缘关系');
console.log(res);
        })
  }

  renderBloodRelationMap(data: any):void {
    let initOp = this.datamapOpt.getOption();
    // delete initOp.series[0].force;
    let seriesData = [];
    let links = [];
    seriesData[0] = {
      id: data.groupBlood.groupId,
      name: data.groupBlood.groupName,
      symbolSize: 80,
      edgeSymbol: "arrow",
      draggable: true
    };
    let arr1 = data.groupBlood.subGroupBloodDTO;
    let arr2 = data.groupBlood.parentGroupBloodDTO;
    if (arr1) {
      for (let i = 0; i < arr1.length; i++) {
        let element = {
          id: '',
          name: '',
          symbolSize: 80,
          draggable: true,
          // edgeSymbol: "arrow",
          itemStyle: {
            normal: {
              color: "#494ff8"
            }
          }
        }
        let link = {
          source: '',
          target: '',
          value: 100
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
              symbolSize: 80,
              // edgeSymbol: "arrow",
              draggable: true
            }
            let link = {
              source: '',
              target: '',
              value: 100
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
          symbolSize: 80,
          draggable: true,
          // edgeSymbol: "arrow",
          itemStyle: {
            normal: {
              color: "#494ff8"
            }
          }
        }
        let link = {
          source: '',
          target: '',
          value: 100          
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
              symbolSize: 80,
              // edgeSymbol: "arrow",
              draggable: true
            }
            let link = {
              source: '',
              target: '',
              value: 100              
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
    initOp.series[0]['edgeSymbol'] = ['circle','arrow'];
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
