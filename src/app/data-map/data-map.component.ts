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
  searchList = {};
  isChNm = false;
  tableName: string;

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
    this.searchList = {};
    this.isChNm = false;
    this.getBubbleData();
  }

  getBubbleData():void {
    this.backendService
        .getAll(this.bubbleDataUrl)
        .then((res) => this.bubbleOption(res))
  }

  bubbleOption(data):void {
console.log(data);
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
console.log(links);
    let seriesData = data.map(function(val,i,arr) {
      return {
        id: arr[i].dataAreaName,
        name: arr[i].tableCnt + '\n' + arr[i].dataAreaName,
        // symbol: node.symbol,
        symbolSize: arr[i].tableCnt,
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
    
console.log(this.relatedOption);
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
    let seriesData = [];
    seriesData[0] = {
      id: data.groupBlood.groupId,
      name: data.groupBlood.groupName,
      symbolSize: 100,
      draggable: true
    };
    let arr1 = data.groupBlood.subGroupBloodDTO;
    let arr2 = data.groupBlood.parentGroupBloodDTO;
    if (arr1) {
       seriesData.concat(this.getItem(arr1,"subGroupBloodDTO"))
    }else if(arr2) {
      seriesData.concat(this.getItem(arr2,"parentGroupBloodDTO"))
    }
    initOp.series[0].data = seriesData;
    initOp.series[0].links;
console.log(seriesData);
  }

   getItem(arr: Array, groupType: string): Array {
     var resArr = [];
    for (var i = 0; i < arr.length; i++) {
        let element = {
          id: '',
          name: '',
          symbolSize: 100,
          draggable: true
        };
        element.id = arr[i].groupId;
        element.name = arr[i].groupName;
        resArr.push(element);
        if (arr.groupType) {
          for (var j = 0; j < arr.groupType.length; j++) {
            let element = {
              id: '',
              name: '',
              symbolSize: 100,
              draggable: true
            };
            element.id = arr.groupType[i].groupId;
            element.name = arr.groupType[i].groupName;
            resArr.push(element);
          }
        }
      }
    return resArr;
  } 
}
