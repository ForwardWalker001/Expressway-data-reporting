<template>
    <div class="content">
        <echarts-line></echarts-line>
        <echarts-pip></echarts-pip>
        <!-- 首页信息 -->
    </div>
</template>

<script>
import EchartsLine from '../view/Echarts_line.vue'
import EchartsPip from '../view/Echarts_pip.vue'
export default {
    components: { EchartsLine, EchartsPip}
}
</script>
<style scoped>
.content {
    display: flex;
    justify-content: space-around;
    margin-top: 50px;
}
</style>