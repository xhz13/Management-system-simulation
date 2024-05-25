<script setup lang="ts">
import  { nextTick,onMounted,ref } from 'vue';
import headBar from '../components/headBar.vue';
import { mm1 } from '../utils/MM1';
import { ElMessageBox } from 'element-plus';
import * as echarts from 'echarts';
import { reactive } from 'vue';
import type { ECharts as EChartsType } from 'echarts';
import { de } from 'element-plus/es/locales.mjs';

const num_delays_required = ref(null);
const mean_interarrival_in= ref(null);
const mean_service_in   = ref(null);


const Average_delay = ref(0);
const Average_number = ref(0);
const Server_utilization = ref(0);
const simulation_ended = ref(0);
const showCharts = ref(false);
const hasResult = ref(false);

let arrive_times = ref<number[]>([]);
let depart_times = ref<number[]>([]);
let difference_times = ref<number[]>([]);
let delay_times = ref<number[]>([]);
const records = ref<string[]>([]) // 用于存储每次实验的记录


const updateResults = () => {
  showCharts.value = true;
  hasResult.value = true;
  try {
    console.log('mm1 function start');
    if (num_delays_required.value === null || mean_interarrival_in.value === null || mean_service_in.value === null) {
        ElMessageBox.alert('输入值不能为空', '错误');
    } 
    else if (mean_interarrival_in.value <= 0 || mean_service_in.value <= 0 || num_delays_required.value <= 0) {
        ElMessageBox.alert('输入值不能小于等于0', '错误');
    }
    else if(mean_interarrival_in.value<mean_service_in.value){
        ElMessageBox.alert('服务时间不能小于到达时间', '错误');
    }
    else {
        const results = mm1(+num_delays_required.value, +mean_interarrival_in.value, +mean_service_in.value);
        Average_delay.value = results[0] as number;
        Average_number.value = results[1] as number;
        Server_utilization.value = results[2] as number;
        simulation_ended.value = results[3] as number;
        arrive_times.value = results[4] as number[];
        depart_times.value = results[5] as number[];
        delay_times.value = results[6] as number[];
        difference_times.value = depart_times.value.map((item, index) => item - arrive_times.value[index]);
    }
    records.value.push(`Average delay in queue: ${ Average_delay.value }, Average number in queue: ${ Average_number.value }, Server utilization: ${ Server_utilization.value }, Simulation ended: ${ simulation_ended.value }`)
    if (records.value.length >= 5) { // 如果 records 的长度已经达到 10
        records.value.shift(); // 移除 records 中的第一个元素
    }
  } catch (error) {
    console.error('An error occurred:', error);
  }

  nextTick(() => {
    type EChartsOption = echarts.EChartsOption;
  length = arrive_times.value.length;

  var chartDom1 = document.getElementById('chart1')!;
  var myChart1 = echarts.init(chartDom1);
  var option1: EChartsOption;
  option1 = {
    title: {
      text: '到达时间'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      }
    },
    legend: {
      data: ['arrive']
    },
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    grid: {
      left: '3%',
      right: '6%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: Array.from({length: length}, (_, i) => (i + 1).toString()),
      name: '客户',
    },
    yAxis: {
      type: 'value',
      name: '到达时间点'
    },
    series: [
        {
          name: 'arrive',
          type: 'line',
          // stack: 'Total',
          areaStyle: {},
          emphasis: {
            focus: 'series'
          },
          data: arrive_times.value
        },
    ]
  };
  option1 && myChart1.setOption(option1);

  var chartDom2 = document.getElementById('chart2')!;
  var myChart2 = echarts.init(chartDom2);
  var option2: EChartsOption;
  option2 = {
    title: {
      text: '离开时间'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      }
    },
    legend: {
      data: ['depart']
    },
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    grid: {
      left: '3%',
      right: '6%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [{
      type: 'category',
      boundaryGap: false,
      data: Array.from({length: length}, (_, i) => (i + 1).toString()),
      name: '客户'
    }],
    yAxis: [{
      type: 'value',
      name: '离开时间点'
    }],
    series: [
        {
          name: 'depart',
          type: 'line',
          stack: 'Total',
          areaStyle: {},
          emphasis: {
            focus: 'series'
          },
          data: depart_times.value
        },
    ]
  };
  option2 && myChart2.setOption(option2);

  var chartDom3 = document.getElementById('chart3')!;
  var myChart3 = echarts.init(chartDom3);
  var option3: EChartsOption;
  option3 = {
  title: {
    text: '等待时间'
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      label: {
        backgroundColor: '#6a7985'
      }
    }
  },
  legend: {
    data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine']
  },
  toolbox: {
    feature: {
      saveAsImage: {}
    }
  },
  grid: {
    left: '3%',
    right: '6%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: [
    {
      type: 'category',
      boundaryGap: false,
      data: Array.from({length: length}, (_, i) => (i + 1).toString()),
      name: '客户' 
    }
  ],
  yAxis: [
    {
      type: 'value',
      name: '等待时长'
    }
  ],
  series: [
    {
      data: delay_times.value,
      type: 'bar'
    }
  ]
};
option3 && myChart3.setOption(option3);
  });

};

const text = ref('Server Experiment');
const handleMouseOver = () => {
    text.value = 'made by 熊志鹏、吴秋尧';
};

const handleMouseOut = () => {
    text.value = 'Server Experiment';
};


</script>

<template>
    <div>
        <headBar/>
        <div class="container" :style="{ width: showCharts ? '1200px' : '300px' }">
            <p v-on:mouseover="handleMouseOver" v-on:mouseout="handleMouseOut">{{ text }}</p>
        <div class="inputbox">
            <el-input v-model="mean_interarrival_in" style="width: 240px" placeholder="mean interarrival time" />
            <el-input v-model="mean_service_in" style="width: 240px" placeholder="mean_service time" />
            <el-input v-model="num_delays_required" style="width: 240px" placeholder="num delays required" />
            <el-button type="primary"  @click="updateResults" >Calculate!</el-button>
        </div>
        <div class>
            <p :style="{ color: hasResult ? 'black' : 'lightgray', fontSize: '14px' }">Average delay in queue: {{ Average_delay }}</p>
            <p :style="{ color: hasResult ? 'black' : 'lightgray', fontSize: '14px' }">Average number in queue: {{ Average_number }}</p>
            <p :style="{ color: hasResult ? 'black' : 'lightgray', fontSize: '14px' }">Server utilization: {{ Server_utilization }}</p>
            <p :style="{ color: hasResult ? 'black' : 'lightgray', fontSize: '14px' }">Simulation ended: {{ simulation_ended }}</p>
        </div>
        <div v-for="(record, index) in [...records].reverse()" :key="index">
            <p style="font-size: 13px;">{{ record }}</p>
        </div>
        <div class="charts" v-if="showCharts">
          <div id="chart1"  style="width: 1000px;height:400px;"></div>
          <div id="chart2"  style="width: 1000px;height:400px;"></div>
          <div id="chart3"  style="width: 1000px;height:400px;"></div>
        </div>
      </div>
    </div>
</template>

<style scoped>
.container{
    padding: 30px;
    box-shadow: 0px 0px 10px 5px lightblue; /* 添加淡蓝色的边框阴影 */
    transition: box-shadow 0.3s ease; /* 添加过渡效果 */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    margin: 0 auto; /* 让元素水平居中 */
    width: 1100px; /* 设置元素的宽度 */
}
.container:hover {
    box-shadow: 0px 0px 20px 10px lightblue; /* 鼠标悬停时增大阴影 */
}
.inputbox {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.charts {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100%;
}

</style>

