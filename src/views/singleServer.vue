<script setup lang="ts">
import  { ref } from 'vue';
import headBar from '../components/headBar.vue';
import { mm1 } from '../utils/MM1';


const num_delays_required = ref(0);
const mean_interarrival_in= ref(0);
const mean_service_in   = ref(0);
const Average_delay = ref(0);
const Average_number = ref(0);
const Server_utilization = ref(0);
const simulation_ended = ref(0);


const updateResults = () => {
  [Average_delay.value, Average_number.value, Server_utilization.value, simulation_ended.value] = mm1(num_delays_required.value, mean_interarrival_in.value, mean_service_in.value);
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
        <div class="container">
            <p v-on:mouseover="handleMouseOver" v-on:mouseout="handleMouseOut">{{ text }}</p>
        <div class="input">
            <el-input v-model="num_delays_required" style="width: 240px" placeholder="num_delays_required" />
            <el-input v-model="mean_interarrival_in" style="width: 240px" placeholder="Please input" />
            <el-input v-model="mean_service_in" style="width: 240px" placeholder="Please input" />
        </div>
            <el-button type="primary"  @click="updateResults" >Calculate!</el-button>
        </div>
        <div class="container">
            <p>Average delay in queue: {{ Average_delay }}</p>
            <p>Average number in queue: {{ Average_number }}</p>
            <p>Server utilization: {{ Server_utilization }}</p>
            <p>Simulation ended: {{ simulation_ended }}</p>
        </div>
    </div>
</template>

<style scoped>
.container{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
}
.input{
    display: flex;
    flex-direction: column;
}


</style>

