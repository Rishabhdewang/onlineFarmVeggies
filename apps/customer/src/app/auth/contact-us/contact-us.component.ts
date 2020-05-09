import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgxUiLoaderService } from "ngx-ui-loader";
import { AuthService } from "../../shared/auth/auth.service";
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
import { DataService } from '../../shared/services/data.service';


@Component({
  selector: 'online-farm-veggies-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {

  isSubmitted: boolean = false;
  public error;

  constructor(
    private router: Router,
    private loader : NgxUiLoaderService,
    private authService : AuthService,
    // private dataService : DataService
  ) { }
  contactUsForm = new FormGroup({
    email: new FormControl("", [Validators.required,Validators.email]),
    name: new FormControl("", [Validators.required]),
    query : new FormControl("",[Validators.required])
  });

  ngOnInit(): void {
  }

   check_login() {
    this.error = "";
  }

  onSubmit(){
    if(this.contactUsForm.valid){
      let contactUsData = this.contactUsForm.value;
      this.loader.start();
      this.authService.sendContactEmail(contactUsData).subscribe(
        (success: any) => {
          this.router.navigateByUrl(`/`);
          Swal.fire("Query has been submitted","We will connect to you via email","success");
          this.loader.stop();
        },
        error => {
          this.loader.stop();
        }
      );
      this.contactUsForm.reset();
      this.isSubmitted = false;
    }
  }


}