import {Component} from "@angular/core";
import {Observable} from 'rxjs/Rx';
@Component({
  selector: 'carousel',
  template: `
      <!--<img md-card-image src="{{images[ticks].url}}">-->
      <md-tab-group>
        <div *ngFor="let count of imageCount">
          <md-tab *ngIf="ticks == count" >
            <img md-card-image src="{{images[count].url}}" style="height: 300px; width: 500px">
          </md-tab>
        </div>
      </md-tab-group>
`
})

export class CarouselComponent {

  ticks = 0;
  images = IMAGES;
  imageCount = [0,1,2,3,4,5,6,7,8,9,10];

  ngOnInit(){
    var timer;
    timer = Observable.timer(1000,5000);
    timer.subscribe(t=>this.ticks = t % this.images.length );
  }

}

var IMAGES: Image[] = [
  { "title": null, "url": "../assets/thin_crust_pizza.jpg" },
  { "title": null, "url": "../assets/wedding-bowling.png" },
  { "title": null, "url": "../assets/nhb_lanes.jpeg" },
  { "title": null, "url": "../assets/volleyball_sunset.jpeg" },
  { "title": null, "url": "../assets/drinks.jpg" },
  { "title": null, "url": "../assets/bowling_balls.jpg" },
  { "title": null, "url": "../assets/wedding-setup.png" },
  { "title": null, "url": "../assets/bowling_shoes.jpg" },
  { "title": null, "url": "../assets/deep_dish_pizza.jpeg" },
  { "title": null, "url": "../assets/strike.jpg" },
  { "title": null, "url": "../assets/cake.png" }
];

export interface Image {
  title: string;
  url: string;
}
