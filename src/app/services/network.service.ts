import { Network } from '@ionic-native/network/ngx';
import { Injectable } from '@angular/core';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {

  private readonly REFRESH_TYPES = new Set(['4g', 'wifi']);
	private lastType: string = null;
	public refresh$ = this.network.onChange().pipe(
		filter(() => {
			const currentType = this.network.type;
			const changed = (this.lastType !== currentType);
			const refreshType = this.REFRESH_TYPES.has(currentType);
			const lastRefreshType = this.REFRESH_TYPES.has(this.lastType);
			const pass = this.lastType && changed && refreshType && (!lastRefreshType);
			this.lastType = currentType;
			return pass;
		}),
	);

	constructor(private network: Network) { }

}
