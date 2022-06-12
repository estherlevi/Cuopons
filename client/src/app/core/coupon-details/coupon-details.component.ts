import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-coupon-details',
  templateUrl: './coupon-details.component.html',
  styleUrls: ['./coupon-details.component.css']
})
export class CouponDetailsComponent implements OnInit {

  public categoryOptions = ["FOOD", "ELECTRONICS", "HOME", "CLOTHING", "CAMPING", "VACATION"];
  @Input() coupon: any = {};
  @Output() onClose = new EventEmitter();
  save() {
    if (this.coupon.id) {
      this.update()
    }
    else {
      this.insert()
    }
  }
  deleteCoupon() {
    if (this.coupon.id) {
      this.api.delete("company", this.coupon.id)
        .subscribe(x => {
          this.onClose.emit(true);
        })
    }
  }
  update() {
    this.api.post("company/updateCoupon", this.coupon)
      .subscribe(x => {
        this.onClose.emit(true);
      })
  }
  insert() {
    this.api.post("company/addCoupon", this.coupon)
      .subscribe(x => {
        this.onClose.emit(true);
      })
  }
  imageUplode(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.coupon.image = reader.result;
    };
  }
  constructor(private api: ApiService) { }

  ngOnInit(): void {
  }

}
