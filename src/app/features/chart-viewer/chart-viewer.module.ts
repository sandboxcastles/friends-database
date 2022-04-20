import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from 'src/app/material/material.module';
import { ChartViewerComponent } from './chart-viewer.component';
import { BarChartComponent } from './components/charts/bar-chart/bar-chart.component';
import { PieChartComponent } from './components/charts/pie-chart/pie-chart.component';

const routes: Routes = [{ path: '', component: ChartViewerComponent }];

@NgModule({
  declarations: [ChartViewerComponent, BarChartComponent, PieChartComponent],
  imports: [CommonModule, RouterModule.forChild(routes), MaterialModule],
})
export class ChartViewerModule {}
