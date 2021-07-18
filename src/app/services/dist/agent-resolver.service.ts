import { UserService } from 'src/app/services/user.service';
import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {LoadingController} from "@ionic/angular";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class AgentResolverService implements Resolve<any> {

    constructor(private userService: UserService,
                private loadingController: LoadingController) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {

        const id = route.params.id;

        return this.userService.getSingleAgent(id).pipe(
            tap(async () => {
                if (await this.loadingController.getTop()) {
                    this.loadingController.dismiss().then();
                }
            })
        );
    }
}
