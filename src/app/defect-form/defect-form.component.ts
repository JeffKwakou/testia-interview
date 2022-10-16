import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';

import { fromEvent, merge, of, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-defect-form',
  templateUrl: './defect-form.component.html',
  styleUrls: ['./defect-form.component.scss']
})
export class DefectFormComponent implements OnInit {

  formError: string;

  networkStatus: boolean = false;
  networkStatus$: Subscription = Subscription.EMPTY;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.checkNetworkStatus();
  }

  ngOnDestroy(): void {
    this.networkStatus$.unsubscribe();
  }

  defectForm = this.formBuilder.group({
    defectType: ['', [Validators.required]],
    operatorName: ['', [Validators.required, Validators.pattern('^([^0-9]*)$')]],
    additionalNote: ['']
  })

  // SUBMIT FORM
  onSubmitDefectForm() {
    if (this.defectForm.valid && navigator.onLine) {
      let formData = {
        'defectType': this.defectForm.value.defectType,
        'name': this.defectForm.value.operatorName,
        'message': this.defectForm.value.additionalNote,
        'date': Date.now()
      }

      const APIURL = 'https://my-json-server.typicode.com/JeffKwakou/testia-interview/posts'
      
      this.http.post(APIURL, formData, {observe: 'response'}).subscribe((res) => {
        this._snackBar.open('Votre rapport a été envoyé avec succès', 'OK');
      },
      (error) => {
        this._snackBar.open('Un problème est survenu lors de l\'envoi du rapoort', 'OK');
      })
    } else if (!navigator.onLine) {
      this._snackBar.open('Impossible d\'envoyer votre rapport sans connexion internet', 'OK');
    }
  }

  // CHECK INTERNET CONNEXION IN REAL TIME
  checkNetworkStatus() {
    this.networkStatus = navigator.onLine;
    this.networkStatus$ = merge(
      of(null),
      fromEvent(window, 'online'),
      fromEvent(window, 'offline')
    )
      .pipe(map(() => navigator.onLine))
      .subscribe(status => {
        this.networkStatus = status;
      });
  }
}
