import { PropertiesService } from './properties.service';
import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {LoadingController} from "@ionic/angular";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class PropertyResolverService implements Resolve<any> {

    constructor(private propertiesService: PropertiesService,
                private loadingController: LoadingController) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {

        const id = route.params.id;

        return this.propertiesService.getSingleProperty(id).pipe(
            tap(async () => {
                
            })
        );
    }
}
