import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-item-lookup',
  templateUrl: './item-lookup.component.html',
  styleUrls: ['./item-lookup.component.scss']
})
export class ItemLookupComponent implements OnInit {
  private items: { id: number, label: string }[] = [];

  constructor(
    private readonly location: Location,
    private readonly router: Router,
  ) { }

  ngOnInit() {
    // TODO: Temporarily populating data
    for (let i = 0; i < 100; ++i) {
      this.items.push({
        id: i,
        label: `item${i}`,
      });
    }
  }

  goBack() {
    this.location.back();
  }

  goToItem(itemId: number) {
    this.router.navigate(["/item-detail-info/", itemId]);
  }
}
