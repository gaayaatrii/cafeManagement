import { Component, AfterViewInit } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from '../services/snackbar.service';
import { error } from 'console';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { GlobalConstants } from '../shared/global-contsants';
@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements AfterViewInit {

	responseMessage: any;
	data: any;

	ngAfterViewInit() { }

	constructor(private dashboardService: DashboardService,
		private ngxService: NgxUiLoaderService,
		private snackbarService: SnackbarService
	) {
		this.ngxService.start();
		this.dashboardData();
	}

	dashboardData() {
		this.dashboardService.getDeatils().subscribe((response: any) => {
			this.ngxService.stop();
			this.data = response;
		}, (error: any) => {
			this.ngxService.stop();
			console.log(error);
			if (error.error?.message) {
				this.responseMessage = error.error?.message;
			} else {
				this.responseMessage = GlobalConstants.genericError;
			}
			this.snackbarService.openSnackbar(this.responseMessage, GlobalConstants.error);

		}
		)
	}

}
