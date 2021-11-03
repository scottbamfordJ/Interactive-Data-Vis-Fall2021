/* CONSTANTS AND GLOBALS */

var margin = {
  top: 10,
  right: 10,
  bottom: 20,
  left: 35
 }, Width = 900 - margin.left - margin.right, Height = 500 -margin.top - margin.bottom
var  margins = {
  top: 20, 
  right: 200,
  bottom: 40,
  left: 90
}, width = 900 - margins.left - margins.right,
height = 500 - margins.top - margins.bottom;
/* LOAD DATA */
d3.csv('CountryData.csv', d3.autoType)
  .then(data => {
    console.log(data)
    //console.log(data , d=> d.Average_Deaths)
    const svg = d3.select("#container")
      .append("svg")
      .attr("width", Width)
      .attr("height", Height)
      .style("background-color", "pink")
    const attributes = data.map(d => d.Name_Of_Region)
/* SCALES */
/** This is where you should define your scales from data to pixel space */
    const xScale = d3.scaleBand()
      .domain(attributes)
      .range([ margin.left, Width - margin.right - margin.left ])
      .paddingInner(.3);

    const yScale = d3.scaleLinear()
      .domain(d3.extent(data, d => d.Average_Deaths))
      .range([ Height - margin.bottom, margin.top ])
      .nice()
    xAxis = d3.axisBottom(xScale)
      .tickSizeOuter(0)
    yAxis = d3.axisLeft(yScale)
      .tickSizeOuter(0)

//     /* HTML ELEMENTS */
//     /** Select your container and append the visual elements to it */
    svg.selectAll(".bar")
      .data(data)
      .join("rect")
      .attr("class", "bar")
      .attr("x", d => xScale(d.Name_Of_Region))
      .attr("y", d => yScale(d.Average_Deaths))
      .attr("width", xScale.bandwidth())
      .attr("height", d => yScale(d.Average_Deaths))
    svg.append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0,${ Height - margin.bottom })`)
      .attr("dx", "1em")
      .call( xAxis )
    svg.append('g')
      .attr('class', 'y-axis')
      .attr('transform', `translate(${ margin.left },0)`)
      .call( yAxis )
})



var svg = d3.select("#container1")
  .append("svg")
    .attr("width", width + margins.left + margins.right)
    .attr("height", height + margins.top + margins.bottom)
  .append("g")
    .attr("transform", "translatee(" + margins.left + "," + margins.top + ")");
d3.csv("CountryData.csv", )
  .then(data =>  {

  var x = d3.scaleLinear()
    .domain(d3.extent(data, d => d.Average_Deaths))
    .range([margins.left, width - margins.right - margins.left]);
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
    .selectAll("text")
      .attr("transform", "translate(0,5)rotate(-45)")
      .style("text-anchor", "end")
  var y = d3.scaleBand()
    .range([height - margins.bottom, margins.top])
    .domain(data.map(function(d) {return d.Name_Of_Region}))
    .padding(.1);
  svg.selectAll("myRect")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", x(0))
    .attr("y", function(d) { return y(d.Name_Of_Region); })
    .attr("width", function(d) { return x(d.Average_Deaths); })
    .attr("height", y.bandwidth() )
    .attr("fill", "#69b3a2")
  svg.append("text")
    .attr("class", "y labels")
    .attr("text-anchor", "end")
    .attr("y", (function(d) {return x(d.Average_Deaths)}))
    .attr("y" , (function (d) { return y(d.Name_Of_Region);}))
    .text("Countries")
})

  

