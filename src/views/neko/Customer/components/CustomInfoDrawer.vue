<template>
    <Drawer v-model:open="open" width="600px">
        <template #title>
            顾客消费记录及会员
        </template>
        <Card>
            <template #title>
                {{ record.name }}
                <div>
                    <span style="font-size: 12px;">{{ record.phoneNum }}</span>
                </div>
            </template>
            <a-row :gutter="16">
                <a-col :span="5">
                    <Statistic title="储值余额(元)" :precision="2" :value="112893" />
                </a-col>
                <Divider type="vertical" style="height: 70px;"></Divider>
                <a-col :span="5">
                    <Statistic title="赠金余额(元)" :precision="2" :value="112893" />
                </a-col>
                <Divider type="vertical" style="height: 70px;"></Divider>
                <a-col :span="5">
                    <Statistic title="积分" :precision="2" :value="112893" />
                </a-col>
                <Divider type="vertical" style="height: 70px;"></Divider>
                <a-col :span="5">
                    <Statistic title="欠款(元)" :precision="2" :value="112893" />
                </a-col>
            </a-row>
        </Card>
        <Tabs v-model:activeKey="activeKey">
            <TabPane key="1" tab="会员卡">
                <MemberCard></MemberCard>
            </TabPane>
            <TabPane key="2" tab="套餐/流程">
                <BeautyPackage></BeautyPackage>
            </TabPane>
        </Tabs>
    </Drawer>
</template>

<script lang="ts" setup>
import { ref,reactive,defineProps,defineExpose } from 'vue';
import { Drawer,Card,Divider,Statistic,Tabs,TabPane } from 'ant-design-vue';
import MemberCard from './MemberCard.vue';
import BeautyPackage from './BeautyPackage.vue';
// const props = defineProps({
//     record: { type: Object, default: () => ({})},
//   });
    const open = ref<boolean>(false);
    const record = ref<any>({});

    const activeKey = ref<string>("1");

defineExpose({
    open,
    record
})

</script>