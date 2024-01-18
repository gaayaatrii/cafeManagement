import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UserService } from 'src/app/services/user.service';
import { GlobalConstants } from 'src/app/shared/global-contsants';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.scss']
})
export class ManageUserComponent implements OnInit {

  displayedColumns: string[] = ['name', 'email', 'contactNumber', 'status'];
  dataSource: any;
  responseMessage: any;

  constructor(private ngxSerivse: NgxUiLoaderService,
    private userService: UserService,
    private snackbarService: SnackbarService,
  ) { }

  ngOnInit(): void {
    this.ngxSerivse.start();
    this.tableData();
  }

  tableData() {
    this.userService.getUser().subscribe((response: any) => {
      this.ngxSerivse.stop();
      this.dataSource = new MatTableDataSource(response);
    }, (error: any) => {
      this.ngxSerivse.stop();

      if (error.error?.message) {
        this.responseMessage = error.error?.message;
      } else {
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackbarService.openSnackbar(this.responseMessage, GlobalConstants.genericError);
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
  }

  onChange(status: any, id: any) {
    this.ngxSerivse.start();
    var data = {
      status: status.toString(),
      id: id
    };
    console.log("data " + data)
    this.userService.update(data).subscribe((response: any) => {
      this.ngxSerivse.stop();
      this.responseMessage = response?.message;
      console.log(" this.responseMessage " + JSON.stringify(this.responseMessage))
      this.snackbarService.openSnackbar(this.responseMessage, "success");

    }, (error: any) => {
      this.ngxSerivse.stop();
      console.log(error);
      if (error.error?.message) {
        this.responseMessage = error.error?.message;
      } else {
        this.responseMessage = GlobalConstants.genericError;
      }

      this.snackbarService.openSnackbar(this.responseMessage, GlobalConstants.genericError);
    })
  }
}
