import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
declare var TypingDNA: any;
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { HttpClient, HttpErrorResponse, HttpParams, HttpRequest, HttpResponse, HttpHeaders } from "@angular/common/http";
import { OverlayLoaderService } from './../../services/loaders/overlay-loader.service';

@Component({
  selector: 'app-alert-box-password',
  templateUrl: './alert-box-password.component.html',
  styleUrls: ['./alert-box-password.component.css']
})
export class AlertBoxPasswordComponent implements OnInit {

	form: FormGroup;
	tdna: any;

	constructor(public dialogRef: MatDialogRef<AlertBoxPasswordComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private http: HttpClient, private overlayLoaderService: OverlayLoaderService) {}

	onNoClick(): void {
		this.dialogRef.close();
	}

	ngOnInit() {

		let formGroup = {};

		formGroup['password'] = new FormControl('');

		this.form = new FormGroup(formGroup);

		this.tdna = new TypingDNA();
		this.tdna.addTarget("password");
	}

	submit(){

		let tp = this.tdna.getTypingPattern({targetId: "runCommand"});

		let data = {

			'password': this.form.value.password,
			'accessToken': localStorage.getItem('accessToken'),
			'tp': tp
		}

		console.log(data);

		this.tdna.reset();

		this.overlayLoaderService.show();

		this.http.request(new HttpRequest('POST', 'http://localhost:8000/backend/auth/verify', data))
			.subscribe((response) => {

				if(response instanceof HttpResponse){

					if(response.body['status'] == 'success'){

						this.form.reset();
						this.tdna.reset();
						this.overlayLoaderService.hide();
						console.log(response);
						this.dialogRef.close({

							status: 'success'
						});
					}
				}
			},
			(error) => {
				if(error instanceof HttpErrorResponse){

					console.log(error)
					this.form.reset();
					this.overlayLoaderService.hide();
					this.dialogRef.close({

						status: 'error',
						message: error.error['message']
					});
				}
			});
	}

}
