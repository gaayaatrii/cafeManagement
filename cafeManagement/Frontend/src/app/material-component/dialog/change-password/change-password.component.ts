import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UserService } from 'src/app/services/user.service';
import { GlobalConstants } from 'src/app/shared/global-contsants';
import { SignupComponent } from 'src/app/signup/signup.component';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  oldPassword=true;
  newPassword=true;
  confirmPassword=true;
  changePasswordForm:any=FormGroup;
  responseMessage:any;
  
  constructor(private formBuilder:FormBuilder,
    private userService: UserService,
    public dialogRef: MatDialogRef<SignupComponent>,
    private ngxSerivse: NgxUiLoaderService,   
    private snackbarService: SnackbarService,
    ) { }

  ngOnInit(): void {
    this.changePasswordForm = this.formBuilder.group({
      oldPassword:[null,Validators.required],
      newPassword:[null,Validators.required],
      confirmPassword:[null,Validators.required]
    })
  }

  validateSubmit()
  {
    if(this.changePasswordForm.controls['newPassword'].value != this.changePasswordForm.controls['confirmPassword'].value)
    {
      return true;
    }else {
      return false;
    }
  }

  handlepasswordChangeSubmit()
  {
    this.ngxSerivse.start();
    var formData = this.changePasswordForm.value;
    var data = {
      oldPassword:formData.oldPassword,
      newPassword:formData.newPassword,
      confirmPassword:formData.confirmPassword
    }
    this.userService.changePassword(data).subscribe((response:any)=>{
      this.ngxSerivse.stop();
      this.responseMessage =  response?.message;
      this.dialogRef.close();
      this.snackbarService.openSnackbar(this.responseMessage,"success");
    },(error)=>{
      console.log(error);
      this.ngxSerivse.stop();
      if(error.error?.message)
      {
        this.responseMessage = error.error?.message;
      }else{
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackbarService.openSnackbar(this.responseMessage,GlobalConstants.genericError);
    })
  }
}
