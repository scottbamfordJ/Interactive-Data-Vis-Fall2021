/* CONSTANTS AND GLOBALS */
const width = 600,
    height = 600,
    margin = 100,
    radius = 5;
/* LOAD DATA */
d3.csv("CountryData.csv", d3.autoType)
  .then(data => {
    console.log(data)

    const svg = d3.select("#container")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
    /* SCALES */
    const yScale = d3.scaleLinear()
      .domain(d3.extent(data, d => d.Number_Of_Attacks)).nice()
      .range([height - margin, margin])

    const xScale = d3.scaleLinear()
      .domain(d3.extent(data, d => d.Number_Of_Deaths))
      .range([margin, width - margin])
      .nice()
    const rScale = d3.scaleLinear()
      .domain(d3.extent(data, d => d.Average_Deaths))
      .range([1,10])
    console.log(yScale(4));

    const colorScale = d3.scaleOrdinal()
      .domain(data.map(d => d.Name_Of_Region))
      .range(d3.schemeSet3);
      /* HTML ELEMENTS */
    svg.selectAll("mydots")
      .data(data)
      .enter()
      .append("circle")
        .attr("cx",200)
        .attr("cy", function (d,i){ return 45 + i*25})
        .attr("r", 6)
        .style("fill", d => colorScale(d.Name_Of_Region))
    svg.selectAll(".dot")
      .data(data)
      .join("circle")
      .attr("class", "dot")
      .attr("cx", d => xScale(d.Number_Of_Deaths))
      .attr("cy", d => yScale(d.Number_Of_Attacks))
      .attr("r", d => rScale(d.Average_Deaths))
      .style("fill", d => colorScale(d.Name_Of_Region))

  
    svg.selectAll("mylabels")
      .data(data)
      .enter()
      .append("text")
        .attr("x", 300)
        .attr("y", function (d,i) {return 50 + i * 25})
        .style("function", function(d) {return colorScale(d)})
        .text(function(d) { return d.Name_Of_Region})
        .attr("text-anchor", "middle")
        .style("alignment-baseline", "middle")
      svg.append("g")
      .attr("class", "x-axis")
      .style("transform", `translate(0px,${height - margin}px)`)
      .call(d3.axisBottom(xScale))
      svg.append("g")
        .attr("class", "y-axis")
        .style("transform", `translate(${margin}px,0px)`)
        .call(d3.axisLeft(yScale))
      svg.append("text")
        .attr("class", "x label") 
        .attr("text-anchor", "middle") 
        .attr("x", 300)
        .attr("y", height - 50)
        .text("Number of Terrorist Attack Deaths")
      svg.append("text")
        .attr("class", "y label") 
        .attr("text-anchor", "middle") 
        .attr("x", -width /2)
        .attr("y", 20) 
        .attr("dy", ".75em")
        .attr('transform', 'rotate(-90)')
        .text("Number of Terrorist Attacks ")
;
  });
