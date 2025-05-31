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
// Importa funciones reactivas y de ciclo de vida desde Vue
import { ref, onMounted } from 'vue'
// Importa la función que construye el gráfico con D3
import { drawChart } from './ScatterplotGraph'

// Crea una referencia al elemento SVG donde se dibujará el gráfico.
// Se usa ref para poder acceder al elemento del DOM una vez montado.
const svgRef = ref<SVGSVGElement | null>(null)

/**
 * Hook del ciclo de vida `onMounted`.
 * 
 * Este hook se ejecuta automáticamente cuando el componente ha sido montado
 * en el DOM. Es el momento adecuado para iniciar lógica que dependa del DOM,
 * como operaciones con D3.js.
 * 
 * En este caso, `drawChart(svgRef.value)` se llama justo después de que el
 * componente se ha montado, garantizando que el SVG esté presente y accesible.
 */
onMounted(() => {
    drawChart(svgRef.value)
})
</script>

