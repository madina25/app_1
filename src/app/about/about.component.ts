import {Component, OnInit} from "@angular/core";
import * as d3 from 'd3';

interface ChartPoint {
    x: number,
    y: number
}

@Component({
    selector: 'about-app',
    templateUrl: 'about.component.html',
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
        let svg = d3.select("#chart").append("svg")
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

        for (let i=0; i< Object.keys(this.rawData).length; i++){
            this.data.push({x: scaleX(this.rawData[i].x) +this.margin, y: scaleY(this.rawData[i].y) + this.margin})
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
            .attr("class", "dot")
            .attr("r", 3.5)
            .attr("cx", ((d:ChartPoint)=>scaleX(d.x)+this.margin))
            .attr("cy", ((d:ChartPoint)=>scaleY(d.y)+this.margin))

    }
}