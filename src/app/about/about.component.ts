import {Component, OnInit} from "@angular/core";
import * as d3 from 'd3';

interface ChartPoint {
    x: number,
    y: number
}


@Component({
    selector: 'about-app',
    template: ` <br>`,
    styleUrls: ['./about.component.css']

})

export class AboutComponent implements OnInit {
    height: number;
    width: number;
    margin: number;
    rawData: any;
    data: any;

    constructor() {
        this.height = 500;
        this.width = 500;
        this.margin = 30;
        this.rawData = [
            {x: 10, y: 67}, {x: 20, y: 74},{x: 30, y: 63},
            {x: 40, y: 56}, {x: 50, y: 24}, {x: 60, y: 26},
            {x: 70, y: 19}, {x: 80, y: 42}, {x: 90, y: 88}
        ];
        this.data = []
    }

    ngOnInit() {
        let svg = d3.select("body").append("svg")
            .attr("class", "axis")
            .attr("width", this.width)
            .attr("height", this.height);
        //Длина оси Х
        let xAxisLength = this.width - 2*this.margin;

        //Длина оси У
        let yAxisLength = this.height - 2*this.margin;

        //Интерполяция на Х и У
        let scaleX = d3.scaleLinear()
            .domain([0,100])
            .range([0, xAxisLength]);
        let scaleY = d3.scaleLinear()
            .domain([100,0])
            .range([0, yAxisLength]);

        for (let i=0; i<Object.keys(this.rawData).length; i++){
            this.data.push({x: scaleX(this.rawData[i].x)+this.margin, y: scaleY(this.rawData[i].y)+this.margin})
        }

        //Создание оси Х
        let xAxis = d3.axisBottom(scaleX);

        //Создание оси Y
        let yAxis = d3.axisLeft(scaleY);

        svg.append("g")
            .attr("class", "x-axis")
            .attr("transform",
                "translate(" + this.margin +"," + (this.height -this.margin)+ ")")
            .call(xAxis);

        svg.append("g")
            .attr("class","y-axis")
            .attr("transform",
                "translate("+ this.margin +"," + this.margin +")")
            .call(yAxis);

        //Набор вертикальных линий для сетки
        d3.selectAll("g.x-axis g.tick")
            .append("line")
            .attr("y2", - (this.height-2*this.margin));

        //Горизонтальные
        d3.selectAll("g.y-axis g.tick")
            .append("line")
            .attr("x2",yAxisLength);

        //Создание линий по массиву точек
        let line = d3.line<ChartPoint>()
            .x((d: ChartPoint)=> scaleX(d.x))
            .y((d: ChartPoint)=> scaleY(d.y));

        let g = svg.append("g");
        g.append("path")
            .attr("d", line(this.data))
            .style("stroke", "steelblue")
            .style("stroke-width", 2);

        //Заголовки
        g.append("text")
            .attr("x", this.margin+11)
            .attr("y", this.margin-10)
            .attr("text-anchor", "end")
            .style("font-size","11px")
            .style("color","steelblue")
            .text("Ось Y");
        g.append("text")
            .attr("x", this.width-this.margin+11)
            .attr("y", this.height-this.margin-10)
            .attr("text-anchor", "end")
            .style("font-size","11px")
            .text("Ось X");

        //Точки
        svg.selectAll(".dot")
            .data(this.rawData)
            .enter().append("circle")
            .attr("r", 3.5)
            .attr("cx", ((d:ChartPoint)=>scaleX(d.x)+this.margin))
            .attr("cy", ((d:ChartPoint)=>scaleY(d.y)+this.margin))

    }
}


        // this.correlationMatrix = [
        //     [1, 3, 0],
        //     [3, 1, 0],
        //     [0, 5, 1]
        // ];
        //
        // this.labels = ['Var 1', 'Var 2', 'Var 3'];
        //
        // function Matrix(options:any) {
        //     let margin = {top: 50, right: 50, bottom: 100, left: 100},
        //         width = 350,
        //         height = 350,
        //         data = options.data,
        //         container = options.container,
        //         labelsData = options.labels,
        //         startColor = options.start_color,
        //         endColor = options.end_color;

            // let widthLegend = 100;
            //
            //  if(!data){
            //      throw new Error('Please pass data');
            //  }
            //
            //  if(!Array.isArray(data) || !data.length || !Array.isArray(data[0])){
            //      throw new Error('It should be a 2-D array');
            //  }
            //
            //  let maxValue = d3.max(data, function(layer) { return d3.max(layer, function(d:any) { return d; }); });
            //  let minValue = d3.min(data, function(layer) { return d3.min(layer, function(d:any) { return d; }); });
            //
            //  let numrows = data.length;
            //  let numcols:any = data[0].length;
            //
            //  let svg = d3.select(container).append("svg")
            //      .attr("width", width + margin.left + margin.right)
            //      .attr("height", height + margin.top + margin.bottom)
            //      .append("g")
            //      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
            //
            //  let background = svg.append("rect")
            //      .style("stroke", "black")
            //      .style("stroke-width", "2px")
            //      .attr("width", width)
            //      .attr("height", height);

            // let x = d3.scaleOrdinal()
                // .domain(numrows)
                // .rangeBands([0, width]);
            //
            // var y = d3.scale.ordinal()
            //     .domain(d3.range(numrows))
            //     .rangeBands([0, height]);
            //
            // var colorMap = d3.scale.linear()
            //     .domain([minValue,maxValue])
            //     .range([startColor, endColor]);
            //
            // var row = svg.selectAll(".row")
            //     .data(data)
            //     .enter().append("g")
            //     .attr("class", "row")
            //     .attr("transform", function(d, i) { return "translate(0," + y(i) + ")"; });
            //
            // var cell = row.selectAll(".cell")
            //     .data(function(d) { return d; })
            //     .enter().append("g")
            //     .attr("class", "cell")
            //     .attr("transform", function(d, i) { return "translate(" + x(i) + ", 0)"; });
            //
            // cell.append('rect')
            //     .attr("width", x.rangeBand())
            //     .attr("height", y.rangeBand())
            //     .style("stroke-width", 0);
            //
            // cell.append("text")
            //     .attr("dy", ".32em")
            //     .attr("x", x.rangeBand() / 2)
            //     .attr("y", y.rangeBand() / 2)
            //     .attr("text-anchor", "middle")
            //     .style("fill", function(d, i) { return d >= maxValue/2 ? 'white' : 'black'; })
            //     .text(function(d, i) { return d; });
            //
            // row.selectAll(".cell")
            //     .data(function(d, i) { return data[i]; })
            //     .style("fill", colorMap);
            //
            // var labels = svg.append('g')
            //     .attr('class', "labels");
            //
            // var columnLabels = labels.selectAll(".column-label")
            //     .data(labelsData)
            //     .enter().append("g")
            //     .attr("class", "column-label")
            //     .attr("transform", function(d, i) { return "translate(" + x(i) + "," + height + ")"; });
            //
            // columnLabels.append("line")
            //     .style("stroke", "black")
            //     .style("stroke-width", "1px")
            //     .attr("x1", x.rangeBand() / 2)
            //     .attr("x2", x.rangeBand() / 2)
            //     .attr("y1", 0)
            //     .attr("y2", 5);
            //
            // columnLabels.append("text")
            //     .attr("x", 0)
            //     .attr("y", y.rangeBand() / 2)
            //     .attr("dy", ".82em")
            //     .attr("text-anchor", "end")
            //     .attr("transform", "rotate(-60)")
            //     .text(function(d, i) { return d; });
            //
            // var rowLabels = labels.selectAll(".row-label")
            //     .data(labelsData)
            //     .enter().append("g")
            //     .attr("class", "row-label")
            //     .attr("transform", function(d, i) { return "translate(" + 0 + "," + y(i) + ")"; });
            //
            // rowLabels.append("line")
            //     .style("stroke", "black")
            //     .style("stroke-width", "1px")
            //     .attr("x1", 0)
            //     .attr("x2", -5)
            //     .attr("y1", y.rangeBand() / 2)
            //     .attr("y2", y.rangeBand() / 2);
            //
            // rowLabels.append("text")
            //     .attr("x", -8)
            //     .attr("y", y.rangeBand() / 2)
            //     .attr("dy", ".32em")
            //     .attr("text-anchor", "end")
            //     .text(function(d, i) { return d; });
            //
            // var key = d3.select("#legend")
            //     .append("svg")
            //     .attr("width", widthLegend)
            //     .attr("height", height + margin.top + margin.bottom);
            //
            // var legend = key
            //     .append("defs")
            //     .append("svg:linearGradient")
            //     .attr("id", "gradient")
            //     .attr("x1", "100%")
            //     .attr("y1", "0%")
            //     .attr("x2", "100%")
            //     .attr("y2", "100%")
            //     .attr("spreadMethod", "pad");
            //
            // legend
            //     .append("stop")
            //     .attr("offset", "0%")
            //     .attr("stop-color", endColor)
            //     .attr("stop-opacity", 1);
            //
            // legend
            //     .append("stop")
            //     .attr("offset", "100%")
            //     .attr("stop-color", startColor)
            //     .attr("stop-opacity", 1);
            //
            // key.append("rect")
            //     .attr("width", widthLegend/2-10)
            //     .attr("height", height)
            //     .style("fill", "url(#gradient)")
            //     .attr("transform", "translate(0," + margin.top + ")");
            //
            // var y = d3.scale.linear()
            //     .range([height, 0])
            //     .domain([minValue, maxValue]);
            //
            // var yAxis = d3.svg.axis()
            //     .scale(y)
            //     .orient("right");
            //
            // key.append("g")
            //     .attr("class", "y axis")
            //     .attr("transform", "translate(41," + margin.top + ")")
            //     .call(yAxis)
        // }
    // }
// }
