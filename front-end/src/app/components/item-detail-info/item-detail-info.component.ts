import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ItemInfoService } from '../../services/item-info.service';

@Component({
  selector: 'app-item-detail-info',
  templateUrl: './item-detail-info.component.html',
  styleUrls: ['./item-detail-info.component.scss']
})
export class ItemDetailInfoComponent implements OnInit {
  private id: number | undefined = undefined;
  private routeSubscription: any;

  constructor(
    private readonly location: Location,
    private readonly route: ActivatedRoute,
    public _itemInfo: ItemInfoService,
  ) { }

  ngOnInit() {
    this.routeSubscription = this.route.params.subscribe(params => {
       this.id = +params['id'];

       // TODO: Fetch item info
    });
  }

  goBack() {
    this.location.back();
  }
}
