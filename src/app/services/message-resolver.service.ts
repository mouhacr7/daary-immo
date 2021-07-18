import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {LoadingController} from "@ionic/angular";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";
import { MessagesService } from './messages.service';

@Injectable({
  providedIn: 'root'
})
export class MessageResolverService implements Resolve<any>{

  constructor(
    private messageService: MessagesService,
    private loadingController: LoadingController) {
}

resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {

const id = route.params.id;

return this.messageService.MessageID(id).pipe(
tap(async () => {
    if (await this.loadingController.getTop()) {
        this.loadingController.dismiss().then();
    }
})
);
}
}
