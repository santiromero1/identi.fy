// set the dimensions and margins of the graph
var width = 500
var height = 460

// append the svg object to the body of the page
// Shuffle function using Fisher-Yates algorithm
function shuffle(array) {
  var currentIndex = array.length;
  var temporaryValue, randomIndex;

  // While there remain elements to shuffle
  while (currentIndex !== 0) {
    // Pick a remaining element
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // Swap it with the current element
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

// Read data
d3.csv('../datos/General.csv', d3.autoType).then(data => {
  data = shuffle(data); // Shuffle the data array

  var svg = d3.select("#my_dataviz")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  console.log(data);

  // Color palette for propietario
  //var color = "red";
    var color = function (d) {
      if (d.propietario === "Lucas") {
        return "#EDC951";
      } else if (d.propietario === "Santi") {
        return "#CC333F";
      } else {
        return "#00A0B0";
      }
    };


  // Size scale for countries
  var size = d3
    .scaleLinear()
    .domain([0, 150])
    .range([4, 50]); // circle will be between 7 and 55 px wide

  // create a tooltip
  var Tooltip = d3
    .select("#my_dataviz")
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("background-color", "black")
    .style("color", "white")
    .style("text-align", "center")
    .style("border", "solid")
    .style("border-width", "2px")
    .style("border-radius", "5px")
    .style("padding", "5px")

  // Three function that change the tooltip when user hover / move / leave a cell
  var mouseover = function(d) {
    Tooltip.style("opacity", 1)
  }
  var mousemove = function (d) {
    Tooltip
      .html('<u>' + d.name + '</u>' + "<br>" + d.popularity + " popularity")
      .style("left", d3.mouse(this)[0] + 20 + "px")
      .style("top", d3.mouse(this)[1] + "px");
  };
  var mouseleave = function (d) {
    Tooltip.style("opacity", 0);
  };

  // Initialize the circle: all located at the center of the svg area
  var node = svg
    .append("g")
    .selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("class", "node")
    .attr("r", function (d) {
      return size(d.popularity);
    })
    .attr("cx", width / 2)
    .attr("cy", height / 2)
    .style("fill", function (d) {
      return color(d); // Call the color function here
    })
    .style("fill-opacity", 0.85)
    .attr("stroke", "black")
    .style("stroke-width", "1px")
    .on("mouseover", mouseover)
    .on("mousemove", mousemove)
    .on("mouseleave", mouseleave)
      .call(d3.drag() // call specific function when circle is dragged
           .on("start", dragstarted)
           .on("drag", dragged)
           .on("end", dragended));

  // Features of the forces applied to the nodes:
  var simulation = d3
    .forceSimulation()
    .force("center", d3.forceCenter().x(width / 2).y(height / 2)) // Attraction to the center of the svg area
    .force("charge", d3.forceManyBody().strength(0.1)) // Nodes are attracted one each other of value is > 0
    .force("collide", d3.forceCollide().strength(0.2).radius(function (d) {
      return size(d.popularity) + 2;
    }).iterations(1)); // Force that avoids circle overlapping

  // Apply these forces to the nodes and update their positions.
  // Once the force algorithm is happy with positions ('alpha' value is low enough), simulations will stop.
  simulation
      .nodes(data)
      .on("tick", function(d){
        node
            .attr("cx", function(d){ return d.x; })
            .attr("cy", function(d){ return d.y; })
      });

  // What happens when a circle is dragged?
  function dragstarted(d) {
    if (!d3.event.active) simulation.alphaTarget(.03).restart();
    d.fx = d.x;
    d.fy = d.y;
  }
  function dragged(d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
  }
  function dragended(d) {
    if (!d3.event.active) simulation.alphaTarget(.03);
    d.fx = null;
    d.fy = null;
  }

})