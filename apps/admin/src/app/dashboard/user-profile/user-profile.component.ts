import {
  Component,
  OnInit,ElementRef, Input
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  FormControl,
  Validators
} from '@angular/forms';
import {
  Update
} from "./updateForm";
import {
  ProfileService
} from '../../shared/services/profile.service';
import Swal from "sweetalert2";
import {
  Router
} from "@angular/router";
import {
  NgxUiLoaderService
} from 'ngx-ui-loader';

@Component({
  selector: 'online-farm-veggies-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  farmer;
  image;
  change: boolean = false;
  constructor(
    private profileService: ProfileService,
    private fb: FormBuilder,
    private router: Router,
    private loader: NgxUiLoaderService, 
    private el: ElementRef
  ) {}
  updateForm: FormGroup;

  ngOnInit(): void {
    this.updateForm = this.fb.group({
      name: [""],
      email: [""],
      mobile_no: [""],
      profile_pic : [""],
      address: this.fb.group({
        address1: [""],
        city: [""],
        state: [""],
        pinCode: [""],
      })
    });
    this.getFarmer()
  }

  uploadFile(event) {
    this.image = event.target.files[0];
    let label = document.getElementById("custom-file-label");
    label.innerHTML = this.image.name;
  }

  showForm() {
    if (this.change == false) {
      this.change = true;
    } else if (this.change == true) {
      this.change = false;
    }
  }

  getFarmer() {
    this.loader.start();
    this.profileService.getFarmer().subscribe(
      (success: any) => {
        // console.log("this is success: " + JSON.stringify(success));

        // localStorage.setItem("token", success.headers.get("Authorization"));
        // console.log(localStorage.getItem('token'));
        console.log(success.body.data);
        this.farmer = success.body.data;
        // this.router.navigateByUrl(`/dashboard/product`);
        // Swal.fire("Product","Welcome to Dashbord","success");
        // alertFunctions.typeSuccess();
        this.loader.stop();
      },
      error => {
        console.log(error);
        // Swal.fire("Opps... Login Failed","Please provide correct credential","error");
        this.loader.stop();
      }
    );
  }

  onSubmit(){
    console.log(JSON.stringify(this.updateForm.value));
    let formData: FormData = new FormData();
    formData.append("name", JSON.stringify(this.updateForm.value));
    formData.append("profile_pic",this.image,this.image.name);
    console.log(formData);
    
    if(this.updateForm.valid){
      let updateData = this.updateForm.value;
      // console.log(updateData)
      this.loader.start();
      this.profileService.updateFarmer(formData).subscribe(
      (success: any) => {
        // console.log("this is success: " + JSON.stringify(success));

        // localStorage.setItem("token", success.headers.get("Authorization"));
        // console.log(localStorage.getItem('token'));
        // console.log(success.body.data);
        // this.farmer = success.body.data;
        this.router.navigateByUrl(`/admin/dashboard/user-profile`);
        Swal.fire("Profile Updated","","success");
        // alertFunctions.typeSuccess();
        this.loader.stop();
      },
      error => {
        console.log(error);
        // Swal.fire("Opps... Login Failed","Please provide correct credential","error");
        this.loader.stop();
      }
    );
    }
  }

}
