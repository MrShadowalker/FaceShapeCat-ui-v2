import { BasicColumn } from '/@/components/Table';
import { render } from '/@/utils/common/renderUtils';
//列表数据
export const columns: BasicColumn[] = [
  {
    title: '顾客ID',
    align: 'center',
    dataIndex: 'customerId',
  },
  {
    title: '会员类型',
    align: 'center',
    dataIndex: 'type',
    customRender: ({ text }) => {
      return render.renderCategoryTree(text, '');
    },
  },
  {
    title: '会员子类型',
    align: 'center',
    dataIndex: 'subType',
    customRender: ({ text }) => {
      return render.renderCategoryTree(text, '');
    },
  },
  {
    title: '会员等级',
    align: 'center',
    dataIndex: 'level',
  },
  {
    title: '加入日期',
    align: 'center',
    dataIndex: 'joinDate',
    customRender: ({ text }) => {
      text = !text ? '' : text.length > 10 ? text.substr(0, 10) : text;
      return text;
    },
  },
  {
    title: '来源类型',
    align: 'center',
    dataIndex: 'sourceType_dictText',
  },
  {
    title: '来源ID',
    align: 'center',
    dataIndex: 'sourceId',
  },
  {
    title: '来源名称',
    align: 'center',
    dataIndex: 'sourceName',
  },
  {
    title: '备注',
    align: 'center',
    dataIndex: 'remark',
  },
];

// 高级查询数据
export const superQuerySchema = {
  customerId: { title: '顾客ID', order: 0, view: 'text', type: 'string' },
  type: { title: '会员类型', order: 1, view: 'cat_tree', type: 'string', pcode: '' },
  subType: { title: '会员子类型', order: 2, view: 'cat_tree', type: 'string', pcode: '' },
  level: { title: '会员等级', order: 3, view: 'number', type: 'number' },
  joinDate: { title: '加入日期', order: 4, view: 'date', type: 'string' },
  sourceType: { title: '来源类型', order: 5, view: 'radio', type: 'string', dictCode: '' },
  sourceId: { title: '来源ID', order: 6, view: 'link_table_field', type: 'string' },
  sourceName: { title: '来源名称', order: 7, view: 'link_table_field', type: 'string' },
  remark: { title: '备注', order: 8, view: 'textarea', type: 'string' },
};
