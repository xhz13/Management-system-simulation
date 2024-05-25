<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
const turnThrowCoins = () => {
  router.push('/throwCoins')
}
const turnSingleServer = () => {
  router.push('/singleServer')
}
const turnInventorySystem = () =>{
  
}
</script>

<template>
    <div class="head">
        <el-button type="primary"  @click="turnThrowCoins">抛硬币</el-button>
        <el-button type="primary"  @click="turnSingleServer">排队</el-button>
        <el-button type="primary"  @click="turnInventorySystem">库存</el-button>
    </div>
</template>


<style scoped>
.head {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 120px; /* 这将使 .throwcoins 元素的高度等于视口的高度 */
}
</style>