<template>
  <a-spin :spinning="confirmLoading">
    <JFormContainer :disabled="disabled">
      <template #detail>
        <a-form ref="formRef" class="antd-modal-form" :labelCol="labelCol" :wrapperCol="wrapperCol" name="NekoCustomerInfoForm">
          <a-row>
						<a-col :span="12">
							<a-form-item label="顾客姓名" v-bind="validateInfos.name" id="NekoCustomerInfoForm-name" name="name">
								<a-input v-model:value="formData.name" placeholder="请输入顾客姓名"  allow-clear ></a-input>
							</a-form-item>
						</a-col>
						<a-col :span="12">
							<a-form-item label="昵称" v-bind="validateInfos.nickName" id="NekoCustomerInfoForm-nickName" name="nickName">
								<a-input v-model:value="formData.nickName" placeholder="请输入昵称"  allow-clear ></a-input>
							</a-form-item>
						</a-col>
						<a-col :span="12">
							<a-form-item label="电话" v-bind="validateInfos.phoneNum" id="NekoCustomerInfoForm-phoneNum" name="phoneNum">
								<a-input v-model:value="formData.phoneNum" placeholder="请输入电话"  allow-clear ></a-input>
							</a-form-item>
						</a-col>
						<a-col :span="12">
							<a-form-item label="微信号" v-bind="validateInfos.wechatNum" id="NekoCustomerInfoForm-wechatNum" name="wechatNum">
								<a-input v-model:value="formData.wechatNum" placeholder="请输入微信号"  allow-clear ></a-input>
							</a-form-item>
						</a-col>
						<a-col :span="12">
							<a-form-item label="性别" v-bind="validateInfos.gender" id="NekoCustomerInfoForm-gender" name="gender">
								<j-dict-select-tag type='radio' v-model:value="formData.gender" dictCode="" placeholder="请选择性别"  allow-clear />
							</a-form-item>
						</a-col>
						<a-col :span="12">
							<a-form-item label="生日" v-bind="validateInfos.birthday" id="NekoCustomerInfoForm-birthday" name="birthday">
								<a-date-picker placeholder="请选择生日"  v-model:value="formData.birthday" value-format="YYYY-MM-DD"  style="width: 100%"  allow-clear />
							</a-form-item>
						</a-col>
						<a-col :span="12">
							<a-form-item label="头像" v-bind="validateInfos.avatar" id="NekoCustomerInfoForm-avatar" name="avatar">
								<j-image-upload :fileMax="0" v-model:value="formData.avatar" ></j-image-upload>
							</a-form-item>
						</a-col>
						<a-col :span="12">
							<a-form-item label="来源" v-bind="validateInfos.source" id="NekoCustomerInfoForm-source" name="source">
								<j-dict-select-tag v-model:value="formData.source" dictCode="" placeholder="请选择来源"  allow-clear />
							</a-form-item>
						</a-col>
						<a-col :span="12">
							<a-form-item label="子来源" v-bind="validateInfos.subSource" id="NekoCustomerInfoForm-subSource" name="subSource">
								<j-dict-select-tag type='radio' v-model:value="formData.subSource" dictCode="" placeholder="请选择子来源"  allow-clear />
							</a-form-item>
						</a-col>
						<a-col :span="12">
							<a-form-item label="跟踪员工ID" v-bind="validateInfos.employeeId" id="NekoCustomerInfoForm-employeeId" name="employeeId">
						<j-select-user v-model:value="formData.employeeId"      allow-clear />
							</a-form-item>
						</a-col>
						<a-col :span="12">
							<a-form-item label="咨询顾问员工ID" v-bind="validateInfos.consultantId" id="NekoCustomerInfoForm-consultantId" name="consultantId">
						<j-select-user v-model:value="formData.consultantId"      allow-clear />
							</a-form-item>
						</a-col>
						<a-col :span="12">
							<a-form-item label="推荐人ID" v-bind="validateInfos.recommenderId" id="NekoCustomerInfoForm-recommenderId" name="recommenderId">
								<j-search-select v-model:value="formData.recommenderId" dict=""  allow-clear />
							</a-form-item>
						</a-col>
						<a-col :span="12">
							<a-form-item label="会员ID" v-bind="validateInfos.memberId" id="NekoCustomerInfoForm-memberId" name="memberId">
								<j-select-multiple type="list_multi" v-model:value="formData.memberId" dictCode="" placeholder="请选择会员ID"  :triggerChange="false"/>
							</a-form-item>
						</a-col>
						<a-col :span="12">
							<a-form-item label="标签" v-bind="validateInfos.tagConfig" id="NekoCustomerInfoForm-tagConfig" name="tagConfig">
								<a-input v-model:value="formData.tagConfig" placeholder="请输入标签"  allow-clear ></a-input>
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
  import JSelectMultiple from '/@/components/Form/src/jeecg/components/JSelectMultiple.vue';
  import JSearchSelect from '/@/components/Form/src/jeecg/components/JSearchSelect.vue';
  import JSelectUser from '/@/components/Form/src/jeecg/components/JSelectUser.vue';
  import JImageUpload from '/@/components/Form/src/jeecg/components/JImageUpload.vue';
  import { getValueType } from '/@/utils';
  import { saveOrUpdate } from '../NekoCustomerInfo.api';
  import { Form } from 'ant-design-vue';
  import JFormContainer from '/@/components/Form/src/container/JFormContainer.vue';
  import { duplicateValidate } from '/@/utils/helper/validator'
  const props = defineProps({
    formDisabled: { type: Boolean, default: false },
    formData: { type: Object, default: () => ({})},
    formBpm: { type: Boolean, default: true }
  });
  const formRef = ref();
  const useForm = Form.useForm;
  const emit = defineEmits(['register', 'ok']);
  const formData = reactive<Record<string, any>>({
    id: '',
    name: '',   
    nickName: '',   
    phoneNum: '',   
    wechatNum: '',   
    gender: undefined,
    birthday: '',   
    avatar: '',   
    source: '',   
    subSource: '',   
    employeeId: '',   
    consultantId: '',   
    recommenderId: '',   
    memberId: '',   
    tagConfig: '',   
  });
  const { createMessage } = useMessage();
  const labelCol = ref<any>({ xs: { span: 24 }, sm: { span: 5 } });
  const wrapperCol = ref<any>({ xs: { span: 24 }, sm: { span: 16 } });
  const confirmLoading = ref<boolean>(false);
  //表单验证
  const validatorRules = reactive({
    nickName: [{ required: true, message: '请输入昵称!'},],
    phoneNum: [{ required: true, message: '请输入电话!'}, { pattern: /^1[3456789]\d{9}$/, message: '请输入正确的手机号码!'},],
    wechatNum: [{ required: true, message: '请输入微信号!'}, { validator: wechatNumDuplicatevalidate }],
  });
  const { resetFields, validate, validateInfos } = useForm(formData, validatorRules, { immediate: false });

  // 表单禁用
  const disabled = computed(()=>{
    if(props.formBpm === true){
      if(props.formData.disabled === false){
        return false;
      }else{
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
        if(record.hasOwnProperty(key)){
          tmpData[key] = record[key]
        }
      })
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


  async function wechatNumDuplicatevalidate(_r, value) {
    return duplicateValidate('neko_customer_info', 'wechat_num', value, formData.id || '')
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
