<script setup lang="ts">
import { ref } from 'vue'
import headBar from '@/components/headBar.vue';
import { inv,initialize,reportmystaff } from '@/utils/inv';
import { resetzrng } from '@/utils/randnumber';
const text = ref('Inventory System');
const handleMouseOver = () => {
    text.value = 'made by 熊志鹏、吴秋尧';
};
const handleMouseOut = () => {
    text.value = 'Inventory System';
};
const result = ref<number[][] | null>(null);
const myresult = ref<number[][] | null>(null);
const Calculate = () => {

    initial_inv_level.value = Number(initial_inv_level.value);
    mean_interdemand.value = Number(mean_interdemand.value);
    num_months.value = Number(num_months.value);
    num_values_demand.value = Number(num_values_demand.value);
    setup_cost.value = Number(setup_cost.value);
    incremental_cost.value = Number(incremental_cost.value);
    holding_cost.value = Number(holding_cost.value);
    shortage_cost.value = Number(shortage_cost.value);
    minlag.value = Number(minlag.value);
    maxlag.value = Number(maxlag.value);
    value1.value = Number(value1.value);
    value2.value = Number(value2.value);
    min_shelf_life.value = Number(min_shelf_life.value);
    max_shelf_life.value = Number(max_shelf_life.value);
    if (tableData1.value.length === 0) {
    for(let i=-1;i<value2.value;i++){
        if(checked.value==false)initialize(initial_inv_level.value, mean_interdemand.value, num_months.value, num_values_demand.value, setup_cost.value, incremental_cost.value, holding_cost.value, shortage_cost.value, minlag.value, maxlag.value,value1.value);
        else {initialize(initial_inv_level.value, mean_interdemand.value, num_months.value, num_values_demand.value, setup_cost.value, incremental_cost.value, holding_cost.value, shortage_cost.value, minlag.value, maxlag.value,value1.value,min_shelf_life.value,max_shelf_life.value);
        }
        let rawResult=inv(9);

        if(checked.value==true)myresult.value = reportmystaff();
        result.value = rawResult.map(subArray => subArray.map(num => parseFloat(num.toFixed(4))));
        // let resultValue = rawResult.map(subArray => subArray.map(num => parseFloat(num.toFixed(6))));
        let resultValue = {
            small1: rawResult[0][0].toFixed(4),
            big1: rawResult[1][0].toFixed(4),
            avg_ordering_cost1: rawResult[2][0].toFixed(4),
            avg_holding_cost1: rawResult[3][0].toFixed(4),
            avg_shortage_cost1: rawResult[4][0].toFixed(4),
            total_cost1: rawResult[5][0].toFixed(4),
            express_order_num1: rawResult[6][0].toFixed(4),
            small2: rawResult[0][1].toFixed(4),
            big2: rawResult[1][1].toFixed(4),
            avg_ordering_cost2: rawResult[2][1].toFixed(4),
            avg_holding_cost2: rawResult[3][1].toFixed(4),
            avg_shortage_cost2: rawResult[4][1].toFixed(4),
            total_cost2: rawResult[5][1].toFixed(4),
            express_order_num2: rawResult[6][1].toFixed(4),
            small3: rawResult[0][2].toFixed(4),
            big3: rawResult[1][2].toFixed(4),
            avg_ordering_cost3: rawResult[2][2].toFixed(4),
            avg_holding_cost3: rawResult[3][2].toFixed(4),
            avg_shortage_cost3: rawResult[4][2].toFixed(4),
            total_cost3: rawResult[5][2].toFixed(4),
            express_order_num3: rawResult[6][2].toFixed(4),
            small4: rawResult[0][3].toFixed(4),
            big4: rawResult[1][3].toFixed(4),
            avg_ordering_cost4: rawResult[2][3].toFixed(4),
            avg_holding_cost4: rawResult[3][3].toFixed(4),
            avg_shortage_cost4: rawResult[4][3].toFixed(4),
            total_cost4: rawResult[5][3].toFixed(4),
            express_order_num4: rawResult[6][3].toFixed(4),
            small5: rawResult[0][4].toFixed(4),
            big5: rawResult[1][4].toFixed(4),
            avg_ordering_cost5: rawResult[2][4].toFixed(4),
            avg_holding_cost5: rawResult[3][4].toFixed(4),
            avg_shortage_cost5: rawResult[4][4].toFixed(4),
            total_cost5: rawResult[5][4].toFixed(4),
            express_order_num5: rawResult[6][4].toFixed(4),
            small6: rawResult[0][5].toFixed(4),
            big6: rawResult[1][5].toFixed(4),
            avg_ordering_cost6: rawResult[2][5].toFixed(4),
            avg_holding_cost6: rawResult[3][5].toFixed(4),
            avg_shortage_cost6: rawResult[4][5].toFixed(4),
            total_cost6: rawResult[5][5].toFixed(4),
            express_order_num6: rawResult[6][5].toFixed(4),
            small7: rawResult[0][6].toFixed(4),
            big7: rawResult[1][6].toFixed(4),
            avg_ordering_cost7: rawResult[2][6].toFixed(4),
            avg_holding_cost7: rawResult[3][6].toFixed(4),
            avg_shortage_cost7: rawResult[4][6].toFixed(4),
            total_cost7: rawResult[5][6].toFixed(4),
            express_order_num7: rawResult[6][6].toFixed(4),
            small8: rawResult[0][7].toFixed(4),
            big8: rawResult[1][7].toFixed(4),
            avg_ordering_cost8: rawResult[2][7].toFixed(4),
            avg_holding_cost8: rawResult[3][7].toFixed(4),
            avg_shortage_cost8: rawResult[4][7].toFixed(4),
            total_cost8: rawResult[5][7].toFixed(4),
            express_order_num8: rawResult[6][7].toFixed(4),
            small9: rawResult[0][8].toFixed(4),
            big9: rawResult[1][8].toFixed(4),
            avg_ordering_cost9: rawResult[2][8].toFixed(4),
            avg_holding_cost9: rawResult[3][8].toFixed(4),
            avg_shortage_cost9: rawResult[4][8].toFixed(4),
            total_cost9: rawResult[5][8].toFixed(4),
            express_order_num9: rawResult[6][8].toFixed(4),
        };
        tableData2.value.push(resultValue);
        }
    }
    else {
    tableData1.value.forEach(item => {
        for(let i = 0; i < value2.value; i++){
            if(checked.value==false)
            initialize(initial_inv_level.value, mean_interdemand.value, num_months.value, num_values_demand.value, setup_cost.value, incremental_cost.value, holding_cost.value, shortage_cost.value, minlag.value, maxlag.value,item.value);
            else {initialize(initial_inv_level.value, mean_interdemand.value, num_months.value, num_values_demand.value, setup_cost.value, incremental_cost.value, holding_cost.value, shortage_cost.value, minlag.value, maxlag.value,item.value,min_shelf_life.value,max_shelf_life.value);
            }
                let rawResult=inv(9);
                if(checked.value==true)myresult.value = reportmystaff();
            result.value = rawResult.map(subArray => subArray.map(num => parseFloat(num.toFixed(4))));
            // let resultValue = rawResult.map(subArray => subArray.map(num => parseFloat(num.toFixed(6))));
            let resultValue = {
                small1: rawResult[0][0].toFixed(4),
                big1: rawResult[1][0].toFixed(4),
                avg_ordering_cost1: rawResult[2][0].toFixed(4),
                avg_holding_cost1: rawResult[3][0].toFixed(4),
                avg_shortage_cost1: rawResult[4][0].toFixed(4),
                total_cost1: rawResult[5][0].toFixed(4),
                express_order_num1: rawResult[6][0].toFixed(4),
                small2: rawResult[0][1].toFixed(4),
                big2: rawResult[1][1].toFixed(4),
                avg_ordering_cost2: rawResult[2][1].toFixed(4),
                avg_holding_cost2: rawResult[3][1].toFixed(4),
                avg_shortage_cost2: rawResult[4][1].toFixed(4),
                total_cost2: rawResult[5][1].toFixed(4),
                express_order_num2: rawResult[6][1].toFixed(4),
                small3: rawResult[0][2].toFixed(4),
                big3: rawResult[1][2].toFixed(4),
                avg_ordering_cost3: rawResult[2][2].toFixed(4),
                avg_holding_cost3: rawResult[3][2].toFixed(4),
                avg_shortage_cost3: rawResult[4][2].toFixed(4),
                total_cost3: rawResult[5][2].toFixed(4),
                express_order_num3: rawResult[6][2].toFixed(4),
                small4: rawResult[0][3].toFixed(4),
                big4: rawResult[1][3].toFixed(4),
                avg_ordering_cost4: rawResult[2][3].toFixed(4),
                avg_holding_cost4: rawResult[3][3].toFixed(4),
                avg_shortage_cost4: rawResult[4][3].toFixed(4),
                total_cost4: rawResult[5][3].toFixed(4),
                express_order_num4: rawResult[6][3].toFixed(4),
                small5: rawResult[0][4].toFixed(4),
                big5: rawResult[1][4].toFixed(4),
                avg_ordering_cost5: rawResult[2][4].toFixed(4),
                avg_holding_cost5: rawResult[3][4].toFixed(4),
                avg_shortage_cost5: rawResult[4][4].toFixed(4),
                total_cost5: rawResult[5][4].toFixed(4),
                express_order_num5: rawResult[6][4].toFixed(4),
                small6: rawResult[0][5].toFixed(4),
                big6: rawResult[1][5].toFixed(4),
                avg_ordering_cost6: rawResult[2][5].toFixed(4),
                avg_holding_cost6: rawResult[3][5].toFixed(4),
                avg_shortage_cost6: rawResult[4][5].toFixed(4),
                total_cost6: rawResult[5][5].toFixed(4),
                express_order_num6: rawResult[6][5].toFixed(4),
                small7: rawResult[0][6].toFixed(4),
                big7: rawResult[1][6].toFixed(4),
                avg_ordering_cost7: rawResult[2][6].toFixed(4),
                avg_holding_cost7: rawResult[3][6].toFixed(4),
                avg_shortage_cost7: rawResult[4][6].toFixed(4),
                total_cost7: rawResult[5][6].toFixed(4),
                express_order_num7: rawResult[6][6].toFixed(4),
                small8: rawResult[0][7].toFixed(4),
                big8: rawResult[1][7].toFixed(4),
                avg_ordering_cost8: rawResult[2][7].toFixed(4),
                avg_holding_cost8: rawResult[3][7].toFixed(4),
                avg_shortage_cost8: rawResult[4][7].toFixed(4),
                total_cost8: rawResult[5][7].toFixed(4),
                express_order_num8: rawResult[6][7].toFixed(4),
                small9: rawResult[0][8].toFixed(4),
                big9: rawResult[1][8].toFixed(4),
                avg_ordering_cost9: rawResult[2][8].toFixed(4),
                avg_holding_cost9: rawResult[3][8].toFixed(4),
                avg_shortage_cost9: rawResult[4][8].toFixed(4),
                total_cost9: rawResult[5][8].toFixed(4),
                express_order_num9: rawResult[6][8].toFixed(4),
            };
            tableData2.value.push(resultValue);
            }
        });
    }
};
const reset = () => {
    resetzrng();
};

const initial_inv_level = ref(60);
const mean_interdemand = ref(0.1);
const num_months = ref(120);
const num_values_demand = ref(4);
const setup_cost = ref(32.0);
const incremental_cost = ref(3.0);
const holding_cost = ref(1.0);
const shortage_cost = ref(5.0);
const minlag = ref(0.5);
const maxlag = ref(1.0);

const value1 = ref(0);
const value2 = ref(0);


const tableData1 = ref<Array<{ value: number }>>([]);
const tableData2 = ref<Array<{ value: number }>>([]);
const add = () => {
    const newValue = value1.value;
    tableData1.value.push({ value: newValue });
}
const clear = () => {
    tableData1.value = [];
    tableData2.value = [];
}

const checked = ref(false);
const min_shelf_life = ref(1.5);
const max_shelf_life = ref(2.5);


</script>


<template>
    <div>
        <headBar />
        <div style="display: flex;    
        flex-direction: column;
        justify-content: center;
        align-items: center; ">
        <div class="container" style="width:600px">
        <p v-on:mouseover="handleMouseOver" v-on:mouseout="handleMouseOut">{{ text }}</p>
        <div style="display: flex;">
            <p style="margin-left: 20px;">initial_inv_level</p>
            <el-input v-model.number="initial_inv_level" style="width: 240px; height: 40px; margin-top: 10px; margin-left: 40px; margin-right: 10px;" placeholder="initial_inv_level" />
        </div>
        <div style="display: flex;">
            <p>mean_interdemand</p>
            <el-input v-model.number="mean_interdemand" style="width: 240px; height: 40px; margin-top: 10px; margin-left: 15px;" placeholder="mean_interdemand" />
        </div>
        <div style="display: flex;">
            <p style="margin-left: 15px;">num_months</p>
            <el-input v-model.number="num_months" style="width: 240px; height: 40px; margin-top: 10px; margin-left: 45px;" placeholder="num_months" />
        </div>
        <div style="display: flex;">
            <p>num_values_demand</p>
            <el-input v-model.number="num_values_demand" style="width: 240px; height: 40px; margin-top: 10px; margin-left: 10px; margin-right: 5px;" placeholder="num_values_demand" />
        </div>
        <div style="display: flex;">
            <p style="margin-left: 25px;">setup_cost</p>
            <el-input v-model.number="setup_cost" style="width: 240px; height: 40px; margin-top: 10px; margin-left: 55px;" placeholder="setup_cost" />
        </div>
        <div style="display: flex;">
            <p>incremental_cost</p>
            <el-input v-model.number="incremental_cost" style="width: 240px; height: 40px; margin-top: 10px; margin-left: 30px;" placeholder="incremental_cost" />
        </div>
        <div style="display: flex;">
            <p style="margin-left: 10px;">holding_cost</p>
            <el-input v-model.number="holding_cost" style="width: 240px; height: 40px; margin-top: 10px; margin-left: 48px;" placeholder="holding_cost" />
        </div>
        <div style="display: flex;">
            <p style="margin-left: 5px;">shortage_cost</p>
            <el-input v-model.number="shortage_cost" style="width: 240px; height: 40px; margin-top: 10px; margin-left: 45px;" placeholder="shortage_cost" />
        </div>
        <div style="display: flex;">
            <p style="margin-left: 30px;">minlag</p>
            <el-input v-model="minlag" style="width: 240px; height: 40px; margin-top: 10px; margin-left: 70px;" placeholder="minlag" />
        </div>
        <div style="display: flex;">
            <p style="margin-left: 30px;">maxlag</p>
            <el-input v-model="maxlag" style="width: 240px; height: 40px; margin-top: 10px; margin-left: 70px;" placeholder="maxlag" />
        </div>
        <div style="margin-top: 20px;margin-bottom: 20px;">
        <el-button type="primary" @click="Calculate">Calculate</el-button>
        <el-button type="primary" @click="reset">Reset</el-button>
        <el-button type="primary" @click="add">add</el-button>
        <el-button type="primary" @click="clear">clear</el-button>
        </div>
        <el-checkbox v-model="checked" label="perishable time" size="large" border />

        <div v-if="checked" style="display: flex;">
            <p style="margin-left: 20px;">min_shelf_life</p>
            <el-input v-model="min_shelf_life" style="width: 240px; height: 40px; margin-top: 10px; margin-left: 40px; margin-right: 10px;" placeholder="min_shelf_life" />
        </div>
        <div v-if="checked" style="display: flex;">
            <p style="margin-left: 20px;">max_shelf_life</p>
            <el-input v-model="max_shelf_life" style="width: 240px; height: 40px; margin-top: 10px; margin-left: 40px; margin-right: 10px;" placeholder="max_shelf_life" />
        </div>

        <div v-if="result && result.length > 0">
            <div>Smalls : {{ result[0] }}</div>
            <div>Bigs : {{ result[1] }}</div>
            <div>Avg_ordering_cost : {{ result[2] }}</div>
            <div>Avg_holding_cost : {{ result[3] }}</div>
            <div>Avg_shortage_cost : {{ result[4] }}</div>
            <div>total_cost : {{ result[5] }}</div>
            <div>Express_order_num : {{ result[6] }}</div>
        </div>
        <div v-if="myresult && myresult.length > 0">
            <div>sum_spoiled_numArray : {{ myresult[0] }}</div>
            <div>ratioArray : {{ myresult[1] }}</div>
        </div>

        <el-table :data="tableData1" style="width: 30%">
            <el-table-column prop="value" label="Date" />
        </el-table>
        <div class="slider-demo-block">
            <span class="demonstration">做几次</span>
            <el-slider v-model.number="value2" />
        </div>
        <div class="slider-demo-block">
            <span class="demonstration">随机数选择</span>
            <el-slider v-model.number="value1" />
        </div>
        </div>
        <el-table :data="tableData2" style="width: 80%;margin-top: 80px;">
            <el-table-column prop="small1" label="small1" />
            <el-table-column prop="big1" label="big1" />
            <el-table-column prop="avg_ordering_cost1" label="avg_ordering_cost1" />
            <el-table-column prop="avg_holding_cost1" label="avg_holding_cost1" />
            <el-table-column prop="avg_shortage_cost1" label="avg_shortage_cost1" />
            <el-table-column prop="total_cost1" label="total_cost1" />
            <el-table-column prop="express_order_num1" label="express_order_num1" />
            <el-table-column prop="small2" label="small2" />
            <el-table-column prop="big2" label="big2" />
            <el-table-column prop="avg_ordering_cost2" label="avg_ordering_cost2" />
            <el-table-column prop="avg_holding_cost2" label="avg_holding_cost2" />
            <el-table-column prop="avg_shortage_cost2" label="avg_shortage_cost2" />
            <el-table-column prop="total_cost2" label="total_cost2" />
            <el-table-column prop="express_order_num2" label="express_order_num2" />
        </el-table>
        <el-table :data="tableData2" style="width: 80%;margin-top: 80px;">
            <el-table-column prop="small3" label="small3" />
            <el-table-column prop="big3" label="big3" />
            <el-table-column prop="avg_ordering_cost3" label="avg_ordering_cost3" />
            <el-table-column prop="avg_holding_cost3" label="avg_holding_cost3" />
            <el-table-column prop="avg_shortage_cost3" label="avg_shortage_cost3" />
            <el-table-column prop="total_cost3" label="total_cost3" />
            <el-table-column prop="express_order_num3" label="express_order_num3" />
            <el-table-column prop="small4" label="small4" />
            <el-table-column prop="big4" label="big4" />
            <el-table-column prop="avg_ordering_cost4" label="avg_ordering_cost4" />
            <el-table-column prop="avg_holding_cost4" label="avg_holding_cost4" />
            <el-table-column prop="avg_shortage_cost4" label="avg_shortage_cost4" />
            <el-table-column prop="total_cost4" label="total_cost4" />
            <el-table-column prop="express_order_num4" label="express_order_num4" />
        </el-table>
        <el-table :data="tableData2" style="width: 80%;margin-top: 80px;">
            <el-table-column prop="small5" label="small5" />
            <el-table-column prop="big5" label="big5" />
            <el-table-column prop="avg_ordering_cost5" label="avg_ordering_cost5" />
            <el-table-column prop="avg_holding_cost5" label="avg_holding_cost5" />
            <el-table-column prop="avg_shortage_cost5" label="avg_shortage_cost5" />
            <el-table-column prop="total_cost5" label="total_cost5" />
            <el-table-column prop="express_order_num5" label="express_order_num5" />
            <el-table-column prop="small6" label="small6" />
            <el-table-column prop="big6" label="big6" />
            <el-table-column prop="avg_ordering_cost6" label="avg_ordering_cost6" />
            <el-table-column prop="avg_holding_cost6" label="avg_holding_cost6" />
            <el-table-column prop="avg_shortage_cost6" label="avg_shortage_cost6" />
            <el-table-column prop="total_cost6" label="total_cost6" />
            <el-table-column prop="express_order_num6" label="express_order_num6" />
        </el-table>
        <el-table :data="tableData2" style="width: 80%;margin-top: 80px;">
            <el-table-column prop="small7" label="small7" />
            <el-table-column prop="big7" label="big7" />
            <el-table-column prop="avg_ordering_cost7" label="avg_ordering_cost7" />
            <el-table-column prop="avg_holding_cost7" label="avg_holding_cost7" />
            <el-table-column prop="avg_shortage_cost7" label="avg_shortage_cost7" />
            <el-table-column prop="total_cost7" label="total_cost7" />
            <el-table-column prop="express_order_num7" label="express_order_num7" />
            <el-table-column prop="small8" label="small8" />
            <el-table-column prop="big8" label="big8" />
            <el-table-column prop="avg_ordering_cost8" label="avg_ordering_cost8" />
            <el-table-column prop="avg_holding_cost8" label="avg_holding_cost8" />
            <el-table-column prop="avg_shortage_cost8" label="avg_shortage_cost8" />
            <el-table-column prop="total_cost8" label="total_cost8" />
            <el-table-column prop="express_order_num8" label="express_order_num8" />
            <el-table-column prop="small9" label="small9" />
            <el-table-column prop="big9" label="big9" />
            <el-table-column prop="avg_ordering_cost9" label="avg_ordering_cost9" />
            <el-table-column prop="avg_holding_cost9" label="avg_holding_cost9" />
            <el-table-column prop="avg_shortage_cost9" label="avg_shortage_cost9" />
            <el-table-column prop="total_cost9" label="total_cost9" />
            <el-table-column prop="express_order_num9" label="express_order_num9" />
        </el-table>
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
.slider-demo-block {
  max-width: 600px;
  min-width: 400px;
  display: flex;
  align-items: center;
}
.slider-demo-block .el-slider {
  margin-top: 0;
  margin-left: 12px;
}
.slider-demo-block .demonstration {
  font-size: 14px;
  color: var(--el-text-color-secondary);
  line-height: 44px;
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 0;
}
.slider-demo-block .demonstration + .el-slider {
  flex: 0 0 70%;
}


</style>


