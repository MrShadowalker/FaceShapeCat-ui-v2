<template>
  <div class="p-2">
    <!--查询区域-->
    <div class="jeecg-basic-table-form-container">
      <a-form ref="formRef" @keyup.enter.native="searchQuery" :model="queryParam" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-row :gutter="24">
          <a-col :lg="6">
            <a-form-item name="name">
              <template #label><span title="顾客姓名">顾客姓名</span></template>
              <a-input placeholder="请输入顾客姓名" v-model:value="queryParam.name" allow-clear ></a-input>
            </a-form-item>
          </a-col>
          <a-col :lg="6">
            <a-form-item name="nickName">
              <template #label><span title="昵称">昵称</span></template>
              <a-input placeholder="请输入昵称" v-model:value="queryParam.nickName" allow-clear ></a-input>
            </a-form-item>
          </a-col>
          <template v-if="toggleSearchStatus">
            <a-col :lg="6">
              <a-form-item name="phoneNum">
                <template #label><span title="电话">电话</span></template>
                <a-input placeholder="请输入电话" v-model:value="queryParam.phoneNum" allow-clear ></a-input>
              </a-form-item>
            </a-col>
            <a-col :lg="6">
              <a-form-item name="wechatNum">
                <template #label><span title="微信号">微信号</span></template>
                <a-input placeholder="请输入微信号" v-model:value="queryParam.wechatNum" allow-clear ></a-input>
              </a-form-item>
            </a-col>
            <a-col :lg="6">
              <a-form-item name="gender">
                <template #label><span title="性别">性别</span></template>
                <a-input placeholder="请输入性别" v-model:value="queryParam.gender" allow-clear ></a-input>
              </a-form-item>
            </a-col>
            <a-col :lg="6">
              <a-form-item name="birthday">
                <template #label><span title="生日">生日</span></template>
                <a-range-picker showTime value-format="YYYY-MM-DD HH:mm:ss" v-model:value="queryParam.birthday" class="query-group-cust"/>
              </a-form-item>
            </a-col>
            <a-col :lg="6">
              <a-form-item name="source">
                <template #label><span title="来源">来源</span></template>
                <a-input placeholder="请输入来源" v-model:value="queryParam.source" allow-clear ></a-input>
              </a-form-item>
            </a-col>
            <a-col :lg="6">
              <a-form-item name="subSource">
                <template #label><span title="子来源">子来源</span></template>
                <a-input placeholder="请输入子来源" v-model:value="queryParam.subSource" allow-clear ></a-input>
              </a-form-item>
            </a-col>
            <a-col :lg="6">
              <a-form-item name="employeeId">
                <template #label><span title="跟踪员工ID">跟踪员工</span></template>
                <j-select-user placeholder="请选择跟踪员工ID" v-model:value="queryParam.employeeId" @change="(value)=>handleFormJoinChange('employeeId',value)" allow-clear />
              </a-form-item>
            </a-col>
            <a-col :lg="6">
              <a-form-item name="consultantId">
                <template #label><span title="咨询顾问员工ID">咨询顾问</span></template>
                <j-select-user placeholder="请选择咨询顾问员工ID" v-model:value="queryParam.consultantId" @change="(value)=>handleFormJoinChange('consultantId',value)" allow-clear />
              </a-form-item>
            </a-col>
            <a-col :lg="6">
              <a-form-item name="recommenderId">
                <template #label><span title="推荐人ID">推荐人I</span></template>
                <j-search-select placeholder="请选择推荐人ID" v-model:value="queryParam.recommenderId" dict=",," allow-clear />
              </a-form-item>
            </a-col>
            <a-col :lg="6">
              <a-form-item name="memberId">
                <template #label><span title="会员ID">会员ID</span></template>
                <j-select-multiple placeholder="请选择会员ID" dictCode="" v-model:value="queryParam.memberId" allow-clear />
              </a-form-item>
            </a-col>
            <a-col :lg="6">
              <a-form-item name="tagConfig">
                <template #label><span title="标签">标签</span></template>
                <a-input placeholder="请输入标签" v-model:value="queryParam.tagConfig" allow-clear ></a-input>
              </a-form-item>
            </a-col>
          </template>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <span style="float: left; overflow: hidden" class="table-page-search-submitButtons">
              <a-col :lg="6">
                <a-button type="primary" preIcon="ant-design:search-outlined" @click="searchQuery">查询</a-button>
                <a-button type="primary" preIcon="ant-design:reload-outlined" @click="searchReset" style="margin-left: 8px">重置</a-button>
                <a @click="toggleSearchStatus = !toggleSearchStatus" style="margin-left: 8px">
                  {{ toggleSearchStatus ? '收起' : '展开' }}
                  <Icon :icon="toggleSearchStatus ? 'ant-design:up-outlined' : 'ant-design:down-outlined'" />
                </a>
              </a-col>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <!--引用表格-->
    <BasicTable @register="registerTable" :rowSelection="rowSelection">
      <!--插槽:table标题-->
      <template #tableTitle>
        <a-button type="primary" v-auth="'nekoCustomInfo:neko_custom_info:add'"  @click="handleAdd" preIcon="ant-design:plus-outlined"> 新增</a-button>
        <a-button  type="primary" v-auth="'nekoCustomInfo:neko_custom_info:exportXls'" preIcon="ant-design:export-outlined" @click="onExportXls"> 导出</a-button>
        <j-upload-button  type="primary" v-auth="'nekoCustomInfo:neko_custom_info:importExcel'"  preIcon="ant-design:import-outlined" @click="onImportXls">导入</j-upload-button>
        <a-dropdown v-if="selectedRowKeys.length > 0">
          <template #overlay>
            <a-menu>
              <a-menu-item key="1" @click="batchHandleDelete">
                <Icon icon="ant-design:delete-outlined"></Icon>
                删除
              </a-menu-item>
            </a-menu>
          </template>
          <a-button v-auth="'nekoCustomInfo:neko_custom_info:deleteBatch'">批量操作
            <Icon icon="mdi:chevron-down"></Icon>
          </a-button>
        </a-dropdown>
        <!-- 高级查询 -->
        <super-query :config="superQueryConfig" @search="handleSuperQuery" />
      </template>
      <!--操作栏-->
      <template #action="{ record }">
        <TableAction :actions="getTableAction(record)" :dropDownActions="getDropDownAction(record)"/>
      </template>
      <template v-slot:bodyCell="{ column, record, index, text }">
      </template>
    </BasicTable>
    <!-- 表单区域 -->
    <NekoCustomInfoModal ref="registerModal" @success="handleSuccess"></NekoCustomInfoModal>
  </div>
</template>

<script lang="ts" name="nekoCustomInfo-nekoCustomInfo" setup>
  import { ref, reactive } from 'vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { useListPage } from '/@/hooks/system/useListPage';
  import { columns, superQuerySchema } from './NekoCustomInfo.data';
  import { list, deleteOne, batchDelete, getImportUrl, getExportUrl } from './NekoCustomInfo.api';
  import { downloadFile } from '/@/utils/common/renderUtils';
  import NekoCustomInfoModal from './components/NekoCustomInfoModal.vue'
  import { useUserStore } from '/@/store/modules/user';
  import JSelectMultiple from '/@/components/Form/src/jeecg/components/JSelectMultiple.vue';
  import JSearchSelect from '/@/components/Form/src/jeecg/components/JSearchSelect.vue';
  import JSelectUser from '/@/components/Form/src/jeecg/components/JSelectUser.vue';
  import { cloneDeep } from "lodash-es";

  const formRef = ref();
  const queryParam = reactive<any>({});
  const toggleSearchStatus = ref<boolean>(false);
  const registerModal = ref();
  const userStore = useUserStore();
  //注册table数据
  const { prefixCls, tableContext, onExportXls, onImportXls } = useListPage({
    tableProps: {
      title: '顾客信息',
      api: list,
      columns,
      canResize:false,
      useSearchForm: false,
      actionColumn: {
        width: 120,
        fixed: 'right',
      },
      beforeFetch: async (params) => {
        let rangerQuery = await setRangeQuery();
        return Object.assign(params, rangerQuery);
      },
    },
    exportConfig: {
      name: "顾客信息",
      url: getExportUrl,
      params: queryParam,
    },
	  importConfig: {
	    url: getImportUrl,
	    success: handleSuccess
	  },
  });
  const [registerTable, { reload, collapseAll, updateTableDataRecord, findTableDataRecord, getDataSource }, { rowSelection, selectedRowKeys }] = tableContext;
  const labelCol = reactive({
    xs:24,
    sm:4,
    xl:6,
    xxl:4
  });
  const wrapperCol = reactive({
    xs: 24,
    sm: 20,
  });

  // 高级查询配置
  const superQueryConfig = reactive(superQuerySchema);

  /**
   * 高级查询事件
   */
  function handleSuperQuery(params) {
    Object.keys(params).map((k) => {
      queryParam[k] = params[k];
    });
    searchQuery();
  }

  /**
   * 新增事件
   */
  function handleAdd() {
    registerModal.value.disableSubmit = false;
    registerModal.value.add();
  }
  
  /**
   * 编辑事件
   */
  function handleEdit(record: Recordable) {
    registerModal.value.disableSubmit = false;
    registerModal.value.edit(record);
  }
   
  /**
   * 详情
   */
  function handleDetail(record: Recordable) {
    registerModal.value.disableSubmit = true;
    registerModal.value.edit(record);
  }
   
  /**
   * 删除事件
   */
  async function handleDelete(record) {
    await deleteOne({ id: record.id }, handleSuccess);
  }
   
  /**
   * 批量删除事件
   */
  async function batchHandleDelete() {
    await batchDelete({ ids: selectedRowKeys.value }, handleSuccess);
  }
   
  /**
   * 成功回调
   */
  function handleSuccess() {
    (selectedRowKeys.value = []) && reload();
  }
   
  /**
   * 操作栏
   */
  function getTableAction(record) {
    return [
      {
        label: '编辑',
        onClick: handleEdit.bind(null, record),
        auth: 'nekoCustomInfo:neko_custom_info:edit'
      },
    ];
  }
   
  /**
   * 下拉操作栏
   */
  function getDropDownAction(record) {
    return [
      {
        label: '详情',
        onClick: handleDetail.bind(null, record),
      }, {
        label: '删除',
        popConfirm: {
          title: '是否确认删除',
          confirm: handleDelete.bind(null, record),
          placement: 'topLeft',
        },
        auth: 'nekoCustomInfo:neko_custom_info:delete'
      }
    ]
  }

  /**
   * 查询
   */
  function searchQuery() {
    reload();
  }
  
  /**
   * 重置
   */
  function searchReset() {
    formRef.value.resetFields();
    selectedRowKeys.value = [];
    //刷新数据
    reload();
  }
  

  /**
   * form点击事件(以逗号分割)
   * @param key
   * @param value
   */
  function handleFormJoinChange(key, value) {
    if (typeof value != 'string') {
      queryParam[key] = value.join(',');
    }
  }


  
  let rangeField = 'birthday,'
  
  /**
   * 设置范围查询条件
   */
  async function setRangeQuery(){
    let queryParamClone = cloneDeep(queryParam);
    if (rangeField) {
      let fieldsValue = rangeField.split(',');
      fieldsValue.forEach(item => {
        if (queryParamClone[item]) {
          let range = queryParamClone[item];
          queryParamClone[item+'_begin'] = range[0];
          queryParamClone[item+'_end'] = range[1];
          delete queryParamClone[item];
        } else {
          queryParamClone[item+'_begin'] = '';
          queryParamClone[item+'_end'] = '';
        }
      })
    }
    return queryParamClone;
  }
</script>

<style lang="less" scoped>
  .jeecg-basic-table-form-container {
    padding: 0;
    .table-page-search-submitButtons {
      display: block;
      margin-bottom: 24px;
      white-space: nowrap;
    }
    .query-group-cust{
      min-width: 100px !important;
    }
    .query-group-split-cust{
      width: 30px;
      display: inline-block;
      text-align: center
    }
    .ant-form-item:not(.ant-form-item-with-help){
      margin-bottom: 16px;
      height: 32px;
    }
    :deep(.ant-picker),:deep(.ant-input-number){
      width: 100%;
    }
  }
</style>
