import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import * as d3 from 'd3';
import { asyncScheduler } from 'rxjs';

@Component({
  selector: 'mfdb-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss'],
})
export class PieChartComponent implements OnChanges {
  @ViewChild('pieChart') pieChart!: ElementRef<any>;
  @Input() data: any[] = [];
  @Input() determineDataTitle: null | ((d: any) => string) = null;
  @Input() determineDataValue: null | ((d: any) => any) = null;
  @Input() dataTitleProp: string = '';
  @Input() dataValueProp: string = '';
  @Input() chartTitle: string = 'Pie Chart';
  @Input() width = 500;
  @Input() height = 500;
  @Input() margin = 50;

  private colors!: d3.ScaleOrdinal<string, unknown, never>;
  private radius = Math.min(this.width, this.height) / 2 - this.margin;
  private svg!: any;

  ngOnChanges(sc: SimpleChanges): void {
    if (sc['data']) {
      asyncScheduler.schedule(() => {
        this.createSvg();
        this.createColors();
        this.drawChart();
      });
    }
  }

  private createSvg(): void {
    this.svg = d3
      .select(this.pieChart.nativeElement)
      .html('')
      .append('svg')
      .attr('width', this.width)
      .attr('height', this.height)
      .append('g')
      .attr(
        'transform',
        'translate(' + this.width / 2 + ',' + this.height / 2 + ')'
      );
  }

  private createColors(): void {
    this.colors = d3
      .scaleOrdinal()
      .domain(
        this.data.map(
          (d) =>
            this.determineDataValue?.(d) ?? d[this.dataValueProp].toString()
        )
      )
      .range(['blue', 'green', 'yellow', 'pink', 'red']);
  }

  private drawChart(): void {
    // Compute the position of each group on the pie:
    const pie = d3
      .pie<any>()
      .value((d: any) =>
        Number(this.determineDataValue?.(d) ?? d[this.dataValueProp])
      );

    // Build the pie chart
    this.svg
      .selectAll('pieces')
      .data(pie(this.data))
      .enter()
      .append('path')
      .attr('d', d3.arc().innerRadius(0).outerRadius(this.radius))
      .attr('fill', (d: any, i: any) => this.colors(i))
      .attr('stroke', '#121926')
      .style('stroke-width', '1px');

    // Add labels
    const labelLocation = d3
      .arc()
      .innerRadius(this.radius * 0.5)
      .outerRadius(this.radius);

    this.svg
      .selectAll('pieces')
      .data(pie(this.data))
      .enter()
      .append('text')
      .text(
        (d: any) =>
          this.determineDataTitle?.(d.data) ?? d.data[this.dataTitleProp]
      )
      .attr('fill', 'gray')
      .attr('stroke', 'black')
      .style('stroke-width', '1px')
      .attr(
        'transform',
        (d: any) => 'translate(' + labelLocation.centroid(d) + ')'
      )
      .style('text-anchor', 'middle')
      .style('font-size', 15);
  }
}
