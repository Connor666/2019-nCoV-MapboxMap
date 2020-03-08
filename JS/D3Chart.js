function JSONObject(type,Date,People){
    this.type=type;
    this.Date=Date;
    this.People=People;
}


function chartSet(index){
    d3.csv("data.csv", function(CovData) {

        var DataIndex = index-1;
        console.log(CovData);
        document.getElementById("charttitle").innerHTML = CovData[DataIndex].province; // The name of the city and country is inserted into the chart title
        console.log(document.getElementById("chartContainer"))
        var svg = dimple.newSvg("#chartContainer", 500, 250); // The chart is an svg variable assigned to the chartcontainer div. It's width and height are also assigned here
        var chartdata =[];
        for (var key in CovData[DataIndex]){
            if (key.match(RegExp(/confirm/))){
                chartdata.push(new JSONObject("Confirmed",key.replace("_confirm",""),CovData[DataIndex][key]))
            }
            else if (key.match(RegExp(/heal/))){
                chartdata.push(new JSONObject("Recovered",key.replace("_heal",""),CovData[DataIndex][key]))
            }

            else if(key.match(RegExp(/dead/))){
                chartdata.push(new JSONObject("Deaths",key.replace("_dead",""),CovData[DataIndex][key]))
            }
        }

        console.log(chartdata)
        var myChart = new dimple.chart(svg, chartdata);
        myChart.setBounds(60, 15, 390, 200);            // Set the chart bounds within the svg container

        myChart.defaultColors = [
            new dimple.color("#fc4e2a"),
            new dimple.color("#31a354"),
            new dimple.color("#3182bd")
        ];

        myChart.addLegend(100, 0, 380, 200, "right");

        var x = myChart.addTimeAxis("x", "Date","%m-%d","%m-%d");  // Define the x axis. The latter statements define the date format which we want to be year only
        x.timeInterval = 1;


        var y = myChart.addMeasureAxis("y", "People"); // Define the y axis
        y.ticks = 6;

        var s = myChart.addSeries("type", dimple.plot.bar);
        s.interpolation = "cardinal";

        myChart.draw(1600);


        svg.selectAll("path.dimple-proj").style("stroke", "2"); // Some minor stying changes using the svg selectAll statement. Make the projected data a dashed line and the grid colour lighter.
        svg.selectAll("path.domain").style("stroke", "#CCC");
        svg.selectAll("g.tick line").style("stroke", "#CCC");

    })
}