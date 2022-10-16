import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-defect-form',
  templateUrl: './defect-form.component.html',
  styleUrls: ['./defect-form.component.scss']
})
export class DefectFormComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private http: HttpClient) { }

  ngOnInit(): void {
  }

  defectForm = this.formBuilder.group({
    defectType: ['', [Validators.required]],
    operatorName: ['', [Validators.required, Validators.pattern('^([^0-9]*)$')]],
    additionalNote: ['']
  })

  onSubmitDefectForm() {
    if (!this.defectForm.invalid && navigator.onLine) {
      console.log('submit form')
      let formData = {
        'defectType': this.defectForm.value.defectType,
        'name': this.defectForm.value.operatorName,
        'message': this.defectForm.value.additionalNote,
        'date': Date.now()
      }

      let header = new HttpHeaders();
      header = header.append('content-type', 'application/json');
      
      this.http.post('https://my-json-server.typicode.com/JeffKwakou/testia-interview/defects', formData, {headers : header, observe: 'response'}).subscribe((res) => {
        console.log(res)
      })
    } else {
      console.log("form invalid")
    }
    
  }

}
