import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Properties } from 'src/app/models/properties';
import { PropertiesService } from 'src/app/services/properties.service';

@Component({
  selector: 'app-ag-properties',
  templateUrl: './ag-properties.component.html',
  styleUrls: ['./ag-properties.component.scss'],
})
export class AgPropertiesComponent implements OnInit {
  agent: any;
  propertiesList: Properties[] = [];
  property: Properties;
  showData = false;
  loading: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private propertyService: PropertiesService
  ) { }

  ngOnInit() {
    this.route.data.subscribe((data: { agent : any }) => {
      this.agent = data.agent.agent[0];
     console.log(this.agent);
    });

    this.propertyService.getPosts().subscribe(async (data: Properties[]) => {
      this.propertiesList = data['properties'];
      this.propertiesList.map( prop => {
       console.log(prop);
      });
    })
  }
}
