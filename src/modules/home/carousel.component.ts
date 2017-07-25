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
  imageCount = [0,1,2,3,4];

  ngOnInit(){
    var timer;
    timer = Observable.timer(1000,5000);
    timer.subscribe(t=>this.ticks = t % this.images.length );
  }

}

var IMAGES: Image[] = [
  { "title": "lanes", "url": "../assets/bowling_balls.jpg" },
  { "title": "volleyball", "url": "../assets/volleyball_sunset.jpeg" },
  { "title": "pizza", "url": "../assets/thin_crust_pizza.jpg" },
  { "title": "lanes", "url": "../assets/bowling_shoes.jpg" },
  { "title": "lanes", "url": "../assets/strike.jpg" }, // wedding photos :)
];

export interface Image {
  title: string;
  url: string;
}
