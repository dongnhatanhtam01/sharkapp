import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../services/api.service';



@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  public radioButton = ["branch new", "second hand", "refurbished"]
  productForm !: FormGroup
  actionBtn: string = "Save"

  constructor(private _formBuilder: FormBuilder
    , private _apiService: ApiService
    , @Inject(MAT_DIALOG_DATA) public editData: any
    , private _dialogRef: MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {

    console.table(this.editData);

    this.productForm = this._formBuilder.group(
      {
        address: ['', Validators.required],
        house_number: ['', Validators.required],
        street_name: ['', Validators.required],
        ward: ['', Validators.required],
        district: ['', Validators.required],
        city: ['', Validators.required],
        evaluate_rate: ['', Validators.required],
        comment: ['', Validators.required],
      }
    )

    if (this.editData) {
      this.actionBtn = "Update"
      this.productForm.controls['address'].setValue(this.editData.address)
      this.productForm.controls['house_number'].setValue(this.editData.house_number)
      this.productForm.controls['street_name'].setValue(this.editData.street_name)
      this.productForm.controls['ward'].setValue(this.editData.ward)
      this.productForm.controls['district'].setValue(this.editData.district)
      this.productForm.controls['city'].setValue(this.editData.city)
    }
  }

  address = () => {

    // this.productForm.valid?alert(1):alert(2)

    if (!this.editData) {
      if (this.productForm.valid) {
        this._apiService.postProduct(this.productForm.value).subscribe
          ({
            next: (res) => { 
              alert('address added properly!')
              this._dialogRef.close('added')
            },
            error: (err) => { alert('error occur!') }
            
          })
      }
    }
    else {
      this.updateProduct()
    }

  }

  updateProduct() {

    if (this.productForm.valid) {
      this._apiService.putProduct(this.productForm.value, this.editData.id).subscribe
        ({
          next: (res) => {
            alert('address edited!')
            this.productForm.reset()
            this._dialogRef.close('update')
          },
          error: (err) => { alert('error occur!') }
        })
    }
  }
}
