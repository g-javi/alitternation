import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { LitterItemsService } from '../../services/litter-items.service';
import { ImageCaptureComponent } from '../image-capture/image-capture.component';
import { ImageRecognitionService } from '../../services/image-recognition.service';

@Component({
  selector: 'app-item-lookup',
  templateUrl: './item-lookup.component.html',
  styleUrls: ['./item-lookup.component.scss']
})
export class ItemLookupComponent implements OnInit {
  private items: { _id: number, description: string }[] = [];
  private searchQuery = '';

  constructor(
    private readonly location: Location,
    private readonly router: Router,
    public _itemService: LitterItemsService,
    private _vision: ImageRecognitionService
  ) {
    this._itemService.list.subscribe(data => {
      this.items = data;
    });
  }

  get filteredItems() {
    const str = this.searchQuery.trim().toLowerCase();

    if (str.length === 0) {
      return this.items;
    }

    return this.items.filter(item => item.description.toLowerCase().indexOf(str) !== -1);
  }

  ngOnInit() {
    // TODO: Temporarily populating data
    this._itemService.updateItemList();

    if (this._vision.searchResults.length) {
      this.searchQuery = this._vision.searchResults[0];
      this._vision.searchResults = [];
    }
  }

  goBack() {
    this.location.back();
  }

  goToItem(itemId: number) {
    this.router.navigate(['item-detail-info', itemId]);
  }
}
