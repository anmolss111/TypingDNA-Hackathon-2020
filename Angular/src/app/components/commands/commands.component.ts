import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient, HttpErrorResponse, HttpParams, HttpRequest, HttpResponse, HttpHeaders } from "@angular/common/http";
declare var TypingDNA: any;
import { OverlayLoaderService } from './../../services/loaders/overlay-loader.service';

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
    commandsData: any = [];
    tdna: any;
    configuration = false;
    runCommands = false;

    constructor(private http: HttpClient, private overlayLoaderService: OverlayLoaderService) { }

    ngOnInit(): void {

        this.showConfiguration();

        let formGroup = {};

        formGroup['commandGroup'] = new FormControl('');

        this.commandGroupForm = new FormGroup(formGroup);

        let form = {};

        form['commandGroup'] = new FormControl('');
        form['command'] = new FormControl('');

        this.commandForm = new FormGroup(form);

        let data = {

            'accessToken': localStorage.getItem('accessToken')
        }

        setTimeout(() => {

            this.overlayLoaderService.show();

            this.http.request(new HttpRequest('POST', 'http://localhost:8000/backend/commands/read', data))
    			.subscribe((response) => {

    				if(response instanceof HttpResponse){

                        this.commandsData = response.body.data;
                        this.overlayLoaderService.hide();
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

        this.http.request(new HttpRequest('POST', 'http://localhost:8000/backend/command/group/create', data))
			.subscribe((response) => {

				if(response instanceof HttpResponse){

					if(response.body['status'] == 'success'){

                        console.log(response);
					}
				}
			},
			(error) => {

				console.log(error)
			});
    }

    submitCommandForm(){

        let tp = this.tdna.getTypingPattern({targetId: "typingText"});

        let data = {

            'commandGroup': this.commandForm.value.commandGroup,
            'command': this.commandForm.value.command,
            'accessToken': localStorage.getItem('accessToken'),
            'tp': tp
        }

        console.log(data);

        this.tdna.reset();

        // this.http.request(new HttpRequest('POST', 'http://localhost:8000/backend/command/group/create', data))
		// 	.subscribe((response) => {
        //
		// 		if(response instanceof HttpResponse){
        //
		// 			if(response.body['status'] == 'success'){
        //
        //                 console.log(response);
		// 			}
		// 		}
		// 	},
		// 	(error) => {
        //
		// 		console.log(error)
		// 	});
    }

    showConfiguration() {

        this.configuration = true;
    }

    hideConfiguration() {

        this.configuration = false;
    }

    showRunCommands(){

        this.runCommands = true;
    }

    hideRunCommands(){

        this.runCommands = false;
    }

    clickConfiguration(){

        console.log(1);
        this.hideRunCommands();
        this.showConfiguration();
    }

    clickRunCommands(){

        console.log(1);
        this.showRunCommands();
        this.hideConfiguration();
    }
}
