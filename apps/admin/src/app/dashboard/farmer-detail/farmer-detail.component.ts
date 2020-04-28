import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';
import   Swal from "sweetalert2";
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AdminFarmerService } from '../../shared/services/admin-farmer.service';

@Component({
  selector: 'online-farm-veggies-farmer-detail',
  templateUrl: './farmer-detail.component.html',
  styleUrls: ['./farmer-detail.component.scss']
})
export class FarmerDetailComponent implements OnInit {

  farmerId;
  farmer;

  constructor(
    private location:Location,
    private farmerService : AdminFarmerService,
    private router : Router,
    private loader : NgxUiLoaderService,
    private activatedRoute:ActivatedRoute
  ) { 
    this.activatedRoute.params.subscribe( params => this.farmerId = params.id );
  }

  ngOnInit(): void {
    this.farmerDetail();
  }

  changeVerification(status){
    if(this.farmerId){
      let formData = {
        "id" : Number(this.farmerId),
        "name" : this.farmer.name,
        "isAdminVerified" : status
      }
      // formData = JSON.stringify(formData);
      console.log(formData);
      
      this.loader.start();
      this.farmerService.verification(formData).subscribe(
        (success: any) => {
          this.farmerDetail();
          this.loader.stop();
        },
        error => {
          this.loader.stop();
        }
      );
    }
  }

  farmerDetail(){
    if(this.farmerId){
    this.loader.start();
      this.farmerService.getFarmerDetail(this.farmerId).subscribe(
        (success: any) => {
          console.log(success.body.data);
          this.farmer = success.body.data[0];
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

  removeFarmer(){
    if(this.farmerId){
      this.loader.start();
      this.farmerService.removeFarmer(this.farmerId).subscribe(
        (success: any) => {
          this.router.navigateByUrl("/admin/dashboard/farmers");
          this.loader.stop();
        },
        error => {
          this.loader.stop();
        }
      );
    }
}
}
