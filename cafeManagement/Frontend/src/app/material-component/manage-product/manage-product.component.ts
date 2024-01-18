import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ProductService } from 'src/app/services/product.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { GlobalConstants } from 'src/app/shared/global-contsants';
import { MatTableDataSource } from '@angular/material/table';
import { ProductComponent } from '../dialog/product/product.component';
import { ConfirmationComponent } from '../dialog/confirmation/confirmation.component';


@Component({
  selector: 'app-manage-product',
  templateUrl: './manage-product.component.html',
  styleUrls: ['./manage-product.component.scss']
})
export class ManageProductComponent implements OnInit {

  displayedColumns: string[] = ['name', 'categoryName', 'decsription', 'price', 'edit'];
  dataSource: any;
  responseMessage: any;
  length1: any;

  constructor(private productService: ProductService,
    private router: Router,
    private snackbarService: SnackbarService,
    public dialog: MatDialog,
    private ngxSerivse: NgxUiLoaderService) { }

  ngOnInit(): void {
    this.ngxSerivse.start();
    this.tableData();
  }

  tableData() {
    this.productService.getProducts().subscribe((response: any) => {
      this.ngxSerivse.stop();
      this.dataSource = new MatTableDataSource(response);
    }, (error:any) => {
      this.ngxSerivse.stop();
      if (error.error?.message) {
        this.responseMessage = error.error?.message;
      } else {
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackbarService.openSnackbar(this.responseMessage, GlobalConstants.genericError);
    })
  }

  applyFilter(event:Event)
  {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
  }

  handleAddAction()
  {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action: 'Add'
    };
    dialogConfig.width = "850px";
    const dialogRef = this.dialog.open(ProductComponent,dialogConfig);
    this.router.events.subscribe(()=>{
      dialogRef.close();
    });
    const sub = dialogRef.componentInstance.onAddProduct.subscribe((response) =>{
      this.tableData();
    })
  }

  handleEditAction(values:any){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action: 'Edit',
      data:values
    };
    dialogConfig.width = "850px";
    const dialogRef = this.dialog.open(ProductComponent,dialogConfig);
    this.router.events.subscribe(()=>{
      dialogRef.close();
    });
    const sub = dialogRef.componentInstance.onEditProduct.subscribe((response) =>{
      this.tableData();
    })
  }

  handleDeleteAction(values:any){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      message: 'delete '+values.name+'product',
      confirmation:true
    };
    const dialogRef = this.dialog.open(ConfirmationComponent,dialogConfig);
    const sub = dialogRef.componentInstance.onEmitStatusChange.subscribe((response) =>{
      this.ngxSerivse.start();
      this.deleteProduct(values.id);
      dialogRef.close();
    })
  }

  deleteProduct(id:any){
    console.log("inside delete product");
    this.productService.delete(id).subscribe((response:any)=>{
      console.log("inside delete product 1");
      this.ngxSerivse.stop();
      this.tableData();
      this.responseMessage = response?.message;
      this.snackbarService.openSnackbar(this.responseMessage,"success");
    },(error:any) => {
      this.ngxSerivse.stop();
      if (error.error?.message) {
        this.responseMessage = error.error?.message;
      } else {
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackbarService.openSnackbar(this.responseMessage, GlobalConstants.genericError);
    })
  }

  onChange(status:any,id:any){
    this.ngxSerivse.start();
    var data = {
      status: status.toString(),
      id:id
    };
    this.productService.updateStatus(data).subscribe((response:any)=>{
      this.ngxSerivse.stop();
      this.responseMessage = response?.message;
      console.log("this.responseMessage"+this.responseMessage)
      this.snackbarService.openSnackbar(this.responseMessage,"success");
    },(error:any) => {
      this.ngxSerivse.stop();

      if (error.error?.message) {
        this.responseMessage = error.error?.message;
      } else {
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackbarService.openSnackbar(this.responseMessage, GlobalConstants.genericError);
    })
  }
}
