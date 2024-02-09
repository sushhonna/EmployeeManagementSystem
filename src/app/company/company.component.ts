import { Component, ViewChild } from '@angular/core';
import { companymodel } from '../Model/companymodel';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../popup/popup.component';
import { EmployeeService } from '../shared/employee.service';
import * as alertify from 'alertifyjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent {
  @ViewChild(MatPaginator) _paginator!: MatPaginator;
  @ViewChild(MatSort) _sort!: MatSort;
  companyDataWithPagination: any;
  companydata: companymodel[];    // if you are getting error on companydata then add ! symbol at end (companydata!) or set strict property to false in tsconfig.json
  displayColumns: string[] = ["id", "name", "empcount", "revenue", "address", "isactive", "action"];

  constructor(private dialog: MatDialog, private service: EmployeeService) { }

  ngOnInit() {
    this.loadCompany();
  }

  loadCompany() {
    this.service.getAllCompany().subscribe(res => {
      this.companydata = res;
      this.companyDataWithPagination = new MatTableDataSource<companymodel>(this.companydata);
      this.companyDataWithPagination.paginator = this._paginator;
      this.companyDataWithPagination.sort = this._sort;
    })
  }

  openPopup(id: any) {
    const popup = this.dialog.open(PopupComponent, {
      width: '500px',
      exitAnimationDuration: '1000ms',
      enterAnimationDuration: '1000ms',
      data: {
        id: id
      }
    })
    popup.afterClosed().subscribe(res => {
      this.loadCompany();
    })
  }

  editCompany(id: any) {
    this.openPopup(id);
  }

  deleteCompany(id: any) {
    alertify.confirm("Remove Company", "Do you want to remove this company?", () => {
      this.service.removeCompanyByCode(id).subscribe(res => {
        this.loadCompany();
      });
    }, function () {

    });
  }

}


