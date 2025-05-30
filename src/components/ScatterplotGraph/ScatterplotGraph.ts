import * as d3 from 'd3'

export interface CyclistData {
    Time: string
    Place: number
    Seconds: number
    Name: string
    Year: number
    Nationality: string
    Doping: string
    URL: string
}

export async function drawChart(svgRef: SVGSVGElement | null) {
    if (!svgRef) return

    const res = await fetch('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json')
    const data: CyclistData[] = await res.json()

    const svg = d3.select(svgRef)
    const width = 900
    const height = 600
    const padding = 60

    const parseTime = (t: string) => {
        const [min, sec] = t.split(':').map(Number)
        return new Date(Date.UTC(1970, 0, 1, 0, min, sec))
    }

    const xScale = d3.scaleLinear()
        .domain([d3.min(data, d => d.Year)! - 1, d3.max(data, d => d.Year)! + 1])
        .range([padding, width - padding])

    const yScale = d3.scaleTime()
        .domain(d3.extent(data, d => parseTime(d.Time)) as [Date, Date])
        .range([height - padding, padding])

    svg.selectAll('*').remove() // Limpia SVG antes de dibujar

    svg.append('g')
        .attr('id', 'x-axis')
        .attr('transform', `translate(0, ${height - padding})`)
        .call(d3.axisBottom(xScale).tickFormat(d3.format('d')))

    const formatTick = (d: Date | d3.NumberValue) => {
        if (d instanceof Date) {
            return d3.timeFormat('%M:%S')(d)
        }
        return ''
    }

    svg.append('g')
        .attr('id', 'y-axis')
        .attr('transform', `translate(${padding}, 0)`)
        .call(d3.axisLeft(yScale).tickFormat(formatTick))

    const tooltip = d3.select('#tooltip')
        .style('position', 'absolute')
        .style('padding', '8px')
        .style('background', '#eee')
        .style('border', '1px solid #333')
        .style('border-radius', '4px')
        .style('pointer-events', 'none')

    svg.selectAll('.dot')
        .data(data)
        .enter()
        .append('circle')
        .attr('class', 'dot')
        .attr('cx', d => xScale(d.Year))
        .attr('cy', d => yScale(parseTime(d.Time)))
        .attr('r', 6)
        .attr('data-xvalue', d => d.Year.toString())
        .attr('data-yvalue', d => parseTime(d.Time).toISOString())
        .attr('fill', d => d.Doping ? 'red' : 'green')
        .on('mouseover', (event, d) => {
            tooltip.transition().duration(200).style('opacity', 0.9)
            tooltip.attr('data-year', d.Year.toString())
                .html(`
                <strong>${d.Name}</strong> (${d.Nationality})<br>
                Year: ${d.Year}, Time: ${d.Time}<br>
                ${d.Doping ? d.Doping : 'No doping allegations'}
            `)
                .style('left', event.pageX + 10 + 'px')
                .style('top', event.pageY - 40 + 'px')
        })
        .on('mouseout', () => tooltip.transition().duration(200).style('opacity', 0))
}
