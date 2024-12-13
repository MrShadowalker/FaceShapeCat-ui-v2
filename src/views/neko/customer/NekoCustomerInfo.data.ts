import { BasicColumn } from '/@/components/Table';
import { render } from '/@/utils/common/renderUtils';

//列表数据
export const columns: BasicColumn[] = [
  {
    title: '顾客姓名',
    align: 'center',
    dataIndex: 'name',
  },
  {
    title: '昵称',
    align: 'center',
    dataIndex: 'nickName',
  },
  {
    title: '电话',
    align: 'center',
    dataIndex: 'phoneNum',
  },
  {
    title: '微信号',
    align: 'center',
    dataIndex: 'wechatNum',
  },
  {
    title: '性别',
    align: 'center',
    dataIndex: 'gender_dictText',
  },
  {
    title: '生日',
    align: 'center',
    dataIndex: 'birthday',
    customRender: ({ text }) => {
      text = !text ? '' : text.length > 10 ? text.substr(0, 10) : text;
      return text;
    },
  },
  {
    title: '头像',
    align: 'center',
    dataIndex: 'avatar',
    customRender: render.renderImage,
  },
  {
    title: '来源',
    align: 'center',
    dataIndex: 'source_dictText',
  },
  {
    title: '子来源',
    align: 'center',
    dataIndex: 'subSource_dictText',
  },
  {
    title: '跟踪员工ID',
    align: 'center',
    dataIndex: 'employeeId_dictText',
  },
  {
    title: '咨询顾问员工ID',
    align: 'center',
    dataIndex: 'consultantId_dictText',
  },
  {
    title: '推荐人ID',
    align: 'center',
    dataIndex: 'recommenderId_dictText',
  },
  {
    title: '会员ID',
    align: 'center',
    dataIndex: 'memberId_dictText',
  },
  {
    title: '标签',
    align: 'center',
    dataIndex: 'tagConfig',
  },
];

// 高级查询数据
export const superQuerySchema = {
  name: { title: '顾客姓名', order: 0, view: 'text', type: 'string' },
  nickName: { title: '昵称', order: 1, view: 'text', type: 'string' },
  phoneNum: { title: '电话', order: 2, view: 'text', type: 'string' },
  wechatNum: { title: '微信号', order: 3, view: 'text', type: 'string' },
  gender: { title: '性别', order: 4, view: 'number', type: 'number', dictCode: '' },
  birthday: { title: '生日', order: 5, view: 'date', type: 'string' },
  avatar: { title: '头像', order: 6, view: 'image', type: 'string' },
  source: { title: '来源', order: 7, view: 'list', type: 'string', dictCode: '' },
  subSource: { title: '子来源', order: 8, view: 'radio', type: 'string', dictCode: '' },
  employeeId: { title: '跟踪员工ID', order: 9, view: 'sel_user', type: 'string' },
  consultantId: { title: '咨询顾问员工ID', order: 10, view: 'sel_user', type: 'string' },
  recommenderId: { title: '推荐人ID', order: 11, view: 'sel_search', type: 'string', dictCode: '' },
  memberId: { title: '会员ID', order: 12, view: 'list_multi', type: 'string', dictCode: '' },
  tagConfig: { title: '标签', order: 13, view: 'text', type: 'string' },
};
