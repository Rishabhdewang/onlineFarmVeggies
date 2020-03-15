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
import {  FileUploader } from 'ng2-file-upload/ng2-file-upload';

const URL = 'http://localhost:8000/api/farmer';
@Component({
  selector: 'online-farm-veggies-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  public uploader:FileUploader = new FileUploader({url: URL, itemAlias: 'profile_image'});

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
      profile_pic : File,
      address: this.fb.group({
        address1: [""],
        city: [""],
        state: [""],
        pinCode: [""],
      })
    });
    this.uploader.onAfterAddingFile = (file)=> { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
      console.log("Image Upload:uploaded:", item, status, response);
    };
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
    console.log(this.updateForm.value);
    let inputEl: HTMLInputElement = this.el.nativeElement.querySelector('#profile_image');
    let fileCount: number = inputEl.files.length;
    // console.log(inputEl.files);
    fileCount > 0 ? this.updateForm.value.profile_pic = this.image : "";
    if(this.updateForm.valid){
      let updateData = this.updateForm.value;
      console.log(updateData)
      this.loader.start();
      this.profileService.updateFarmer(updateData).subscribe(
      (success: any) => {
        // console.log("this is success: " + JSON.stringify(success));

        // localStorage.setItem("token", success.headers.get("Authorization"));
        // console.log(localStorage.getItem('token'));
        // console.log(success.body.data);
        // this.farmer = success.body.data;
        this.router.navigateByUrl(`/farmer/dashboard/user-profile`);
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
