import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpParams, HttpRequest, HttpResponse, HttpHeaders } from "@angular/common/http";
declare var TypingDNA: any;
import { OverlayLoaderService } from './../../services/loaders/overlay-loader.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

	form: FormGroup;
	tdna: any;

	constructor(private router: Router, private http: HttpClient, private overlayLoaderService: OverlayLoaderService) { }

	ngOnInit(): void {

		let formGroup = {};

		formGroup['email'] = new FormControl('');
		formGroup['password'] = new FormControl('');

		this.tdna = new TypingDNA();
		this.tdna.addTarget("password");

		this.form = new FormGroup(formGroup);
	}

	submit() {

		let tp = this.tdna.getTypingPattern({targetId: "password"});

		let data = {

			'email': this.form.value.email,
			'password': this.form.value.password,
			'tp': tp
		}

		this.overlayLoaderService.show();

		this.http.request(new HttpRequest('POST', 'http://localhost:8000/backend/auth/signup', data))
			.subscribe((response) => {

				if(response instanceof HttpResponse){

					if(response.body['status'] == 'success'){

						localStorage.setItem('accessToken', response.body['accessToken']);
						delete response.body['accessToken'];
						this.overlayLoaderService.hide();
						this.router.navigate(['commands']);
					}
				}
			},
			(error) => {

				console.log(error)
				this.overlayLoaderService.hide();
			});
	}

	login(){

		this.router.navigate(['login']);
	}

}
