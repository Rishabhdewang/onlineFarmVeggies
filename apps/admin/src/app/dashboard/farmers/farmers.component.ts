import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AdminFarmerService } from "../../shared/services/admin-farmer.service";
import Swal from "sweetalert2";
import { Router } from '@angular/router';
@Component({
  selector: 'online-farm-veggies-farmers',
  templateUrl: './farmers.component.html',
  styleUrls: ['./farmers.component.scss']
})
export class FarmersComponent implements OnInit {

  farmers : [];
  constructor(
    private loader : NgxUiLoaderService,
    private farmerService : AdminFarmerService,
    private router : Router
  ) { }

  ngOnInit(): void {
    this.getFarmers();
  }

  getFarmers(){
    this.loader.start();
    this.farmerService.getFarmerList().subscribe(
      (success: any) => {
        // console.log("this is success: " + JSON.stringify(success));

        // localStorage.setItem("token", success.headers.get("Authorization"));
        this.farmers = success.body.data;
        
        console.log(this.farmers);
        this.loader.stop();
      },
      error => {
        this.loader.stop();
      }
    );
  }
}
