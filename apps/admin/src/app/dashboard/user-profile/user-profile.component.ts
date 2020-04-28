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

  admin;
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
      profile_pic : [""],
      address: this.fb.group({
        address1: [""],
        city: [""],
        state: [""],
        pinCode: [""],
      })
    });
    this.getAdmin()
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

  getAdmin() {
    this.loader.start();
    this.profileService.getadmin().subscribe(
      (success: any) => {

        console.log(success.body.data);
        this.admin = success.body.data;

        this.loader.stop();
      },
      error => {
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
      this.profileService.updateAdmin(formData).subscribe(
      (success: any) => {
        this.router.navigateByUrl(`/admin/dashboard/user-profile`);
        Swal.fire("Profile Updated","","success");
        this.loader.stop();
      },
      error => {
        this.loader.stop();
      }
    );
    }
  }

}
