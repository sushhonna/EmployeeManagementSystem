import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { EmployeeService } from '../shared/employee.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import * as alertify from 'alertifyjs';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent {

  constructor(private fb: FormBuilder, private service: EmployeeService, private dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any) { }
  editData: any;

  companyForm = this.fb.group({
    id: this.fb.control({ value: '', disabled: true }),
    name: this.fb.control('', Validators.required),
    empcount: this.fb.control('', Validators.required),
    revenue: this.fb.control('', Validators.required),
    address: this.fb.control('', Validators.required),
    isactive: this.fb.control(true)
  })

  ngOnInit() {
    if (this.data.id != '' && this.data.id != null) {
      this.service.getCompanyByCode(this.data.id).subscribe(res => {
        this.editData = res;
        this.companyForm.setValue({ id: this.editData.id, name: this.editData.name, empcount: this.editData.empcount, revenue: this.editData.revenue, address: this.editData.address, isactive: this.editData.isactive })
      })
    }
  }

  saveCompany() {
    if (this.companyForm.valid) {
      const editId = this.companyForm.getRawValue().id;
      if (editId != '' && editId != null) {
        this.service.updateCompany(editId,this.companyForm.getRawValue()).subscribe(res => {
          this.closePopup();
          alertify.success('Updated successfully..');
        });
      } else {
        this.service.createCompany(this.companyForm.value).subscribe(res => {
          this.closePopup();
          alertify.success('Saved successfully..');
        });
      }
    }
  }

  closePopup() {
    this.dialog.closeAll();
  }
}
