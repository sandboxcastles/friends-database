import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import * as d3 from 'd3';
import { asyncScheduler } from 'rxjs';

@Component({
  selector: 'mfdb-scatter-chart',
  templateUrl: './scatter-chart.component.html',
  styleUrls: ['./scatter-chart.component.scss'],
})
export class ScatterChartComponent implements OnInit {
  @ViewChild('scatterGraph') scatterGraph!: ElementRef<any>;
  @Input() data: any[] = [];

  @Input() determineDataTitle: null | ((d: any) => string) = null;
  @Input() determineDataValueXAxis: null | ((d: any) => any) = null;
  @Input() determineDataValueYAxis: null | ((d: any) => any) = null;
  @Input() yAxisTitle: string = '';
  @Input() xAxisTitle: string = '';
  @Input() dataTitleProp: string = '';
  @Input() dataValueXAxisProp: string = '';
  @Input() dataValueYAxisProp: string = '';
  @Input() lowXValue!: number;
  @Input() highXValue!: number;
  @Input() lowYValue!: number;
  @Input() highYValue!: number;
  @Input() pointColor = '#69b3a2';

  private svg!: any;
  private margin = 50;
  private width = 750 - this.margin * 2;
  private height = 400 - this.margin * 2;

  constructor() {}

  ngOnInit(): void {
    asyncScheduler.schedule(() => {
      this.createSvg();
      this.drawPlot(this.data);
    });
  }

  createSvg(): void {
    this.svg = d3
      .select(this.scatterGraph.nativeElement)
      .html('')
      .append('svg')
      .attr('width', this.width + this.margin * 2)
      .attr('height', this.height + this.margin * 2)
      .append('g')
      .attr('transform', 'translate(' + this.margin + ',' + this.margin + ')');
  }
  drawPlot(data: any[]): void {
    // Add X axis
    const lowX =
      this.lowXValue ??
      Math.min(
        ...data.map(
          (d) => this.determineDataValueXAxis?.(d) ?? d[this.dataValueXAxisProp]
        )
      );
    const highX =
      this.highXValue ??
      Math.max(
        ...data.map(
          (d) => this.determineDataValueXAxis?.(d) ?? d[this.dataValueXAxisProp]
        )
      );
    const x = d3.scaleLinear().domain([lowX, highX]).range([0, this.width]);
    this.svg
      .append('g')
      .attr('transform', 'translate(0,' + this.height + ')')
      .call(d3.axisBottom(x).tickFormat(d3.format('d')));

    // Add Y axis
    const lowY =
      this.lowYValue ??
      Math.min(
        ...data.map(
          (d) => this.determineDataValueYAxis?.(d) ?? d[this.dataValueYAxisProp]
        )
      );
    const highY =
      this.highYValue ??
      Math.max(
        ...data.map(
          (d) => this.determineDataValueYAxis?.(d) ?? d[this.dataValueYAxisProp]
        )
      );
    const y = d3.scaleLinear().domain([lowY, highY]).range([this.height, 0]);
    this.svg.append('g').call(d3.axisLeft(y));

    // Add dots
    const dots = this.svg.append('g');
    dots
      .selectAll('dot')
      .data(data)
      .enter()
      .append('circle')
      .attr('cx', (d: any) =>
        x(this.determineDataValueXAxis?.(d) ?? d[this.dataValueXAxisProp])
      )
      .attr('cy', (d: any) =>
        y(this.determineDataValueYAxis?.(d) ?? d[this.dataValueYAxisProp])
      )
      .attr('r', 7)
      .style('opacity', 0.5)
      .style('fill', this.pointColor);

    // Add labels
    dots
      .selectAll('text')
      .data(data)
      .enter()
      .append('text')
      .text((d: any) => this.determineDataTitle?.(d) ?? d[this.dataTitleProp])
      .attr('x', (d: any) =>
        x(this.determineDataValueXAxis?.(d) ?? d[this.dataValueXAxisProp])
      )
      .attr('y', (d: any) =>
        y(this.determineDataValueYAxis?.(d) ?? d[this.dataValueYAxisProp])
      );
  }
}
