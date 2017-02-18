//Adam Siefkas
//Project I

/*
Sources cited:

I studied many of the basic D3 examples available on the internet, and
I especially referenced Malcom MacClean's 'D3 Tips and Tricks', an online-published
book that illustrates a lot of the basic functionalities of d3.

These resources were especially useful for some of the mouseover/click functionality.

As noted below I also used the in-class tutorial code.

I will heavily comment the first graph to illustrate my understanding, and only comment
those functionalities that differ from the first after.

*/


//Global variables used throughout

var w = 700;
var h = 500;
var xOffset = 100;
var yOffset = 75;
var margin = 20;
var vals = ['x', 'y']
var xVal = vals[0];
var yVal = vals[1];
var radius = 4;



//Axis and scale building comes from in-class tutorial

//--------------------------------------------------------------------//

//part two: bar chart
d3.csv('./data/anscombe_II.csv', function(csvData) {
    //query data, and callback to manipulate data
    var data = csvData;

    //produce objects that scales our raw x,y values into our plot
    var xScale = d3.scale.linear()
        .domain([d3.min(data, function(d) {
            return parseFloat(d[xVal]);
        })-1, d3.max(data, function(d) {
            return parseFloat(d[xVal]);
        })+1])
        .range([xOffset + margin, w - margin]);

    var yScale = d3.scale.linear()
        .domain([d3.min(data, function(d) {
            return parseFloat(d[yVal]);
        })-1, d3.max(data, function(d) {
            return parseFloat(d[yVal]);
        })+1])
        .range([h - yOffset - margin, margin]);

    //construct the main svg, the canvas for our graph

    var svg = d3.select("#partTwo").append("svg:svg")
        .attr("width", w)
        .attr("height", h);

    //creatae axis object

    var xAxis = d3.svg.axis()
        .scale(xScale)
        .orient("bottom")
        .ticks(5);

    //create graphic element where axis will reside

    var xAxisG = svg.append('g')
        .attr('class', 'axis')
        .attr('transform', 'translate(0, ' + (h-yOffset) + ')')
        .call(xAxis);

    //create label for our axis

    var xLabel = svg.append("text")
        .attr('class', 'label')
        .attr('x', w/2)
        .attr('y', h - margin/2)
        .text(xVal);

    //yaxis

    var yAxis = d3.svg.axis()
        .scale(yScale)
        .orient("left")
        .ticks(5);

    var yAxisG = svg.append('g')
        .attr('class', 'axis')
        .attr('transform', 'translate(' + xOffset + ', 0)')
        .call(yAxis);

    var yLabel = svg.append("text")
        .attr('class', 'label')
        .attr('x', xOffset/2)
        .attr('y', h/2)
        .text(yVal);


    var barWidth = 30 //width of each bar

    //create bar object from data

    var bar = svg.selectAll(".bar")
        .data(data);


    bar.enter().append("svg:rect")

    /*
      postion our bar: the x value corresponds to the data points, and is shifted by half the width of the
      bar. The height was the hardest to understand, but it is essentially the difference of our height from our function, with the margin included!

      I added a little CSS mouseover effect on the bars, where a black stroke is added.
      .
    */
    bar.attr("class", "bar") //apply bar css class
        .attr("x", function(d) {return xScale(d[xVal])-(barWidth/2);})
        .attr("y", function(d) {return yScale(d[yVal]);})
        .attr("width", barWidth)
        .attr("height", function(d) {return (h-yOffset-yScale(d[yVal]));});


});


//--------------------------------------------------------------------//

//part three: scatter plot
d3.csv('./data/anscombe_II.csv', function(csvData) {

    var data = csvData;

    var xScale = d3.scale.linear()
        .domain([d3.min(data, function(d) {
            return parseFloat(d[xVal]);
        })-1, d3.max(data, function(d) {
            return parseFloat(d[xVal]);
        })+1])
        .range([xOffset + margin, w - margin]);

    var yScale = d3.scale.linear()
        .domain([d3.min(data, function(d) {
            return parseFloat(d[yVal]);
        })-1, d3.max(data, function(d) {
            return parseFloat(d[yVal]);
        })+1])
        .range([h - yOffset - margin, margin]);

    //append main svg


    var svg = d3.select("#partThree").append("svg:svg")
        .attr("width", w)
        .attr("height", h);

    //build axes

    //xaxis

    var xAxis = d3.svg.axis()
        .scale(xScale)
        .orient("bottom")
        .ticks(5);

    var xAxisG = svg.append('g')
        .attr('class', 'axis')
        .attr('transform', 'translate(0, ' + (h-yOffset) + ')')
        .call(xAxis);

    var xLabel = svg.append("text")
        .attr('class', 'label')
        .attr('x', w/2)
        .attr('y', h - margin/2)
        .text(xVal);

    //yaxis

    var yAxis = d3.svg.axis()
        .scale(yScale)
        .orient("left")
        .ticks(5);

    var yAxisG = svg.append('g')
        .attr('class', 'axis')
        .attr('transform', 'translate(' + xOffset + ', 0)')
        .call(yAxis);

    var yLabel = svg.append("text")
        .attr('class', 'label')
        .attr('x', xOffset/2)
        .attr('y', h/2)
        .text(yVal);



    /*

      create our points, and scale according to our data. The animation was taken from the
      in-class tutorial.

    */

    var point = svg.selectAll(".point")
        .data(data);

    point.enter().append("svg:circle");

    point.attr("class", "point")
        .attr("cx", function(d) {return xScale(d[xVal]);})
        .attr("cy", function(d) {return yScale(d[yVal]);})
        .attr("r", 0)
        .transition()
        .duration(1000)
        .attr("r", radius);

});


//--------------------------------------------------------------------//

//part four: a better scatter plot
d3.csv('./data/anscombe_II.csv', function(csvData) {

    var data = csvData;

    var xScale = d3.scale.linear()
        .domain([d3.min(data, function(d) {
            return parseFloat(d[xVal]);
        })-1, d3.max(data, function(d) {
            return parseFloat(d[xVal]);
        })+1])
        .range([xOffset + margin, w - margin]);

    var yScale = d3.scale.linear()
        .domain([d3.min(data, function(d) {
            return parseFloat(d[yVal]);
        })-1, d3.max(data, function(d) {
            return parseFloat(d[yVal]);
        })+1])
        .range([h - yOffset - margin, margin]);

    //append main svg


    var svg = d3.select("#partFour").append("svg:svg")
        .attr("width", w)
        .attr("height", h);

    //build axes

    //xaxis

    var xAxis = d3.svg.axis()
        .scale(xScale)
        .orient("bottom")
        .ticks(5);

    var xAxisG = svg.append('g')
        .attr('class', 'axis')
        .attr('transform', 'translate(0, ' + (h-yOffset) + ')')
        .call(xAxis);

    var xLabel = svg.append("text")
        .attr('class', 'label')
        .attr('x', w/2)
        .attr('y', h - margin/2)
        .text(xVal);

    //yaxis

    var yAxis = d3.svg.axis()
        .scale(yScale)
        .orient("left")
        .ticks(5);

    var yAxisG = svg.append('g')
        .attr('class', 'axis')
        .attr('transform', 'translate(' + xOffset + ', 0)')
        .call(yAxis);

    var yLabel = svg.append("text")
        .attr('class', 'label')
        .attr('x', xOffset/2)
        .attr('y', h/2)
        .text(yVal);


    /*
      This time, we want to attach a few handler functions to our points. This is accomplished with some
of the event handling features of javascript. The events are declared here in point.attr, and then sent
to the handler functions.

    */


    var point = svg.selectAll(".point")
        .data(data);

    point.enter().append("svg:circle");

    point.attr("class", "point")
        .attr("cx", function(d) {return xScale(d[xVal]);})
        .attr("cy", function(d) {return yScale(d[yVal]);})
        .attr("r", radius)
        .on("mouseover",mouseOverHandle)
        .on("click", clickHandle)
        .on("mouseout", mouseOutHandle);

});


//-----------------------------------------------------------------//

//part 5--quartet of graphs


/*
Not much else to say here, these display almost the same functionality as the graphs above, except a title is
added as well, which works through an svg.append
*/

//graph 1
d3.csv('./data/anscombe_I.csv', function(csvData) {

    var data = csvData;

    var xScale = d3.scale.linear()
        .domain([d3.min(data, function(d) {
            return parseFloat(d[xVal]);
        })-1, d3.max(data, function(d) {
            return parseFloat(d[xVal]);
        })+1])
        .range([xOffset + margin, w - margin]);

    var yScale = d3.scale.linear()
        .domain([d3.min(data, function(d) {
            return parseFloat(d[yVal]);
        })-1, d3.max(data, function(d) {
            return parseFloat(d[yVal]);
        })+1])
        .range([h - yOffset - margin, margin]);

    //append main svg


    var svg = d3.select("#partFive").append("svg:svg")
        .attr("width", w)
        .attr("height", h);


    //title
    svg.append("text")
        .attr("x", w/2)
        .attr("y", margin)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .style("font-color", "black")
        .text("Anscombe I");

    //build axes

    //xaxis

    var xAxis = d3.svg.axis()
                   .scale(xScale)
                   .orient("bottom")
                   .ticks(5);

               var xAxisG = svg.append('g')
                   .attr('class', 'axis')
                   .attr('transform', 'translate(0, ' + (h-yOffset) + ')')
                   .call(xAxis);

               var xLabel = svg.append("text")
                   .attr('class', 'label')
                   .attr('x', w/2)
                   .attr('y', h - margin/2)
                   .text(xVal);

               //yaxis

               var yAxis = d3.svg.axis()
                   .scale(yScale)
                   .orient("left")
                   .ticks(5);

               var yAxisG = svg.append('g')
                   .attr('class', 'axis')
                   .attr('transform', 'translate(' + xOffset + ', 0)')
                   .call(yAxis);

               var yLabel = svg.append("text")
                   .attr('class', 'label')
                   .attr('x', xOffset/2)
                   .attr('y', h/2)
                   .text(yVal);



               var point = svg.selectAll(".point")
                   .data(data);

               point.enter().append("svg:circle");

               point.attr("class", "point")
               .attr("cx", function(d) {return xScale(d[xVal]);})
               .attr("cy", function(d) {return yScale(d[yVal]);})
               .attr("r", 0)
               .transition()
               .duration(1000)
               .attr("r", radius);

});


//graph 2
d3.csv('./data/anscombe_II.csv', function(csvData) {

    var data = csvData;

    var xScale = d3.scale.linear()
        .domain([d3.min(data, function(d) {
            return parseFloat(d[xVal]);
        })-1, d3.max(data, function(d) {
            return parseFloat(d[xVal]);
        })+1])
        .range([xOffset + margin, w - margin]);

    var yScale = d3.scale.linear()
        .domain([d3.min(data, function(d) {
            return parseFloat(d[yVal]);
        })-1, d3.max(data, function(d) {
            return parseFloat(d[yVal]);
        })+1])
        .range([h - yOffset - margin, margin]);

    //append main svg


    var svg = d3.select("#partFive").append("svg:svg")
        .attr("width", w)
        .attr("height", h);


    //title
    svg.append("text")
        .attr("x", w/2)
        .attr("y", margin)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .style("font-color", "black")
        .text("Anscombe II");

    //build axes

    //xaxis

    var xAxis = d3.svg.axis()
        .scale(xScale)
        .orient("bottom")
        .ticks(5);

    var xAxisG = svg.append('g')
        .attr('class', 'axis')
        .attr('transform', 'translate(0, ' + (h-yOffset) + ')')
        .call(xAxis);

    var xLabel = svg.append("text")
        .attr('class', 'label')
        .attr('x', w/2)
        .attr('y', h - margin/2)
        .text(xVal);

    //yaxis

    var yAxis = d3.svg.axis()
        .scale(yScale)
        .orient("left")
        .ticks(5);

    var yAxisG = svg.append('g')
        .attr('class', 'axis')
        .attr('transform', 'translate(' + xOffset + ', 0)')
        .call(yAxis);

    var yLabel = svg.append("text")
        .attr('class', 'label')
        .attr('x', xOffset/2)
        .attr('y', h/2)
        .text(yVal);



    var point = svg.selectAll(".point")
        .data(data);

    point.enter().append("svg:circle");

    point.attr("class", "point")
        .attr("cx", function(d) {return xScale(d[xVal]);})
        .attr("cy", function(d) {return yScale(d[yVal]);})
        .attr("r", 0)
        .transition()
        .duration(1000)
        .attr("r", radius);

});

//graph 3
d3.csv('./data/anscombe_III.csv', function(csvData) {

    var data = csvData;

    var xScale = d3.scale.linear()
        .domain([d3.min(data, function(d) {
            return parseFloat(d[xVal]);
        })-1, d3.max(data, function(d) {
            return parseFloat(d[xVal]);
        })+1])
        .range([xOffset + margin, w - margin]);

    var yScale = d3.scale.linear()
        .domain([d3.min(data, function(d) {
            return parseFloat(d[yVal]);
        })-1, d3.max(data, function(d) {
            return parseFloat(d[yVal]);
        })+1])
        .range([h - yOffset - margin, margin]);

    //append main svg


    var svg = d3.select("#partFive").append("svg:svg")
        .attr("width", w)
        .attr("height", h);


    //title
    svg.append("text")
        .attr("x", w/2)
        .attr("y", margin)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .style("font-color", "black")
        .text("Anscombe III");

    //build axes

    //xaxis

    var xAxis = d3.svg.axis()
        .scale(xScale)
        .orient("bottom")
        .ticks(5);

    var xAxisG = svg.append('g')
        .attr('class', 'axis')
        .attr('transform', 'translate(0, ' + (h-yOffset) + ')')
        .call(xAxis);

    var xLabel = svg.append("text")
        .attr('class', 'label')
        .attr('x', w/2)
        .attr('y', h - margin/2)
        .text(xVal);

    //yaxis

    var yAxis = d3.svg.axis()
        .scale(yScale)
        .orient("left")
        .ticks(5);

    var yAxisG = svg.append('g')
        .attr('class', 'axis')
        .attr('transform', 'translate(' + xOffset + ', 0)')
        .call(yAxis);

    var yLabel = svg.append("text")
        .attr('class', 'label')
        .attr('x', xOffset/2)
        .attr('y', h/2)
        .text(yVal);



    var point = svg.selectAll(".point")
        .data(data);

    point.enter().append("svg:circle");

    point.attr("class", "point")
        .attr("cx", function(d) {return xScale(d[xVal]);})
        .attr("cy", function(d) {return yScale(d[yVal]);})
        .attr("r", 0)
        .transition()
        .duration(1000)
        .attr("r", radius);

});


//graph 4
d3.csv('./data/anscombe_IV.csv', function(csvData) {

    var data = csvData;

    var xScale = d3.scale.linear()
        .domain([d3.min(data, function(d) {
            return parseFloat(d[xVal]);
        })-1, d3.max(data, function(d) {
            return parseFloat(d[xVal]);
        })+1])
        .range([xOffset + margin, w - margin]);

    var yScale = d3.scale.linear()
        .domain([d3.min(data, function(d) {
            return parseFloat(d[yVal]);
        })-1, d3.max(data, function(d) {
            return parseFloat(d[yVal]);
        })+1])
        .range([h - yOffset - margin, margin]);

    //append main svg


    var svg = d3.select("#partFive").append("svg:svg")
        .attr("width", w)
        .attr("height", h);


    //title
    svg.append("text")
        .attr("x", w/2)
        .attr("y", margin)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .style("font-color", "black")
        .text("Anscombe IV");

    //build axes

    //xaxis

    var xAxis = d3.svg.axis()
        .scale(xScale)
        .orient("bottom")
        .ticks(5);

    var xAxisG = svg.append('g')
        .attr('class', 'axis')
        .attr('transform', 'translate(0, ' + (h-yOffset) + ')')
        .call(xAxis);

    var xLabel = svg.append("text")
        .attr('class', 'label')
        .attr('x', w/2)
        .attr('y', h - margin/2)
        .text(xVal);

    //yaxis

    var yAxis = d3.svg.axis()
        .scale(yScale)
        .orient("left")
        .ticks(5);

    var yAxisG = svg.append('g')
        .attr('class', 'axis')
        .attr('transform', 'translate(' + xOffset + ', 0)')
        .call(yAxis);

    var yLabel = svg.append("text")
        .attr('class', 'label')
        .attr('x', xOffset/2)
        .attr('y', h/2)
        .text(yVal);



    var point = svg.selectAll(".point")
        .data(data);

    point.enter().append("svg:circle");

    point.attr("class", "point")
        .attr("cx", function(d) {return xScale(d[xVal]);})
        .attr("cy", function(d) {return yScale(d[yVal]);})
        .attr("r", 0)
        .transition()
        .duration(1000)
        .attr("r", radius);

});


//handler functions for mouse and click events

function clickHandle(d){

    //handles the click by appending coordinates to the scatterLabel paragraph tag
    document.getElementById("scatterLabel").innerHTML = "(" + d[xVal] + ", " + d[yVal] + ")" ;
};


function mouseOverHandle(d){

    //changes attributes of scatterplot point upon mouseover
    d3.select(this).attr({
        fill: "#1a8cff",
        r: radius*1.4
    });


};


function mouseOutHandle(){

    //reverts change from mouseOver
    d3.select(this).attr({
        fill: "black",
        r: radius
    });

};
