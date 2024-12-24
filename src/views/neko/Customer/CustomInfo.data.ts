import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
import { getWeekMonthQuarterYear } from '/@/utils';
//列表数据
export const columns: BasicColumn[] = [
    
  {
    title: '序号',
    dataIndex: 'batch',
    align: 'center',
    width: 50,
    fixed: 'left',
    customRender: function ({ text, record, index, column }) {
        return index + 1;
    },
  },
  {
    title: '顾客姓名',
    align: "center",
    dataIndex: 'name',
    fixed: 'left',
  },
    // {
    //     title: '头像',
    //     align: "center",
    //     dataIndex: 'avatar',
    //     customRender: render.renderImage,
    // },
    {
        title: '昵称',
        align: "center",
        dataIndex: 'nickName'
    },
    {
        title: '性别',
        align: "center",
        dataIndex: 'gender_dictText'
    },
    {
        title: '生日',
        align: "center",
        dataIndex: 'birthday'
    },
    {
        title: '电话',
        align: "center",
        dataIndex: 'phoneNum'
    },
    {
        title: '微信号',
        align: "center",
        dataIndex: 'wechatNum'
    },
    {
        title: '来源',
        align: "center",
        customRender:function({text,record}){
            return record.source+"-"+record.subSource
        }
    },
    {
        title: '推荐人',
        align: "center",
        dataIndex: 'recommenderId_dictText',
        customRender:function({text,record}){
            return text?text:"/"
        }
    },
    {
        title: '咨询顾问',
        align: "center",
        dataIndex: 'consultantId_dictText',
        customRender:function({text,record}){
            return text?text:"/"
        }
    },
    {
        title: '跟踪员工',
        align: "center",
        dataIndex: 'employeeId_dictText',
        customRender:function({text,record}){
            return text?text:"/"
        }
    },
    {        
        title: '套餐数',
        align: "center",
        dataIndex: 'customerCourseCount',
    },
    {        
        title: '开卡数',
        align: "center",
        dataIndex: 'memberRechargeCardCount',
    }
];

// 高级查询数据
// export const superQuerySchema = {
//   name: {title: '顾客姓名',order: 0,view: 'text', type: 'string',},
//   nickName: {title: '昵称',order: 1,view: 'text', type: 'string',},
//   phoneNum: {title: '电话',order: 2,view: 'text', type: 'string',},
//   wechatNum: {title: '微信号',order: 3,view: 'text', type: 'string',},
//   gender: {title: '性别',order: 4,view: 'radio', type: 'string',dictCode: '',},
//   birthday: {title: '生日',order: 5,view: 'datetime', type: 'string',},
//   avatar: {title: '头像',order: 6,view: 'image', type: 'string',},
//   source: {title: '来源',order: 7,view: 'list', type: 'string',dictCode: '',},
//   subSource: {title: '子来源',order: 8,view: 'radio', type: 'string',dictCode: '',},
//   employeeId: {title: '跟踪员工ID',order: 9,view: 'sel_user', type: 'string',},
//   consultantId: {title: '咨询顾问员工ID',order: 10,view: 'sel_user', type: 'string',},
//   recommenderId: {title: '推荐人ID',order: 11,view: 'sel_search', type: 'string',dictCode: '',},
//   memberId: {title: '会员ID',order: 12,view: 'list_multi', type: 'string',dictCode: '',},
//   tagConfig: {title: '标签',order: 13,view: 'text', type: 'string',},
// };
