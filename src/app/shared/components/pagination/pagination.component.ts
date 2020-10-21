import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { PaginationConfig } from './model/pagination-config.model';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit, OnChanges {
  @Input() config: PaginationConfig;
  currentPage = 1;
  totalPages: number;
  @Output() pageChanged: EventEmitter<number> = new EventEmitter<number>();

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.config.currentValue) {
      this.totalPages =
        Math.floor(this.config.total / this.config.pageSize) +
        (this.config.total % this.config.pageSize > 0 ? 1 : 0);
    }
  }

  ngOnInit(): void {}

  clickPrevious(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.dispatchPageChange();
    }
  }

  clickNext(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.dispatchPageChange();
    }
  }

  get previousIsDisabled(): boolean {
    return this.currentPage === 1 ? true : null;
  }

  get nextIsDisabled(): boolean {
    return this.currentPage === this.totalPages ? true : null;
  }

  private dispatchPageChange(): void {
    // Emit this.currentPage - 1 because consumer expects the offset
    this.pageChanged.emit(this.currentPage - 1);
  }
}
