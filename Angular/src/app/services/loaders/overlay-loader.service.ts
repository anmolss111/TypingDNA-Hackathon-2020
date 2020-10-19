import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OverlayLoaderService {

	isVisible: boolean = false;
	visibilityChange: Subject<boolean> = new Subject<boolean>();

	constructor() {

		this.visibilityChange.subscribe((value) => {

			this.isVisible = value
		});
	}

	show():any {

		this.visibilityChange.next(true);
	}

	hide():any {

		this.visibilityChange.next(false);
	}
}
