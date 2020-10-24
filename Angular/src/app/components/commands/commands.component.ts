import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient, HttpErrorResponse, HttpParams, HttpRequest, HttpResponse, HttpHeaders } from "@angular/common/http";
declare var TypingDNA: any;
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { OverlayLoaderService } from './../../services/loaders/overlay-loader.service';
import { AlertBoxPasswordComponent } from './../alert-box-password/alert-box-password.component';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-commands',
  templateUrl: './commands.component.html',
  styleUrls: ['./commands.component.css']
})
export class CommandsComponent implements OnInit {

	showCommandGroupForm = false;
	showCommandForm = false;
	commandGroupForm: FormGroup;
	commandForm: FormGroup;
	runCommandForm: FormGroup;
	logoutForm: FormGroup;
	commandsData: any = [];
	tdna: any;
	configuration = false;
	runCommands = false;

	constructor(private http: HttpClient, private overlayLoaderService: OverlayLoaderService, public dialog: MatDialog, private router: Router) { }

	ngOnInit(): void {

		this.showConfiguration();

		let formGroup = {};

		formGroup['commandGroup'] = new FormControl('');

		this.commandGroupForm = new FormGroup(formGroup);

		let form = {};

		form['commandGroup'] = new FormControl('');
		form['command'] = new FormControl('');

		this.commandForm = new FormGroup(form);

		let runCommandForm = {};

		runCommandForm['runCommand'] = new FormControl('');
		runCommandForm['runCommandDirectory'] = new FormControl('');

		this.runCommandForm = new FormGroup(runCommandForm);

		let data = {

			'accessToken': localStorage.getItem('accessToken')
		}

		setTimeout(() => {

			this.overlayLoaderService.show();

			this.http.request(new HttpRequest('POST', 'http://localhost:8000/backend/commands/read', data))
				.subscribe((response) => {

					if(response instanceof HttpResponse){

						this.commandsData = response.body['data'];
						let commands = []
						response.body['data'].forEach((data) => {

							data.commands.forEach((command) => {

								commands.push(command);
							});
						})
						this.overlayLoaderService.hide();
						(window as any).webkit.messageHandlers.jsHandler.postMessage(commands);
					}
				},
				(error) => {

					if(error instanceof HttpErrorResponse){

						console.log(error)
						this.overlayLoaderService.hide();
					}
				});
		}, 10);
	}

	addCommandGroup(){

		this.showCommandGroupForm = true;
	}

	addCommand(){

		this.tdna = new TypingDNA();
		this.tdna.addTarget("command");
		this.showCommandForm = true;
	}

	cancelCommandGroup(){

		this.showCommandGroupForm = false;
	}

	cancelCommand(){

		this.showCommandForm = false;
	}

	submitCommandGroupForm(){

		let data = {

			'commandGroup': this.commandGroupForm.value.commandGroup,
			'accessToken': localStorage.getItem('accessToken')
		}

		this.overlayLoaderService.show();

		this.http.request(new HttpRequest('POST', 'http://localhost:8000/backend/command/group/create', data))
			.subscribe((response) => {

				if(response instanceof HttpResponse){

					if(response.body['status'] == 'success'){

						console.log(response);
						this.overlayLoaderService.hide();
						window.location.reload();
					}
				}
			},
			(error) => {

				if(error instanceof HttpErrorResponse){

					console.log(error)
					this.overlayLoaderService.hide();
				}
			});
	}

	submitCommandForm(){

		let tp = this.tdna.getTypingPattern({targetId: "command"});

		let data = {

			'commandGroup': this.commandForm.value.commandGroup,
			'command': this.commandForm.value.command,
			'accessToken': localStorage.getItem('accessToken'),
			'tp': tp
		}

		this.tdna.reset();

		this.overlayLoaderService.show();

		this.http.request(new HttpRequest('POST', 'http://localhost:8000/backend/command/create', data))
			.subscribe((response) => {

				if(response instanceof HttpResponse){

					if(response.body['status'] == 'success'){

						console.log(response);
						this.overlayLoaderService.hide();
						window.location.reload();
					}
				}
			},
			(error) => {
				if(error instanceof HttpErrorResponse){

					console.log(error)
					this.overlayLoaderService.hide();
				}
			});
	}

	showConfiguration() {

		this.configuration = true;
	}

	hideConfiguration() {

		this.configuration = false;
	}

	showRunCommands(){

		this.tdna = new TypingDNA();
		this.tdna.addTarget("runCommand");
		this.runCommands = true;
	}

	hideRunCommands(){

		this.runCommands = false;
	}

	clickConfiguration(){

		this.hideRunCommands();
		this.showConfiguration();
	}

	clickRunCommands(){

		this.showRunCommands();
		this.hideConfiguration();
	}

	submitRunCommandForm(){

		let tp = this.tdna.getTypingPattern({targetId: "runCommand"});

		let data = {

			'runCommand': this.runCommandForm.value.runCommand,
			'accessToken': localStorage.getItem('accessToken'),
			'tp': tp
		}

		console.log(data);

		this.tdna.reset();

		this.overlayLoaderService.show();

		this.http.request(new HttpRequest('POST', 'http://localhost:8000/backend/command/run', data))
			.subscribe((response) => {

				if(response instanceof HttpResponse){

					if(response.body['status'] == 'success'){

						(window as any).webkit.messageHandlers.runCommand.postMessage(response.body['accessTokenCommand']);
						this.runCommandForm.reset();
						this.tdna.reset();
						this.overlayLoaderService.hide();
						console.log(response);
					}
				}
			},
			(error) => {
				if(error instanceof HttpErrorResponse){

					console.log(error)
					this.runCommandForm.reset();
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

	logout(): void {

		const dialogRef = this.dialog.open(AlertBoxPasswordComponent, {
			width: '300px',
			disableClose: true
		});

		dialogRef.afterClosed().subscribe(result => {
			console.log(result)

			if(result.status == 'success'){

				localStorage.removeItem('accessToken')
				this.router.navigate(['login']);
			}
			else if(result!= undefined && result.status == 'error'){

				this.openDialog(result.message);
			}
		});
	}

	deleteCommand(id){

		const dialogRef = this.dialog.open(AlertBoxPasswordComponent, {
			width: '300px',
			disableClose: true
		});

		dialogRef.afterClosed().subscribe(result => {
			console.log(result)

			if(result!= undefined && result.status == 'success'){

				let data = {

					'id': id,
					'accessToken': localStorage.getItem('accessToken')
				}

				this.overlayLoaderService.show();

				this.http.request(new HttpRequest('POST', 'http://localhost:8000/backend/command/delete', data))
					.subscribe((response) => {

						if(response instanceof HttpResponse){

							if(response.body['status'] == 'success'){

								this.overlayLoaderService.hide();
								window.location.reload();
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
			else if(result!= undefined && result.status == 'error'){

				this.openDialog(result.message);
			}
		});
	}
}

@Component({
	selector: 'alert-box-command',
	templateUrl: './alert-box.html',
})
export class AlertBox {

	constructor(public dialogRef: MatDialogRef<AlertBox>, @Inject(MAT_DIALOG_DATA) public data: any) {}

	onNoClick(): void {
		this.dialogRef.close();
	}
}
