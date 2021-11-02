/**
 * CONSTANTS AND GLOBALS
 * */
 const width = window.innerWidth * 0.9,
    height = window.innerHeight * 0.7,
    margin = { top: 20, bottom: 50, left: 60, right: 40 };

let svg, 
    hoverBox;
/**
* APPLICATION STATE
* */

let state = {
    geojson: [],
    terrorist_state_data: [],
    };

/**
* LOAD DATA
* Using a Promise.all([]), we can load more than one dataset at a time
* */
Promise.all([
 d3.json("../data/usState.json"),
 d3.csv("../Project/Data/State_Data.csv")
]).then(([geojson, terrorist_state_data]) => {
 state.geojson = geojson
 state.terrorist_state_data = terrorist_state_data;
 //console.log("state: ", state);
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
console.log('attacksLookup :>>', attacksLookup.get("California"));
svg = d3.select("#container")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
hoverBox = d3.select("#hover-content")

const projection = d3.geoAlbersUsa()
    .fitSize([width, height], state.geojson)
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
usSates.on("mousemove", (ev, d) => {
    state.hover_state = d.properties.NAME
    state.hover_attacks = attacksLookup.get(d.properties.NAME) 
    draw();
})
svg.on("mousemove", (ev) => {
    const [mx, my] = d3.pointer(ev)
    state.x = ev.clientX;
    state.y = ev.clientY;
    state.latitude = projection.invert([mx,my])[0];
    state.longitude = projection.invert([mx, my])[1];
    draw()
})
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