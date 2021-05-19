import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Properties } from 'src/app/models/properties';
import { PropertiesService } from 'src/app/services/properties.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.page.html',
  styleUrls: ['./search-result.page.scss'],
})
export class SearchResultPage implements OnInit {
  like: boolean = false;
  count: number;
  purpose: any;
  city: any;
  type: any; 
  bedroom: any;
  bathroom: any;
  minprice: any;
  maxprice: any;
  minarea: any;
  maxarea: any;
  featured: any;
  propertiesList: Properties[] = [];
  showData: boolean = false;
  noResults: boolean = false;
  categorieTitle: string = '';
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private propertyService: PropertiesService) {
    this.route.queryParams.subscribe(() => {
      console.log(this.router.getCurrentNavigation().extras.state);
      if (this.router.getCurrentNavigation().extras.state) {
        this.purpose = this.router.getCurrentNavigation().extras.state.purpose;
        this.city = this.router.getCurrentNavigation().extras.state.city;
        this.type = this.router.getCurrentNavigation().extras.state.type;
        this.bedroom = this.router.getCurrentNavigation().extras.state.bedroom;
        this.bathroom = this.router.getCurrentNavigation().extras.state.bathroom;
        this.minprice = this.router.getCurrentNavigation().extras.state.minprice;
        this.maxprice = this.router.getCurrentNavigation().extras.state.maxprice;
        this.minarea = this.router.getCurrentNavigation().extras.state.minarea;
        this.maxarea = this.router.getCurrentNavigation().extras.state.maxarea;
        this.featured = this.router.getCurrentNavigation().extras.state.featured;

        let postData = new HttpParams()
        .set('purpose', this.purpose)
        .set('city', this.city)
        .set('type', this.type)
        .set('bedroom', this.bedroom)
        .set('bathroom', this.bathroom)
        .set('minprice', this.minprice)
        .set('maxprice', this.maxprice)
        .set('minarea', this.minarea)
        .set('maxarea', this.maxarea)
      
        this.propertyService.getFilteredProperties(postData).subscribe(async (data: Properties[]) => {
          this.propertiesList = data['properties'];
          this.showData = true;
          console.log( this.propertiesList.length);
          
          this.propertiesList.map( prop => {
            this.categorieTitle = prop.type;
          });
          if (this.propertiesList.length === 0) {
            this.categorieTitle = 'Resultats'
            this.noResults = true;
          } else {
            this.noResults = false;
          }
          console.log(this.categorieTitle);
        })
       }
    });
  }

  ngOnInit() {
    this.like = false;
  }
    //
    formatNumber(number) {
      number = number.toFixed(2) + '';
      let x = number.split('.');
      let x1 = x[0];
      let x2 = x.length > 1 ? '.' + x[1] : '';
      var rgx = /(\d+)(\d{3})/;
      while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
      }
      return x1;
    }
    existInfos(variables: any) {
      switch (variables) {
        case "0":
        return;
          break;
        case null:
         return;
          break;
        case undefined:
           return;
          break;
        case -1:
           return;
          break;
      
        default:
           return variables;
          break;
      }
    } 
    propertyDetails(id: number) {
      let navigationExtras: NavigationExtras = {
        state: {
          id: id
        }
      };
      this.router.navigate([`/property-details/`+id], navigationExtras);
    }

}
 
