<template>
  <a-spin :spinning="confirmLoading">
    <JFormContainer :disabled="disabled">
      <template #detail>
        <a-form ref="formRef" class="antd-modal-form" :labelCol="labelCol" :wrapperCol="wrapperCol" name="NekoMemberInfoForm">
          <a-row>
            <a-col :span="12">
              <a-form-item label="顾客ID" v-bind="validateInfos.customerId" id="NekoMemberInfoForm-customerId" name="customerId">
                <a-input v-model:value="formData.customerId" placeholder="请输入顾客ID" allow-clear />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="会员类型" v-bind="validateInfos.type" id="NekoMemberInfoForm-type" name="type">
                <j-category-select
                  v-model:value="formData.type"
                  pcode=""
                  placeholder="请选择会员类型"
                  @change="(value) => handleFormChange('type', value)"
                  allow-clear
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="会员子类型" v-bind="validateInfos.subType" id="NekoMemberInfoForm-subType" name="subType">
                <j-category-select
                  v-model:value="formData.subType"
                  pcode=""
                  placeholder="请选择会员子类型"
                  @change="(value) => handleFormChange('subType', value)"
                  allow-clear
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="会员等级" v-bind="validateInfos.level" id="NekoMemberInfoForm-level" name="level">
                <a-input-number v-model:value="formData.level" placeholder="请输入会员等级" style="width: 100%" />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="加入日期" v-bind="validateInfos.joinDate" id="NekoMemberInfoForm-joinDate" name="joinDate">
                <a-date-picker
                  placeholder="请选择加入日期"
                  v-model:value="formData.joinDate"
                  value-format="YYYY-MM-DD"
                  style="width: 100%"
                  allow-clear
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="来源类型" v-bind="validateInfos.sourceType" id="NekoMemberInfoForm-sourceType" name="sourceType">
                <j-dict-select-tag type="radio" v-model:value="formData.sourceType" dictCode="" placeholder="请选择来源类型" allow-clear />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="来源ID" v-bind="validateInfos.sourceId" id="NekoMemberInfoForm-sourceId" name="sourceId">
                <a-input v-model:value="formData.sourceId" placeholder="请输入来源ID" allow-clear />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="来源名称" v-bind="validateInfos.sourceName" id="NekoMemberInfoForm-sourceName" name="sourceName">
                <a-input v-model:value="formData.sourceName" placeholder="请输入来源名称" allow-clear />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="备注" v-bind="validateInfos.remark" id="NekoMemberInfoForm-remark" name="remark">
                <a-textarea v-model:value="formData.remark" :rows="4" placeholder="请输入备注" />
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
      </template>
    </JFormContainer>
  </a-spin>
</template>

<script lang="ts" setup>
  import { ref, reactive, defineExpose, nextTick, defineProps, computed, onMounted } from 'vue';
  import { defHttp } from '/@/utils/http/axios';
  import { useMessage } from '/@/hooks/web/useMessage';
  import JDictSelectTag from '/@/components/Form/src/jeecg/components/JDictSelectTag.vue';
  import JCategorySelect from '/@/components/Form/src/jeecg/components/JCategorySelect.vue';
  import { getValueType } from '/@/utils';
  import { saveOrUpdate } from '../NekoMemberInfo.api';
  import { Form } from 'ant-design-vue';
  import JFormContainer from '/@/components/Form/src/container/JFormContainer.vue';
  const props = defineProps({
    formDisabled: { type: Boolean, default: false },
    formData: { type: Object, default: () => ({}) },
    formBpm: { type: Boolean, default: true },
  });
  const formRef = ref();
  const useForm = Form.useForm;
  const emit = defineEmits(['register', 'ok']);
  const formData = reactive<Record<string, any>>({
    id: '',
    customerId: '',
    type: '',
    subType: '',
    level: undefined,
    joinDate: '',
    sourceType: '',
    sourceId: '',
    sourceName: '',
    remark: '',
  });
  const { createMessage } = useMessage();
  const labelCol = ref<any>({ xs: { span: 24 }, sm: { span: 5 } });
  const wrapperCol = ref<any>({ xs: { span: 24 }, sm: { span: 16 } });
  const confirmLoading = ref<boolean>(false);
  //表单验证
  const validatorRules = reactive({
    customerId: [{ required: true, message: '请输入顾客ID!' }],
    joinDate: [{ required: true, message: '请输入加入日期!' }],
  });
  const { resetFields, validate, validateInfos } = useForm(formData, validatorRules, { immediate: false });

  // 表单禁用
  const disabled = computed(() => {
    if (props.formBpm === true) {
      if (props.formData.disabled === false) {
        return false;
      } else {
        return true;
      }
    }
    return props.formDisabled;
  });

  /**
   * 新增
   */
  function add() {
    edit({});
  }

  /**
   * 编辑
   */
  function edit(record) {
    nextTick(() => {
      resetFields();
      const tmpData = {};
      Object.keys(formData).forEach((key) => {
        if (record.hasOwnProperty(key)) {
          tmpData[key] = record[key];
        }
      });
      //赋值
      Object.assign(formData, tmpData);
    });
  }

  /**
   * 提交数据
   */
  async function submitForm() {
    try {
      // 触发表单验证
      await validate();
    } catch ({ errorFields }) {
      if (errorFields) {
        const firstField = errorFields[0];
        if (firstField) {
          formRef.value.scrollToField(firstField.name, { behavior: 'smooth', block: 'center' });
        }
      }
      return Promise.reject(errorFields);
    }
    confirmLoading.value = true;
    const isUpdate = ref<boolean>(false);
    //时间格式化
    let model = formData;
    if (model.id) {
      isUpdate.value = true;
    }
    //循环数据
    for (let data in model) {
      //如果该数据是数组并且是字符串类型
      if (model[data] instanceof Array) {
        let valueType = getValueType(formRef.value.getProps, data);
        //如果是字符串类型的需要变成以逗号分割的字符串
        if (valueType === 'string') {
          model[data] = model[data].join(',');
        }
      }
    }
    await saveOrUpdate(model, isUpdate.value)
      .then((res) => {
        if (res.success) {
          createMessage.success(res.message);
          emit('ok');
        } else {
          createMessage.warning(res.message);
        }
      })
      .finally(() => {
        confirmLoading.value = false;
      });
  }

  /**
   * 值改变事件触发
   * @param key
   * @param value
   */
  function handleFormChange(key, value) {
    formData[key] = value;
  }
  defineExpose({
    add,
    edit,
    submitForm,
  });
</script>

<style lang="less" scoped>
  .antd-modal-form {
    padding: 14px;
  }
</style>
