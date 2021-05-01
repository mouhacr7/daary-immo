import { LoadingServiceService } from './../../services/loading-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading-component',
  templateUrl: './loading-component.component.html',
  styleUrls: ['./loading-component.component.scss'],
})
export class LoadingComponentComponent implements OnInit {

  constructor(
    public loadingService: LoadingServiceService
  ) { }

  ngOnInit() {}

}
