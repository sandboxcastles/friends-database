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
  selector: 'mfdb-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss'],
})
export class BarChartComponent implements OnChanges {
  @ViewChild('barChart') barChart!: ElementRef<any>;
  @Input() data: any[] = [];
  @Input() chartTitle: string = 'Bar Chart';
  @Input() margin = 50;
  @Input() width = 500;
  @Input() height = 500;

  @Input() determineDataTitle: null | ((d: any) => string) = null;
  @Input() determineDataValue: null | ((d: any) => any) = null;

  @Input() dataTitleProp: string = '';
  @Input() dataValueProp: string = '';

  @Input() getTopGraphNumber: (topNum: number) => number = (topNum) =>
    numberToNearest(topNum, 10);

  @Input() barColor = '#d04a35';

  @Input() largeToSmall = true;

  graphWidth: number = this.width - this.margin * 2;
  graphHeight: number = this.height - this.margin * 2;

  private svg!: any;

  ngOnChanges(sc: SimpleChanges): void {
    const marginChange = sc['margin'];
    const margin = marginChange ? marginChange.currentValue : this.margin;

    const widthChange = sc['width'];
    if (widthChange || marginChange) {
      this.graphHeight = this.getUpdatedDimensionValue(
        widthChange?.currentValue ?? this.width,
        margin
      );
    }

    const heightChange = sc['height'];
    if (heightChange || marginChange) {
      this.graphHeight = this.getUpdatedDimensionValue(
        heightChange?.currentValue ?? this.height,
        margin
      );
    }

    const dataChange = sc['data'];
    if (dataChange) {
      asyncScheduler.schedule(() => {
        this.svg = this.createSvg();
        const barData = [...dataChange.currentValue].sort((a: any, b: any) =>
          this.largeToSmall
            ? this.determineDataValue?.(b) ??
              b[this.dataValueProp] - this.determineDataValue?.(a) ??
              a[this.dataValueProp]
            : this.determineDataValue?.(a) ??
              a[this.dataValueProp] - this.determineDataValue?.(b) ??
              b[this.dataValueProp]
        );
        this.drawBars(barData);
      });
    }
  }

  private getUpdatedDimensionValue(dimension: number, margin: number): number {
    return dimension - margin * 2;
  }

  private createSvg() {
    return d3
      .select(this.barChart.nativeElement)
      .html('')
      .append('svg')
      .attr('width', this.graphWidth + this.margin * 2)
      .attr('height', this.graphHeight + this.margin * 2)
      .append('g')
      .attr('transform', 'translate(' + this.margin + ',' + this.margin + ')');
  }

  private drawBars(data: any[]): void {
    const x = this.getXScale(
      data.map(
        (d) => this.determineDataTitle?.(d) ?? d[this.dataTitleProp] ?? ''
      ),
      this.graphWidth
    );
    this.drawXAxis(this.svg, x, this.graphHeight);

    const y = this.getYScale(data);
    this.drawYAxis(this.svg, y);

    const bars = this.createBars(this.svg, data, x, y);
    this.fillBars(bars, this.barColor);
  }

  private getXScale(data: string[], width: number): d3.ScaleBand<string> {
    return d3.scaleBand().range([0, width]).domain(data).padding(0.2);
  }

  private drawXAxis(
    svg: any,
    x: d3.ScaleBand<string>,
    graphHeight: number
  ): void {
    // Draw the X-axis on the DOM
    svg
      .append('g')
      .attr('transform', 'translate(0,' + graphHeight + ')')
      .call(d3.axisBottom(x))
      .selectAll('text')
      .attr('transform', 'translate(-10,0)rotate(-45)')
      .style('text-anchor', 'end');
  }

  private getYScale(data: any[]): d3.ScaleLinear<number, number, never> {
    const topValue = Math.max(
      ...data.map((v) => this.determineDataValue?.(v) ?? v[this.dataValueProp])
    );

    // Create the Y-axis scale
    return d3
      .scaleLinear()
      .domain([0, this.getTopGraphNumber?.(topValue) ?? 100])
      .range([this.graphHeight, 0]);
  }

  private drawYAxis(svg: any, y: d3.ScaleLinear<number, number, never>): void {
    svg.append('g').call(d3.axisLeft(y));
  }

  private createBars(
    svg: any,
    data: any[],
    x: d3.ScaleBand<string>,
    y: d3.ScaleLinear<number, number, never>
  ): any {
    return svg
      .selectAll('bars')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', (d: any) =>
        x(this.determineDataTitle?.(d) ?? d[this.dataTitleProp] ?? '')
      )
      .attr('y', (d: any) =>
        y(this.determineDataValue?.(d) ?? d[this.dataValueProp] ?? 0)
      )
      .attr('width', x.bandwidth())
      .attr(
        'height',
        (d: any) => this.graphHeight - y(d[this.dataValueProp] ?? 0)
      );
  }

  private fillBars(bars: any, color: string): any {
    return bars.attr('fill', color);
  }
}

export const numberToNearest = (num: number, increment: number) =>
  num + (increment - (num % increment));
