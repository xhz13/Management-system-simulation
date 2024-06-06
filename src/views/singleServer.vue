<script setup lang="ts">
import  { computed, nextTick,onMounted,ref,watchEffect } from 'vue';
import headBar from '../components/headBar.vue';
import { mm1 } from '../utils/MM1';
import { ElMessageBox } from 'element-plus';
import * as echarts from 'echarts';
import { reactive } from 'vue';
import type { ECharts as EChartsType } from 'echarts';
import { de } from 'element-plus/es/locales.mjs';

import {lcgrandst} from '../utils/randnumber';

const num_delays_required = ref<number | null>(null);
const mean_interarrival_in= ref(null);
const mean_service_in   = ref(null);


const Average_delay = ref(0);
const Average_number = ref(0);
const Server_utilization = ref(0);
const simulation_ended = ref(0);
const showCharts = ref(false);
const hasResult = ref(false);
const max_total_time = ref(0);
const max_queue_length = ref(0);
const max_delay = ref(0);
const proportion = ref(0);
const balk_cuts_num = ref(0);


let arrive_times = ref<number[]>([]);
let depart_times = ref<number[]>([]);
let difference_times = ref<number[]>([]);
let delay_times = ref<number[]>([]);
const records = ref<string[]>([]) // 用于存储每次实验的记录

const checked1 = ref(false)
const checked2 = ref(false)
const checked3 = ref(false)

var lastRandomSeed: number | undefined = undefined;

const randomSeed = ref<number | undefined>();
const queueLength = ref<number | undefined>();
const updateResults = () => {
  showCharts.value = true;
  hasResult.value = true;
  if(checked1.value == true){
    if(randomSeed.value === undefined || isNaN(randomSeed.value)) {
      alert("randomSeed must be a number");
      return;
    }
  else {
        lcgrandst(randomSeed.value,1);
    }
  }
  if(checked2.value == true||checked3.value == true){
    if(queueLength.value === undefined || isNaN(queueLength.value)) {
      alert("queueLength must be a number");
      return;
    }
    else {
      try {
        console.log('mm1 function start');
        if (num_delays_required.value === null || mean_interarrival_in.value === null || mean_service_in.value === null) {
            ElMessageBox.alert('输入值不能为空', '错误');
        } 
        else if (mean_interarrival_in.value <= 0 || mean_service_in.value <= 0 ) {
            ElMessageBox.alert('输入值不能小于等于0', '错误');
        }
        else if(mean_interarrival_in.value<mean_service_in.value){
            ElMessageBox.alert('服务时间不能小于到达时间', '错误');
        }
        else {
            const results = mm1(
              +num_delays_required.value, 
              +mean_interarrival_in.value, 
              +mean_service_in.value,
              queueLength.value,
              (eveningvalue.value || 0) - (moringvalue.value||0)
            );
            Average_delay.value = results[0] as number;
            Average_number.value = results[1] as number;
            Server_utilization.value = results[2] as number;
            simulation_ended.value = results[3] as number;
            arrive_times.value = results[4] as number[];
            depart_times.value = results[5] as number[];
            delay_times.value = results[6] as number[];
            difference_times.value = depart_times.value.map((item, index) => item - arrive_times.value[index]);
            // TODO - NEW
            max_total_time.value = results[7] as number;
            max_queue_length.value = results[8] as number;
            max_delay.value = results[9] as number;
            proportion.value = results[10] as number;
            balk_cuts_num.value = results[11] as number;

            const resultObj = {
            averageDelay: parseFloat((results[0] as number).toFixed(4)),
            averageNumber: parseFloat((results[1] as number).toFixed(4)),
            serverUtilization: parseFloat((results[2] as number).toFixed(4)),
            simulationEnded: parseFloat((results[3] as number).toFixed(4)),
            maxTotalTime: parseFloat((results[7] as number).toFixed(4)),
            maxQueueLength: results[8] as number, // assuming this is an integer
            maxDelay: parseFloat((results[9] as number).toFixed(4)),
            proportion: parseFloat((results[10] as number).toFixed(4)),
            balkCutsNum: results[11] as number,
          };
            tableData.value.push(resultObj);
        }
        } catch (error) {
          console.error('An error occurred:', error);
        }

      }
  }
  else {
      try {
      console.log('mm1 function start');
      if (num_delays_required.value === null || mean_interarrival_in.value === null || mean_service_in.value === null) {
          ElMessageBox.alert('输入值不能为空', '错误');
      } 
      else if (mean_interarrival_in.value <= 0 || mean_service_in.value <= 0 || num_delays_required.value <= 0) {
          ElMessageBox.alert('输入值不能小于等于0', '错误');
      }
      else if(mean_interarrival_in.value<mean_service_in.value){
          ElMessageBox.alert('服务时间不能大于到达时间', '错误');
      }
      else {
        if(queueLength.value === undefined || isNaN(queueLength.value)) {
          alert("queueLength must be a number");
          return;
        }
          const results = mm1(+num_delays_required.value, +mean_interarrival_in.value, +mean_service_in.value,queueLength.value);
          Average_delay.value = results[0] as number;
          Average_number.value = results[1] as number;
          Server_utilization.value = results[2] as number;
          simulation_ended.value = results[3] as number;
          arrive_times.value = results[4] as number[];
          depart_times.value = results[5] as number[];
          delay_times.value = results[6] as number[];
          difference_times.value = depart_times.value.map((item, index) => item - arrive_times.value[index]);
          max_total_time.value = results[7] as number;
          max_queue_length.value = results[8] as number;
          max_delay.value = results[9] as number;
          proportion.value = results[10] as number;

          const resultObj = {
            averageDelay: parseFloat((results[0] as number).toFixed(4)),
            averageNumber: parseFloat((results[1] as number).toFixed(4)),
            serverUtilization: parseFloat((results[2] as number).toFixed(4)),
            simulationEnded: parseFloat((results[3] as number).toFixed(4)),
            maxTotalTime: parseFloat((results[7] as number).toFixed(4)),
            maxQueueLength: results[8] as number, // assuming this is an integer
            maxDelay: parseFloat((results[9] as number).toFixed(4)),
            proportion: parseFloat((results[10] as number).toFixed(4)),
          };
            tableData.value.push(resultObj);
      }

    } catch (error) {
      console.error('An error occurred:', error);
    }
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



const moringvalue = ref<number>()
const eveningvalue = ref<number>()

const myoptions1 = [
{
    value: 5 * 60, // 早上6点对应的分钟数
    label: '早上5点',
  },
  {
    value: 6 * 60, // 早上6点对应的分钟数
    label: '早上6点',
  },
  {
    value: 7 * 60, // 早上7点对应的分钟数
    label: '早上7点',
  },
  {
    value: 8 * 60, // 早上7点对应的分钟数
    label: '早上8点',
  },
  {
    value: 9 * 60, // 早上9点对应的分钟数
    label: '早上9点',
  },
  {
    value: 10 * 60, // 早上10点对应的分钟数
    label: '早上10点',
  },
  {
    value: 11 * 60, // 早上11点对应的分钟数
    label: '早上11点',
  },
]

const myoptions2 = [
{
    value: 17 * 60, // 晚上6点对应的分钟数
    label: '晚上5点',
  },
  {
    value: 18 * 60, // 晚上6点对应的分钟数
    label: '晚上6点',
  },
  {
    value: 19 * 60, // 晚上7点对应的分钟数
    label: '晚上7点',
  },
  {
    value: 20 * 60, // 晚上8点对应的分钟数
    label: '晚上8点',
  },
  {
    value: 21 * 60, // 晚上9点对应的分钟数
    label: '晚上9点',
  },
  {
    value: 22 * 60, // 晚上10点对应的分钟数
    label: '晚上10点',
  },
  {
    value: 23 * 60, // 晚上10点对应的分钟数
    label: '晚上11点',
  },
]
watchEffect(() => {
      if (checked3.value) {
        num_delays_required.value = -1;
      }
      else{
        num_delays_required.value = null;
      }
      if(!checked2.value){
        queueLength.value = 100;
      }
  });

  const tableData = ref<Array<{ [key: string]: number | number[] }>>([]);


</script>

<template>
    <div>
        <headBar/>
        <div class="container" :style="{ width: showCharts ? '1200px' : '300px' }">
            <p v-on:mouseover="handleMouseOver" v-on:mouseout="handleMouseOut">{{ text }}</p>
        <div class="inputbox">
            <el-input v-model="mean_interarrival_in" style="width: 240px" placeholder="mean interarrival time" />
            <el-input v-model="mean_service_in" style="width: 240px" placeholder="mean_service time" />
            <el-input v-model="num_delays_required" :disabled="checked3" style="width: 240px" placeholder="num delays required" />
            <div style="display: flex; align-items: center;">
              <el-checkbox v-model="checked1" label="randomSeed" size="large" border />
              <el-input v-model="randomSeed" :disabled="!checked1" style="width: 120px" placeholder="A random seed" />
            </div>
            <div style="display: flex; align-items: center;">
              <el-checkbox v-model="checked2" label="Queue Length" size="large" border />
              <el-input v-model="queueLength" :disabled="!checked2" style="width: 120px" placeholder="Queue Length" />
            </div>
            <div >
              <el-checkbox v-model="checked3" label="Opening hours" size="large" border />
              <el-select v-model="moringvalue" :disabled="!checked3" placeholder="Select" size="large" style="width: 240px">
                <el-option v-for="item in myoptions1" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
              <el-select v-model="eveningvalue" :disabled="!checked3" placeholder="Select" style="width: 240px">
                <el-option v-for="item in myoptions2" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </div>
            <el-button type="primary"  @click="updateResults" >Calculate!</el-button>
        </div>
        <div>
            <p :style="{ color: hasResult ? 'black' : 'lightgray', fontSize: '14px' }">Average delay in queue: {{ Average_delay }}</p >
            <p :style="{ color: hasResult ? 'black' : 'lightgray', fontSize: '14px' }">Average number in queue: {{ Average_number }}</p >
            <p :style="{ color: hasResult ? 'black' : 'lightgray', fontSize: '14px' }">Server utilization: {{ Server_utilization }}</p >
            <p :style="{ color: hasResult ? 'black' : 'lightgray', fontSize: '14px' }">Simulation ended: {{ simulation_ended }}</p >
            <p :style="{ color: hasResult ? 'black' : 'lightgray', fontSize: '14px' }">Max total time: {{ max_total_time }}</p >
            <p :style="{ color: hasResult ? 'black' : 'lightgray', fontSize: '14px' }">Max queue length: {{ max_queue_length }}</p >
            <p :style="{ color: hasResult ? 'black' : 'lightgray', fontSize: '14px' }">Max delay: {{ max_delay }}</p >
            <p :style="{ color: hasResult ? 'black' : 'lightgray', fontSize: '14px' }">1 min Proportion: {{ proportion }}</p >
            <p :style="{ color: hasResult ? 'black' : 'lightgray', fontSize: '14px' }">Balk cuts num: {{ balk_cuts_num }}</p >
        </div>
        <div class="charts" v-if="showCharts">
          <div id="chart1"  style="width: 1000px;height:400px;"></div>
          <div id="chart2"  style="width: 1000px;height:400px;"></div>
          <div id="chart3"  style="width: 1000px;height:400px;"></div>
        </div>
      </div>
      <el-table :data="tableData" style="width: 100%; margin-top: 50px; margin-left: auto; margin-right: auto;">
          <el-table-column prop="averageDelay" label="Average delay in queue" />
          <el-table-column prop="averageNumber" label="Average number in queue" />
          <el-table-column prop="serverUtilization" label=" Server utilization" />
          <el-table-column prop="simulationEnded" label="Simulation ended" />
          <el-table-column prop="maxTotalTime" label="Max total time" />
          <el-table-column prop="maxQueueLength" label="Max queue length" />
          <el-table-column prop="maxDelay" label="Max delay" />
          <el-table-column prop="proportion" label="1 min Proportion" />
          <el-table-column prop="balkCutsNum" label="Balk cuts num" />
        </el-table>
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
.check{

}
.charts {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100%;
}

</style>

