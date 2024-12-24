<template>
  <div class="p-2">
    <!--查询区域-->
    <div class="jeecg-basic-table-form-container">
        <a-form ref="formRef" @keyup.enter.native="searchQuery" :model="queryParam" :label-col="labelCol" :wrapper-col="wrapperCol">
            <a-row :gutter="24">
                <a-col :lg="6">
                    <a-form-item name="name">
                        <template #label><span title="顾客姓名">顾客姓名</span></template>
                        <j-input placeholder="请输入顾客姓名" v-model:value="queryParam.name" allow-clear ></j-input>
                    </a-form-item>
                </a-col>
                <a-col :lg="6">
                    <a-form-item name="nickName">
                        <template #label><span title="顾客昵称">顾客昵称</span></template>
                        <j-input placeholder="请输入顾客昵称" v-model:value="queryParam.nickName" allow-clear ></j-input>
                    </a-form-item>
                </a-col>
                <template v-if="toggleSearchStatus">
                    <a-col :lg="6">
                        <a-form-item name="gender">
                            <template #label><span title="顾客性别">顾客性别</span></template>
                            <JDictSelectTag type="select" v-model:value="queryParam.gender" dictCode="neko_gender" placeholder="请选择顾客性别" />
                        </a-form-item>
                    </a-col>
                    <a-col :lg="6">
                        <a-form-item name="phoneNum">
                            <template #label><span title="顾客电话">顾客电话</span></template>
                            <j-input placeholder="请输入顾客电话" v-model:value="queryParam.phoneNum" allow-clear ></j-input>
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
    <!-- 卡片区域 -->
     <Card style="height:100px;margin-bottom: 10px;position: relative;">
        <a-row :gutter="24" style="width: 98%;position: absolute;top:8px;">
            <a-col :span="3" style="width: 100%;">
                <Card style="height: 80px;background-color:#e6fef9;position: relative;">
                    <Statistic title="储值余额(元)" :precision="2" :value="112893" style="position: absolute;top:8px;"/>
                </Card>
            </a-col>
            <a-col :span="3" style="width: 100%;">
                <Card style="height: 80px;background-color:#e6fef9;position: relative;">
                    <Statistic title="过期卡金(元)" :precision="2" :value="112893" style="position: absolute;top:8px;"/>
                </Card>
            </a-col>
            <a-col :span="3" style="width: 100%;">
                <Card style="height: 80px;background-color:#e6fef9;position: relative;">
                    <Statistic title="赠金总额(元)" :precision="2" :value="112893" style="position: absolute;top:8px;"/>
                </Card>
            </a-col>
            <a-col :span="3" style="width: 100%;">
                <Card style="height: 80px;background-color:#e6fef9;position: relative;">
                    <Statistic title="过期赠金(元)" :precision="2" :value="112893" style="position: absolute;top:8px;"/>
                </Card>
            </a-col>            
            <a-col :span="3" style="width: 100%;">
                <Card style="height: 80px;background-color:#e6fef9;position: relative;">
                    <Statistic title="套餐余额(元)" :precision="2" :value="112893" style="position: absolute;top:8px;"/>
                </Card>
            </a-col>
            <a-col :span="3" style="width: 100%;">
                <Card style="height: 80px;background-color:#e6fef9;position: relative;">
                    <Statistic title="欠款(元)" :precision="2" :value="112893" style="position: absolute;top:8px;"/>
                </Card>
            </a-col>
            <a-col :span="3" style="width: 100%;">
                <Card style="height: 80px;background-color:#e6fef9;position: relative;">
                    <Statistic title="积分" :precision="2" :value="112893" style="position: absolute;top:8px;"/>
                </Card>
            </a-col>
            <a-col :span="3" style="width: 100%;">
                <Card style="height: 80px;background-color:#e6fef9;position: relative;">
                    <Statistic title="区间现金消费(元)" :precision="2" :value="112893" style="position: absolute;top:8px;"/>
                </Card>
            </a-col>
        </a-row>
    </Card>
    
    <!--引用表格-->
    <BasicTable @register="registerTable" :rowSelection="rowSelection">
      <!--插槽:table标题-->
      <template #tableTitle>
        <!-- <a-button type="primary" v-auth="'nekoCustomInfo:neko_custom_info:add'"  @click="handleAdd" preIcon="ant-design:plus-outlined">新增</a-button> -->
        <a-button type="primary" @click="handleAdd" preIcon="ant-design:plus-outlined">新增</a-button>
        <a-dropdown v-if="selectedRowKeys.length > 0">
          <template #overlay>
            <a-menu>
              <a-menu-item key="1" @click="batchHandleDelete">
                <Icon icon="ant-design:delete-outlined"></Icon>
                删除
              </a-menu-item>
            </a-menu>
          </template>
          <!-- <a-button v-auth="'nekoCustomInfo:neko_custom_info:deleteBatch'"> -->
            <a-button>
            批量操作
            <Icon icon="mdi:chevron-down"></Icon>
          </a-button>
        </a-dropdown>
      </template>
      <!--操作栏-->
      <template #action="{ record }">
        <TableAction :actions="getTableAction(record)" :dropDownActions="getDropDownAction(record)"/>
      </template>
      <template v-slot:bodyCell="{ column, record, index, text }">
      </template>
    </BasicTable>
    <!-- 表单区域 -->
        <CustomInfoModal ref="registerModal" @success="handleSuccess"></CustomInfoModal>
        <CustomInfoDrawer ref="registerDrawer"></CustomInfoDrawer>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
import { BasicTable, useTable, TableAction } from '/@/components/Table';
import { useListPage } from '/@/hooks/system/useListPage';
import { useUserStore } from '/@/store/modules/user';
import CustomInfoModal from './components/CustomInfoModal.vue';
import CustomInfoDrawer from './components/CustomInfoDrawer.vue';
import { columns } from './CustomInfo.data';
import JInput from '/@/components/Form/src/jeecg/components/JInput.vue';
import JDictSelectTag from '/@/components/Form/src/jeecg/components/JDictSelectTag.vue';
import { list, deleteOne, batchDelete, getImportUrl, getExportUrl } from './CustomInfo.api';
import { cloneDeep } from "lodash-es";
import { Statistic,Card } from 'ant-design-vue';

const formRef = ref();
const queryParam = reactive<any>({});
const toggleSearchStatus = ref<boolean>(false);
const registerModal = ref();
const registerDrawer = ref();
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
        width: 180,
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
    xs: 24,
    sm: 6,
  });
  const wrapperCol = reactive({
    xs: 24,
    sm: 18,
  });


  /**
   * 查询
   */
   function searchQuery() {
    reload();
  };
    /**
   * 重置
   */
   function searchReset() {
    formRef.value.resetFields();
    selectedRowKeys.value = [];
    //刷新数据
    reload();
  };
    /**
   * 详情
   */
   function handleDetail(record: Recordable) {
    registerModal.value.disableSubmit = true;
    registerModal.value.edit(record);
  };
   
  /**
   * 删除事件
   */
  async function handleDelete(record) {
    await deleteOne({ id: record.id }, handleSuccess);
  };
    /**
   * 成功回调
   */
   function handleSuccess() {
    (selectedRowKeys.value = []) && reload();
  };
     
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
        // auth: 'nekoCustomInfo:neko_custom_info:delete'
      }
    ]
  };
    /**
   * 新增事件
   */
   function handleAdd() {
    registerModal.value.disableSubmit = false;
    registerModal.value.add();
  };
   /**
   * 打开抽屉
   */
   function handleOpenDrawer(record: Recordable) {
    registerDrawer.value.open = true;
    registerDrawer.value.record = record;
  };
    /**
   * 编辑事件
   */
   function handleEdit(record: Recordable) {
    registerModal.value.disableSubmit = false;
    registerModal.value.edit(record);
  }
  
    /**
   * 批量删除事件
   */
   async function batchHandleDelete() {
    await batchDelete({ ids: selectedRowKeys.value }, handleSuccess);
  }
  /**
   * 操作栏
   */
   function getTableAction(record) {
    return [
      {
        label: '编辑',
        onClick: handleEdit.bind(null, record),
        // auth: 'nekoCustomInfo:neko_custom_info:edit'
      },
      {
        label: '消费',
        onClick: handleOpenDrawer.bind(null, record),
      }
    ];
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
