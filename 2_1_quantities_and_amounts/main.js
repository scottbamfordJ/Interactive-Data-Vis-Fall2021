/* CONSTANTS AND GLOBALS */
const width  = 900
const height  = 500
margin = ({
  top: 10,
  right: 10,
  bottom: 20,
  left: 35
})

/* LOAD DATA */
d3.csv('CountryData.csv', d3.autoType)
  .then(data => {
    console.log(data)
    //console.log(data , d=> d.Average_Deaths)
    const svg = d3.select("#container")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .style("background-color", "pink")
    const attributes = data.map(d => d.Name_Of_Region)
/* SCALES */
/** This is where you should define your scales from data to pixel space */
    const xScale = d3.scaleBand()
      .domain(attributes)
      .range([ margin.left, width - margin.right - margin.left ])
      .paddingInner(.3);

    const yScale = d3.scaleLinear()
      .domain(d3.extent(data, d => d.Average_Deaths))
      .range([ height - margin.bottom, margin.top ])
      .nice()
    xAxis = d3.axisBottom(xScale)
      .tickSizeOuter(0)
    yAxis = d3.axisLeft(yScale)
      .tickSizeOuter(0)
//["Central America","Southeast Asia", "North America", "South America", "Western Europe", "Sub-Saharan Africa", "Middle East & North Africa", "East Asia", "Australasia & Oceania", "South Asia", "Central Asia"]
    // console.log('xScale("Western Europe") :>>', xScale("Western Europe"));
    // console.log('xScale("Southeast Asia") :>>', xScale("Southeast Asia"));
    // console.log('xScale("Central America & Caribbean") :>>', xScale("Central America & Caribbean"));
    
//     /* HTML ELEMENTS */
//     /** Select your container and append the visual elements to it */
    svg.selectAll(".bar")
      .data(data)
      .join("rect")
      .attr("class", "bar")
      .attr("x", d => xScale(d.Name_Of_Region))
      .attr("y", d => yScale(d.Average_Deaths))
      .attr("width", xScale.bandwidth())
      .attr("height", d => yScale(0) - yScale(d.Average_Deaths))
    // svg.append("g")
    //   .attr("class", "axis axis --x")
    //   .attr("transform", "translat(0, " + 600 + ")")
    //   .call(d3.axisBottom(xScale))
    //   .attr("dx", "-.25em")
    //   .attr("transform", "rotate(-90")
    svg.append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0,${ height - margin.bottom })`)
      .attr("dx", "1em")
      .call( xAxis )
    svg.append('g')
      .attr('class', 'y-axis')
      .attr('transform', `translate(${ margin.left },0)`)
      .call( yAxis )
    // svg.selectAll(".text")
    //   .data(data)
    //   .enter()
    //   .append("text")
    //   .attr("clss", "label")
    //   .attr("x", (function(d) {return xScale(d.Name_Of_Region); } ))
    //   .attr("y", (function (d) { return yScale(d.Average_Deaths) - 20 ; } ))
    //   .attr("dx", "-.25em")
    //   .attr("dy", ".25em")
    //   .attr("transform", "rotate(-90)" )
    //   .text(function(d) {return [d.Name_Of_Region]})
  

    // svg.append("text")
    //   .attr("class", "x label")
    //   .attr("text-ancor", "end")
    //   .attr("x", (function(d) {return xScale(d.Name_Of_Region); })
    //   .attr("y", (function (d) { return yScale(d.Average_Deaths) - 20; })
    //   .text("Countries")




})

    

//     const table = d3.select("#container")
//       .append("table")
    
    
//     const rows = table
//       .selectAll(".row")
//       .data(data)
//       .join("tr")
//       .attr("class", "row")

//     const cells = rows
//       .selectAll(".cell")
//       .data(d => Object.values(d))
//       .join("td")
//       .text(d => d)
//   })

// const svg = d3.select("svg")
// const xScale = d3.scaleLinear()
//   .domain([0,1])
//   .range([0, width])
// const yScale = d3.scaleLinear()
//   .domain([0,1])
//   .range([height, 0])
// const xAxis = (g) => g
//   .attr('transform', 'translate(0,${height})')
//   .call(d3.axisBottom(xScale))
// const yAxis = (g) => g 
//   .call(d3.axisLeft(yScale))
// svg.append("g")
//   .call(xAxis);
// svg.append("g")
//   .call(yAxis)


    

  

