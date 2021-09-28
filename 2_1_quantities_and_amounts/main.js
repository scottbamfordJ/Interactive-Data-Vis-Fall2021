/* CONSTANTS AND GLOBALS */
// const width = ;
// const height = ;

/* LOAD DATA */
d3.csv('CountryData.csv', d3.autoType)
  .then(data => {
    console.log(data)

    const table = d3.select("#container")
      .append("table")

    
    const rows = table
      .selectAll(".row")
      .data(data)
      .join("tr")
      .attr("class", "row")

    const cells = rows
      .selectAll(".cell")
      .data(d => Object.values(d))
      .join("td")
      .text(d => d)




    /* SCALES */
    /** This is where you should define your scales from data to pixel space */
    

    /* HTML ELEMENTS */
    /** Select your container and append the visual elements to it */

  })