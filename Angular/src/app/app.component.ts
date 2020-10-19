import { Component, OnInit } from '@angular/core';
import { OverlayLoaderService } from './services/loaders/overlay-loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'Angular';

    overlayLoader: boolean;

    constructor(private overlayLoaderService: OverlayLoaderService) {

        this.overlayLoaderService.visibilityChange.subscribe(value => {

			setTimeout(()=> {

                console.log(value)
				this.overlayLoader = value;
			},0);
		});
    }

    ngOnInit(){

    }
}
