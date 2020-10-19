import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpParams, HttpRequest, HttpResponse, HttpHeaders } from "@angular/common/http";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    form: FormGroup;

    constructor(private router: Router, private http: HttpClient) { }

    ngOnInit(): void {

        let formGroup = {};

        formGroup['email'] = new FormControl('');
        formGroup['password'] = new FormControl('');

        this.form = new FormGroup(formGroup);
    }

    submit() {

        console.log(this.form)

        let data = {

            'email': this.form.value.email,
            'password': this.form.value.password
        }

        console.log(data)

        this.http.request(new HttpRequest('POST', 'http://localhost:8000/backend/auth/login', data))
			.subscribe((response) => {

				if(response instanceof HttpResponse){

					if(response.body['status'] == 'success'){

						localStorage.setItem('accessToken', response.body['accessToken']);
						delete response.body['accessToken'];
                        console.log(response);

                        this.router.navigate(['commands']);
					}
				}
			},
			(error) => {

				console.log(error)
			});
    }

}
