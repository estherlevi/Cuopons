import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-all-coupons-view',
  templateUrl: './all-coupons-view.component.html',
  styleUrls: ['./all-coupons-view.component.css']
})
export class AllCouponsViewComponent implements OnInit {
  catgoryName: string = "HOME";
  maxPrice: number | undefined;
  public categoryOptions = ["FOOD", "ELECTRONICS", "HOME", "CLOTHING", "CAMPING", "VACATION"];
  items: Array<any> = [];

  onSortCatgoryChange(e: any) {
    this.getData();
  }
  onSortMaxPriceChange(e:any) {
    this.getDataMaxPrice();
  }
  cartCoupon(coupon:any){
    this.api.post(`customer/addCouponPurchase`,{couponId:coupon.id})
      .subscribe(x => {
       this.getData();
      })
  }

  private getData() {
    this.api.getAll(`customer/allCouponsByCategory/${this.catgoryName}`)
      .subscribe(x => {
        this.items = x;
      })
  }
  private getDataMaxPrice() {
    this.api.getAll(`customer/allCouponsByPrice/${this.maxPrice}`)
      .subscribe(x => {
        this.items = x;
      })
  }
  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.getData();
  }

}
