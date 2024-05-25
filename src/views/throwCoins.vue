<script setup lang="ts">
import { ref } from 'vue';
import { ElMessageBox } from 'element-plus';
import  {calculate} from '../utils/thorwCoinsCalulate';
import headBar from '../components/headBar.vue';
const handleClick = () => {
    if (input4.value === null || input3.value === null||input1.value === null || input2.value === null) {
        ElMessageBox.alert('输入值不能为空', '错误');
        return;
    }
    let ave_count = calculate(input4.value,input3.value);
    let ave_reward = input2.value - ave_count*input1.value;
    output1.value = `Expected frequency:${ave_count}`;
    output2.value = `Expected reward:${ave_reward}`;
    records.value.push(`Expected frequency:${ave_count}, Expected reward:${ave_reward}`); // 将实验的结果添加到 records 数组中
    if (records.value.length >= 4) { // 如果 records 的长度已经达到 10
        records.value.shift(); // 移除 records 中的第一个元素
    }
    hasResult.value = true; // 有新的结果，将 hasResult 设置为 true
};

const input1 = ref(null)
const input2 = ref(null)
const input3 = ref(null)
const input4 = ref(null)
const output1 = ref('Expected frequency: 0')
const output2 = ref('Expected reward: 0')
const hasResult = ref(false) // 判断是否是第一次实验
const records = ref<string[]>([]) // 用于存储每次实验的记录
const text = ref('Coin Flipping Experiment');


const handleMouseOver = () => {
    text.value = 'made by 熊志鹏、吴秋尧';
};

const handleMouseOut = () => {
    text.value = 'Coin Flipping Experiment';
};
</script>

<template>
    <headBar />
    <div class="container">
        <div>
        <p v-on:mouseover="handleMouseOver" v-on:mouseout="handleMouseOut">{{ text }}</p>
    </div>
        <div class="inputbox">
        <el-input v-model="input1" style="width: 240px" placeholder="Cost Per" />
        <el-input v-model="input2" style="width: 240px" placeholder="Reword Per" />
        <el-input v-model="input3" style="width: 240px" placeholder="Conditions" />
        <el-input v-model="input4" style="width: 240px" placeholder="Experiment time" />
        </div>
        <div class="mb-4">
            <el-button type="primary" @click="handleClick"> Calculate! </el-button>
        </div>
    <div>
        <p :style="{ color: hasResult ? 'black' : 'lightgray' , fontSize: '14px'}">{{ output1 }}</p>
        <p :style="{ color: hasResult ? 'black' : 'lightgray' , fontSize: '14px'}">{{ output2 }}</p>
        <div v-for="(record, index) in [...records].reverse()" :key="index">
            <p>{{ record }}</p>
        </div>
    </div>
    </div>
</template>

<style scoped>

.container {
    /* 增加边框大小 */
    padding: 30px;
    box-shadow: 0px 0px 10px 5px lightblue; /* 添加淡蓝色的边框阴影 */
    transition: box-shadow 0.3s ease; /* 添加过渡效果 */
    /* display: flex; */
    /* justify-content: center; */
    /* align-items: center; */
    margin: 0 auto; /* 让元素水平居中 */
    width: 300px; /* 设置元素的宽度 */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.container:hover {
    box-shadow: 0px 0px 20px 10px lightblue; /* 鼠标悬停时增大阴影 */
}
/* 让输入框竖向排列 */
.inputbox {
    display: flex;
    flex-direction: column;
    gap: 10px;
}
/* 让按钮居中 */
.mb-4 {
    display: flex;
    justify-content: center;
    margin-top: 12px; /* 增加与上面元素的距离 */
}
</style>