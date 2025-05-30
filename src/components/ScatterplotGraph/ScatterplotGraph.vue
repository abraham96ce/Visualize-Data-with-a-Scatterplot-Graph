<template>
    <div>
        <h1 id="title">Doping in Professional Bicycle Racing</h1>
        <svg ref="svgRef" width="900" height="600"></svg>
        <div id="legend">
            <p><span style="color:red;">&#9679;</span> Doping Allegations</p>
            <p><span style="color:green;">&#9679;</span> No Doping Allegations</p>
        </div>
        <div id="tooltip" data-year="" style="opacity: 0;"></div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { drawChart } from './ScatterplotGraph'

const svgRef = ref<SVGSVGElement | null>(null)

onMounted(() => {
    drawChart(svgRef.value)
})
</script>

