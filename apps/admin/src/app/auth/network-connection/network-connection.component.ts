import { Component, OnInit, OnDestroy } from '@angular/core';
import {Location} from '@angular/common';
import {Router} from '@angular/router';
import {NetworkService} from '../../shared/services/network.service';

@Component({
  selector: 'online-farm-veggies-network-connection',
  templateUrl: './network-connection.component.html',
  styleUrls: ['./network-connection.component.scss']
})
export class NetworkConnectionComponent implements OnInit, OnDestroy {

  constructor(private router: Router,
    private loc: Location,
    private network: NetworkService) {
}

ngOnInit() {
this.network.isActive = true;
}

reload() {
if (window.navigator.onLine) {
this.router.navigateByUrl(this.loc.path(true));
}
}

ngOnDestroy(): void {
this.network.isActive = false;
}
}
