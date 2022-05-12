import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetailRoutingModule } from './detail-routing.module';

import { DetailComponent } from './detail.component';
import { SharedModule } from '../shared/shared.module';
import { DataViewComponent } from './data-view/data-view.component';
import { DynamicTreatmentViewComponent } from './dynamic-treatment-view/dynamic-treatment-view.component';
import { InstallServiceViewComponent } from './install-service-view/install-service-view.component';
import { MatCardModule } from '@angular/material/card'
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule } from '@angular/material/table';
import { UvaEventTable } from '../shared/components/uva-event-table/uva-event-table.component';
import { UvaAqGraphComponent } from '../shared/components/uva-aq-graph/uva-aq-graph.component';
import { NgChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [DetailComponent, DataViewComponent, DynamicTreatmentViewComponent, InstallServiceViewComponent, UvaEventTable, UvaAqGraphComponent],
  imports: [CommonModule, SharedModule, DetailRoutingModule, MatCardModule, MatProgressBarModule, MatTableModule, NgChartsModule]
})
export class DetailModule {}
