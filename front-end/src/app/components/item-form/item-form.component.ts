import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, Validators } from '@angular/forms';
import * as $ from 'jquery';

@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.scss']
})
export class ItemFormComponent implements OnInit {
  addressForm = this.fb.group({
    title: [null, Validators.required],
    description: [null, Validators.required],
    disposalMethod: [null, Validators.required],
    recyclable: [false, Validators.required],
    barcode: null
  });

  constructor(
    private fb: FormBuilder,
    private readonly location: Location,
    private readonly router: Router,
  ) { }

  ngOnInit() {
  }

  goBack() {
    this.location.back();
  }

  onSubmit() {
    // alert('Thanks!');
    // console.log(this.addressForm.value);
    if (this.addressForm.valid) {
      console.log(this.addressForm.value);
      $.post('https://alitternation.com/litter/item/new', this.addressForm.value).done(_ => {
        console.log(_);
      });
    }
  }
}
