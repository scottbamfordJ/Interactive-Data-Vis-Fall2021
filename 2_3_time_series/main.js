 /* CONSTANTS AND GLOBALS */
const width = 600,
  height = 600,
  margin = { top: 20, bottom: 50, left: 60, right: 60 };

/* LOAD DATA */
d3.csv('Country_Data_Year.csv', d => {
  return {
    year: new Date(+d.iyear, 0, 1),
    country_txt: d.country_txt,
    nkills: +d.nkill
  }
})
  .then(data => {
    console.log('data :>> ', data);

  // SCALES
  const xScale = d3.scaleTime()
    .domain(d3.extent(data, d => d.year))
    .range([margin.right, width - margin.left])
  
  const yScale = d3.scaleLinear()
    .domain(d3.extent(data, d => d.nkills))
    .range([height - margin.bottom, margin.top])
  
  
  // CREATE SVG ELEMENT
  const svg = d3.select("#container")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    // .style("background-color", "pink")
  // BUILD AND CALL AXES
  const xAxis = d3.axisBottom(xScale)
    .ticks(6)
  const xAxisGroup = svg.append("g")
    .attr("class", "xAxis")
    .attr("transform", `translate(${0}, ${height - margin.bottom})`)
    .call(xAxis)
  xAxisGroup.append("text")
    .attr("class", "text")
    .attr("transform", `translate(${width / 2}, ${35})`)
    .text("Year")

  const yAxis = d3.axisLeft(yScale)
    .ticks(20)

  const yAxisGroup = svg.append("g")
    .attr("class", "yAxis")
    .attr("transform", `translate(${margin.right}, ${0})`)
    .call(yAxis)

  yAxisGroup.append("text")
    .attr("class", 'yLabel')
    .attr("transform", `translate(${-45}, ${height / 2})`)
    .attr("writing-mode", 'vertical-rl')
    .text("Population")

  
  // LINE GENERATOR FUNCTION
  const lineGen = d3.line()
    .x(d => xScale(d.year))
    .y(d => yScale(d.nkills))

  const AreaGen = d3.area()
    .x(d => xScale(d.year))
    .y0(yScale(0))
    .y1(d => yScale(d.nkills))  
    
    
  const countriesMap = d3.group(data, d => d.country_txt)
  console.log('countriesMap:>> ', countriesMap);

  const countriesArray = Array.from(countriesMap)
  console.log('countriesArray :>> ', countriesArray);

  const countriesData =  countriesArray.map(([key, data]) => data)
  console.log('countriesData :>> ', countriesData);
  // DRAW LINE


  svg.selectAll(".trend")
    .data(countriesData)
    .join("path")
    .attr("class", "trend")
    .attr("stroke", "black")
    .attr("fill", "none")
    .attr("d", d => lineGen(d))
  svg.selectAll(".area")
    .data(countriesData)
    .join("path")
    .attr("class", ".area")
    .attr("stroke", "black")
    .attr("fill", "blue")
    .attr("d", d => AreaGen(d))
});