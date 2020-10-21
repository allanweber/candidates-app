import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { RepositoriesComponent } from './repositories/repositories.component';
import { RepositoryRoutingModule } from './repository.routing';
import { RepositoryCardComponent } from './repository-card/repository-card.component';
import { RepositoryGraphComponent } from './repository-graph/repository-graph.component';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    RepositoriesComponent,
    RepositoryCardComponent,
    RepositoryGraphComponent,
  ],
  imports: [CommonModule, RepositoryRoutingModule, SharedModule, ChartsModule],
})
export class RepositoryModule {}
