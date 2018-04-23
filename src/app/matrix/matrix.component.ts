import {Component, OnInit} from "@angular/core";
import * as d3 from 'd3';

@Component({
    selector: 'matrix-app',
    templateUrl: 'matrix.component.html',
    styleUrls: ['./matrix.component.css']
})

export class MatrixComponent implements OnInit{
    correlationMatrix: any;
    labels: any;
    width: number;
    height: number;
    container: any;
    data: any;
    start_color: any;
    end_color: any;
    margin: any;
    widthLegend: number;
    labelsData: any;

    minValue: any;
    maxValue: any;

    constructor(){
        this.correlationMatrix = [
            [1, 0.3, 0, 0.8, 0, 0.2, 1, 0.5, 0, 0.75],
            [0.3, 1, 0.5, 0.2, 0.4, 0.3, 0.8, 0.1, 1, 0],
            [0, 0.5, 1, 0.4, 0, 0.9, 0, 0.2, 1, 0.3],
            [0.8, 0.2, 0.4, 1, 0.3, 0.4, 0.1, 1, 0.2, 0.9],
            [0, 0.4, 0, 0.3, 1, 0.1, 0.4, 0, 0.6, 0.7],
            [0.2, 0.3, 0.9, 0.9, 0.1, 1, 0, 0.1, 0.4, 0.1],
            [1, 0.8, 0, 0.1, 0.4, 0, 1, 0.5, 0, 1],
            [0.5, 0.1, 0.2, 1, 0.1, 0, 0.5, 1, 0, 0.4],
            [0, 1, 1, 0.2, 0.6, 0.4, 0, 0, 1, 0.6],
            [0.75, 0, 0.3, 0.9, 0.7, 0.1, 1, 0.4, 0.6, 1]
        ];

        this.labels = ['Var 1', 'Var 2', 'Var 3', 'Var 4', 'Var 5', 'Var 6', 'Var 7', 'Var 8', 'Var 9', 'Var 10'];

        this.margin = {top: 50, right: 50, bottom: 100, left: 100};
        this.width = 350;
        this.height = 350;
        this.data = this.correlationMatrix;
        this.labelsData = this.labels;
        this.start_color = '#ffffff';
        this.end_color = '#3498db';
        this.container = '#container';

        this.widthLegend = 100;
    }

    ngOnInit(){

        // При возникновении ошибки
        if(!this.data){
            throw new Error('Please pass data');

        }

        if(!Array.isArray(this.data) || !this.data || !Array.isArray(this.data[0])){
            throw new Error('It should be a 2-D array');
        }

        // Max, Min в матрице
        this.maxValue = d3.max(this.data, function (layer){return d3.max(layer, function(d:any){return d;}); });
        this.minValue = d3.min(this.data, function(layer) {return d3.min(layer, function(d:any) { return d; }); });

        // Длина строк и колонок
        let numcols = Object.keys(this.data[0]).length;
        let numrows = Object.keys(this.data).length;

        let svg = d3.select(this.container).append("svg")
            .attr("width", this.width + this.margin.left + this.margin.right)
            .attr("height", this.height + this.margin.top + this.margin.bottom)
            .append("g")
            .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");

        let background = svg.append("rect")
            .style("stroke", "black") //обводка
            .style("stroke-width", "2px") //толщина обводки
            .attr("width", this.width)
            .attr("height", this.height);

        // шкала
        let x = d3.scaleBand()
            .domain(d3.range(numcols).map((d)=> d+""))
            .range([0, this.width]);

        let y = d3.scaleBand()
            .domain(d3.range(numrows).map((d)=> d+""))
            .range([0,this. height]);

        // цветовая схема
        let colorMap = d3.scaleLinear()
            .domain([this.minValue, this.maxValue])
            .range([this.start_color, this.end_color]);

        let row = svg.selectAll(".row")
            .data(this.data)
            .enter().append("g")
            .attr("class", "row")
            .attr("transform", function(d, i:any) { return "translate(0," + y(i) + ")"; });

        let cell = row.selectAll(".cell")
            .data(function(d) { return d; })
            .enter().append("g")
            .attr("class", "cell")
            .attr("transform", function(d, i:any) { return "translate(" + x(i) + ", 0)"; });

        cell.append('rect')
            .attr("width", x.bandwidth())
            .attr("height", y.bandwidth())
            .style("stroke-width", 0);

        let max = this. maxValue;

        //надписи в ячейках
        cell.append("text")
            .attr("dy", ".32em")
            .attr("x", x.bandwidth() / 2)
            .attr("y", y.bandwidth() / 2)
            .attr("text-anchor", "middle")
            .style("fill", function(d) { return d >= max/2 ? 'white' : 'black'; })
            .text(function(d:any, i) {
                return d;
            });

        row.selectAll(".cell")
            // .data(function(d, i) { return data[i]; })
            .style("fill", colorMap);

        let labels = svg.append('g')
            .attr('class', "labels");

        let height = this.height;

        let columnLabels = labels.selectAll(".column-label")
            .data(this.labelsData)
            .enter().append("g")
            .attr("class", "column-label")
            .attr("transform", function(d, i: any) { return "translate(" + x(i) + "," + height + ")"; });

        //шкала к оси X
        columnLabels.append("line")
            .style("stroke", "black")
            .style("stroke-width", "2px")
            .attr("x1", x.bandwidth() / 2)
            .attr("x2", x.bandwidth() / 2)
            .attr("y1", 0)
            .attr("y2", 5);

        //подписи к оси Х
        columnLabels.append("text")
            .attr("x", 0)
            .attr("y", y.bandwidth() / 2)
            .attr("dy", ".82em")
            .attr("text-anchor", "end")
            .attr("transform", "rotate(-60)")
            .text(function(d:any, i) { return d; });

        let rowLabels = labels.selectAll(".row-label")
            .data(this.labelsData)
            .enter().append("g")
            .attr("class", "row-label")
            .attr("transform", function(d, i:any) { return "translate(" + 0 + "," + y(i) + ")"; });

        rowLabels.append("line")
            .style("stroke", "black")
            .style("stroke-width", "1px")
            .attr("x1", 0)
            .attr("x2", -5)
            .attr("y1", y.bandwidth() / 2)
            .attr("y2", y.bandwidth() / 2);

        //подписи к оси Y
        rowLabels.append("text")
            .attr("x", -8)
            .attr("y", y.bandwidth() / 2)
            .attr("dy", ".32em")
            .attr("text-anchor", "end")
            .text(function(d:any, i) { return d; });

        //градиент
        let key = d3.select("#legend")
            .append("svg")
            .attr("width", this.widthLegend)
            .attr("height", this.height + this.margin.top + this.margin.bottom);

        let legend = key
            .append("defs")
            .append("svg:linearGradient")
            .attr("id", "gradient")
            .attr("x1", "100%")
            .attr("y1", "0%")
            .attr("x2", "100%")
            .attr("y2", "100%")
            .attr("spreadMethod", "pad");

        legend
            .append("stop")
            .attr("offset", "0%")
            .attr("stop-color", this.end_color)
            .attr("stop-opacity", 1);

        legend
            .append("stop")
            .attr("offset", "100%")
            .attr("stop-color", this.start_color)
            .attr("stop-opacity", 1);

        // цвет градиента
        key.append("rect")
            .attr("width", this.widthLegend/2-10)
            .attr("height", this.height)
            .style("fill", "url(#gradient)")
            .attr("transform", "translate(0," + this.margin.top + ")");

        // //шкала
        let z = d3.scaleLinear()
            .range([this.height, 0])
            .domain([this.minValue, this.maxValue]);

        let yAxis = d3.axisRight(z)
            .scale(z)
            .ticks(10);

        key.append("g")
            .attr("class", "y axis")
            .attr("transform", "translate(41," + this.margin.top + ")")
            .call(yAxis)
    }
}