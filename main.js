var config  = {
      svgWidth : 800,
      svgHeight : 400,
      svgMargin : {
          top : 20,
          bottom : 20,
          left : 30,
          right : 20,
      }
};

var width = config.svgWidth - config.svgMargin.left - config.svgMargin.right;
var height = config.svgHeight - config.svgMargin.top - config.svgMargin.bottom;


var svg = d3.select("body")
            .append("svg")
            .attr("width", config.svgWidth)
            .attr("height", config.svgHeight);

 g = svg.append("g").attr("transform", "translate(" + 2*config.svgMargin.left + "," + config.svgMargin.top + ")");

var xScale = d3.time.scale()
                .range([0,width]);

var yScale = d3.scale.linear()
               .range([ height,0]);


var xAxis = d3.svg.axis()
              .scale(xScale)
              .orient("bottom");

var yAxis = d3.svg.axis()
              .scale(yScale)
              .orient("left");


// var line = d3.svg.line()
//     .x(function(d) { return xScale(d.date); })
//     .y(function(d) { return yScale(d.close); });


var area = d3.svg.area()
    .x(function(d) { return xScale(d.date); })
    .y1(function(d) { return yScale(d.close); });


d3.tsv("data.tsv", function(error,callbackData) {
  if (error) throw error;

  var parseDate = d3.time.format("%d-%b-%y").parse;
 
  callbackData.forEach(function(d) {
    d.date = parseDate(d.date);
    d.close = +d.close;
    });

   console.log(callbackData);

   xScale.domain(d3.extent(callbackData, function(d) { return d.date; }));
   yScale.domain(d3.extent(callbackData, function(d) { return d.close; })); 

   area.y0(height);

   g.append("path")
        .datum(callbackData)
        .attr("fill", "steelblue")
        .attr("d", area);


   g.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(0," + height  + ")")
            .call(xAxis)
    .append("text")
            .attr("x", width-config.svgMargin.right)
            .attr("y", -5)
            .style("text-anchor", "end")
            .text("Date");



    g.append("g")
            .attr("class", "axis")
            .call(yAxis)
     .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 10)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("Price ($)");

    // g.append("path")
    //   .datum(callbackData)
    //   .attr("fill", "none")
    //   .attr("stroke", "teal")
    //   .attr("stroke-linejoin", "square")
    //   .attr("stroke-linecap", "square")
    //   .attr("stroke-width", 1.5)
    //   .attr("d", line);
});



 


