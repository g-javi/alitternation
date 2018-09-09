import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ItemInfoService } from '../../services/item-info.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-item-detail-info',
  templateUrl: './item-detail-info.component.html',
  styleUrls: ['./item-detail-info.component.scss']
})
export class ItemDetailInfoComponent implements OnInit {
  private id: string | undefined = undefined;
  private routeSubscription: any;
  public _itemInfo: BehaviorSubject<any> = new BehaviorSubject<any>({});

  constructor(
    private readonly location: Location,
    private readonly route: ActivatedRoute,
    public _itemInfoService: ItemInfoService,
  ) { }

  get itemInfo() {
    return this._itemInfo.asObservable();
  }

  ngOnInit() {
    this.routeSubscription = this.route.params.subscribe(params => {
      this.id = params['id'];
      this._itemInfoService.getItemById(this.id).then(_ => {
        this._itemInfo.next(_);
      });
    });
  }

  goBack() {
    this.location.back();
  }

  reportItem() {
    alert("Not implemented");
  }
}
