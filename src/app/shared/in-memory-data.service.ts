import { InMemoryDbService } from 'angular-in-memory-web-api';
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    let datas = [
        {
            'appNm': '大数据稽核',
            'cntTotal': 6,
            'appDesc': '为金服管理层展示关键指标'
        },
        {
            'appNm': '多维分析系统',
            'cntTotal': 15,
            'appDesc': ''
        },
        {
            'appNm': 'IDE',
            'cntTotal': 143,
            'appDesc': ''
        },
        {
            'appNm': '金服管理看板',
            'cntTotal': 10,
            'appDesc': ''
        },
        {
            'appNm': '普惠风控',
            'cntTotal': 15,
            'appDesc': ''
        },
        {
            'appNm': '普惠销售',
            'cntTotal': 10,
            'appDesc': ''
        },
        {
            'appNm': '新财富可视化',
            'cntTotal': 20,
            'appDesc': ''
        },
        {
            'appNm': '小牛司南',
            'cntTotal': 8,
            'appDesc': ''
        },
        {
            'appNm': '在线运营',
            'cntTotal': 238,
            'appDesc': ''
        }
    ];
    let company = [
        {
            'companyName': '集团',
            'cntTotal': 34
        },
        {
            'companyName': '金服',
            'cntTotal': 20
        },
        {
            'companyName': '在线',
            'cntTotal': 268
        },
        {
            'companyName': '普惠',
            'cntTotal': 43
        },
        {
            'companyName': '新财富',
            'cntTotal': 20
        },
        {
            'companyName': '牛鼎丰',
            'cntTotal': 80
        }
    ];
    let platAbility = {
        'tableCount': 4,
        'todayAppTotal': '0',
        'over30MinutesJob': 0,
        'todayReduceTotalCount': 2134828,
        'todayMapTotalCount': 5116400,
        'totalVirtualCore': 520,
        'hdfsCapacityUsed': '356.06T',
        'hdfsCapacityTotal': '578.76T',
        'hdfsDayIncrease': '356.06T',
        'complete': '77.69%',
        'totalMb': '1040.00G',
        'jobTotal': 3
    };
    return {datas, company, platAbility};
  }
}
