import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReportService } from '../../../shared/services/report.service';

@Component({
  selector: 'app-revenue-reports',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './revenue-reports.html'
})
export class RevenueReportsComponent {
  private reportService = inject(ReportService);

  startDate: string = '';
  endDate: string = '';
  periodError = '';

  exportPeriod() {
    this.periodError = '';
    if (this.startDate && this.endDate && this.startDate > this.endDate) {
      this.periodError = 'Data inicial não pode ser maior que a data final.';
      return;
    }
    this.reportService.generateRevenueByPeriodPDF(this.startDate, this.endDate);
  }

  exportCategory() {
    this.reportService.generateRevenueByCategoryPDF();
  }
}
