/* CONSTANTS AND GLOBALS */
const width = 900,
  height = 700,
  margin = 20,
  radius = 1;

/* LOAD DATA */
d3.csv("UniqueTerroristGroups.csv", d3.autoType)
  .then(data => {
    console.log(data)
    console.log(data, d => d[5])

    const svg = d3.select("#container")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .style("background-color", "pink")
    /* SCALES */
    const xScale = d3.scaleLinear()
      .domain(d3.extent(data, d=> d.Number_Of_Attacks))
      .range([margin, width - margin])
      .nice()
    console.log('xScale.range() :>> ', xScale.range())
    const yScale = d3.scaleLinear()
      .domain(d3.extent(data, d=> d.Number_Of_Deaths))
      .range([height - margin, margin])
    
    // const colorScale = d3.scaleOrdinal()
    //   .domain(data.map(d => d.Terrorist_Organization))
    //   .range(["green", "blue", "purple", "white", "black", "red", ])
    /* HTML ELEMENTS */
    svg.selectAll(".dot")
      .data(data)
      .join("circle")
      .attr("class", "dot")
      .attr("cs", d => xScale(d.Number_Of_Attacks))
      .attr("cy", d => yScale(d.Number_of_Deaths))
      .attr("r", radius)
      //.style("fill", d => colorScale(d.Terrorist_Organization))
    svg.append("g")
      .attr("class", "x-axis")

  });
