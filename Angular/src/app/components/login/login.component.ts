import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpParams, HttpRequest, HttpResponse, HttpHeaders } from "@angular/common/http";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { OverlayLoaderService } from './../../services/loaders/overlay-loader.service';
declare var TypingDNA: any;

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	form: FormGroup;
	tdna: any;

	constructor(private router: Router, private http: HttpClient, public dialog: MatDialog, private overlayLoaderService: OverlayLoaderService) { }

	ngOnInit(): void {

		let formGroup = {};

		formGroup['email'] = new FormControl('');
		formGroup['password'] = new FormControl('');

		this.tdna = new TypingDNA();
		this.tdna.addTarget("password");

		this.form = new FormGroup(formGroup);

		(window as any).webkit.messageHandlers.jsHandler.postMessage([]);
	}

	submit() {

		let tp = this.tdna.getTypingPattern({targetId: "password"});

		let data = {

			'email': this.form.value.email,
			'password': this.form.value.password,
			'tp': tp
		}

		console.log(data)

		this.overlayLoaderService.show();

		this.http.request(new HttpRequest('POST', 'http://localhost:8000/backend/auth/login', data))
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

				if(error instanceof HttpErrorResponse){

					this.overlayLoaderService.hide();
					this.openDialog(error.error['message']);

				}
			});
	}

	openDialog(message): void {
		const dialogRef = this.dialog.open(AlertBox, {
			width: '250px',
			data: { message: message }
		});

		dialogRef.afterClosed().subscribe(result => {
			console.log('The dialog was closed');
		});
	}

	signup(){

		this.router.navigate(['signup']);
	}
}

@Component({
	selector: 'alert-box',
	templateUrl: './alert-box.html',
})
export class AlertBox {

	constructor(public dialogRef: MatDialogRef<AlertBox>, @Inject(MAT_DIALOG_DATA) public data: any) {}

	onNoClick(): void {
		this.dialogRef.close();
	}
}
