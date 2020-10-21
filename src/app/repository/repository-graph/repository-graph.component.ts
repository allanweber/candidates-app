import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Language } from './../../shared/model/repository.model';

@Component({
  selector: 'app-repository-graph',
  templateUrl: './repository-graph.component.html',
  styleUrls: ['./repository-graph.component.scss'],
})
export class RepositoryGraphComponent implements OnChanges {
  @Input() languages: Language[];

  public pieChartPlugins = [pluginDataLabels];
  public barChartOptions = {
    responsive: true,
    legend: {
      position: 'left',
    },
    plugins: {
      datalabels: {
        // tslint:disable-next-line: typedef
        formatter(value: string, context: any) {
          return '';
        },
      },
    },
  };

  public barChartLabels = [];
  public barChartType = 'pie';
  public barChartLegend = true;
  public barChartData = [{ data: [], label: 'Series A' }];

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.languages.currentValue) {
      if (this.languages.length > 0) {
        this.languages.forEach((lang) => {
          this.barChartLabels.push(lang.name);
          this.barChartData[0].data.push(lang.proportion);
        });
      } else {
        this.barChartLabels.push('Sem linguagens');
        this.barChartData[0].data.push(100);
      }
    }
  }
}
