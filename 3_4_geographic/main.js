/**
 * CONSTANTS AND GLOBALS
 * */
 const width = 1000,
    height = 800,
    margin = { top: 20, bottom: 50, left: 60, right: 40 };

let svg, 
    hoverBox,
    svg2;
let xScale;
let yScale;
let xAxis;
let xAxisGroup;
let yAxis;
let yAxisGroup;
let colorScale
/**
* APPLICATION STATE
* */

let state = {
    geojson: [],
    terrorist_state_data: [],
    all_attacks: [],
    selected_state: "Select A State"
    };

/**
* LOAD DATA
* Using a Promise.all([]), we can load more than one dataset at a time
* */
Promise.all([
 d3.json("../data/usState.json"),
 d3.csv("../Project/Data/State_Data.csv"),
 d3.csv("../Project/Data/UnitedStatesTerrorism.csv")
]).then(([geojson, terrorist_state_data, full_data]) => {
 state.geojson = geojson
 state.terrorist_state_data = terrorist_state_data
 state.full_data = full_data
//  console.log("state: ", state);
 init();
});

/**
* INITIALIZING FUNCTION
* this will be run *one time* when the data finishes loading in
* */
function init() {
 const colorScale = d3.scaleSequential()
    .interpolator(d3.interpolateOrRd)
    .domain(d3.extent(state.terrorist_state_data, d=> d['number_of_attacks']))
const attacksLookup = new Map(state.terrorist_state_data.map(d=> [
    d['States'], d['number_of_attacks']
]))

const statelookup = new Map(state.full_data.map(d=> [d['province'] , d['iyear']]))

console.log('statelookup :>>', statelookup);
svg = d3.select("#container")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
hoverBox = d3.select("#hover-content")

const projection = d3.geoAlbersUsa()
    .fitSize([width, height], state.geojson)
const projections_world_to_state = d3.geoAlbersUsa()
    .translate([width, height])
    .scale(500)
const pathGen = d3.geoPath().projection(projection);


const usSates = svg.selectAll("path.state")
    .data(state.geojson.features)
    .join("path")
    .attr("class", "state")
    .attr("d", d => pathGen(d))
    .attr("fill", (d, i) => {
        // console.log(d)
        return colorScale(+attacksLookup.get(d.properties.NAME))
    })
const storage = state.full_data
console.log(storage)
usSates.on("click", (ev, d) => {
    state.click_state = d.properties.NAME
    state.click_info = storage.filter(function(d){
        return d.provstate == state.click_state
    });
    console.log(state.click_state)
    console.log(state.click_info)
    draw();
})


// usSates.on("mousemove", (ev, d) => {
//     console.log(d)
//     state.hover_state = d.properties.NAME
//     state.hover_attacks = attacksLookup.get(d.properties.NAME) 
//     draw();
// })

svg.on("mousemove", (ev) => {
    const [mx, my] = d3.pointer(ev)
    state.x = ev.clientX;
    state.y = ev.clientY;
    state.latitude = projection.invert([mx,my])[0];
    state.longitude = projection.invert([mx, my])[1];
    draw()
})
// Drop Down Idea
// const test2 = "California"
// tests = [...new Set(state.full_data.map(d => d.provstate))]
// console.log(tests)

// const selectElement = d3.select("#dropdown")
// let unique_outputs = [...new Set(state.full_data.map(d => d.provstate))]
// xScale = d3.scaleLinear()
//     .domain(d3.extent(state.data, d => d.ideologyScore2020))
//     .range([20, width - 20])

// yScale = d3.scaleLinear()
//     .domain(d3.extent(state.data, d => d.envScore2020))
//     .range([height - 20, 20])

// xAxis = d3.axisBottom(xScale)
// yAxis = d3.axisLeft(yScale)

// console.log(unique_outputs)
// selectElement
//     .selectAll("options")
//     .data(unique_outputs)
//     .join("option")
//     .attr("value", d => d)
//     .text(d => d)
// selectElement.on("change", event =>{
//     state.selectedParty = event.target.value
//     draw();
// })
// svg1 = d3.select("#bargraph")
//     .append("svg")
//     .attr("width", width)
//     .attr("height", height)
// xAxisGroup = svg1.append("g")
//     .attr("class", 'xAxis')
//     .attr("transform", `translate(${0}, ${height - 20})`) // move to the bottom
//     .call(xAxis)

//   yAxisGroup = svg.append("g")
//     .attr("class", 'yAxis')
//     .attr("transform", `translate(${20}, ${0})`) // align with left margin
//     .call(yAxis)
 draw(); // calls the draw function
}

/**
* DRAW FUNCTION
* we call this every time there is an update to the data/state
* */
function draw() {
    hoverBox
        .style("top", state.y + "px")
        .style("left", state.x + "px")
        .html(
            `<div>US State: ${state.hover_state}</div>
            <div>Number of Attacks: ${state.hover_attacks}</div>`
          )
    
}   



/** 
 * Creating New BarChart Which shows the Groups involved in the specific attacks
 */

// let svg2, xScale, yScale, XAxis, xAxisGroup, yAxisGroup, yAxis, colorScale2
// let states = {
//     data: [],
//     selected_state : []
// }

// d3.csv("../Project/Data/UnitedStatesTerrorism.csv", d3.autoType.then(raw_data =>{
//     state.data = raw_data;
//     console.log('state:>>', state);

// })