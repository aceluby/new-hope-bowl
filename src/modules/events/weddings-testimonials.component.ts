import {Component, Input} from "@angular/core";
import {VolleyballLeaguesService} from "../../services/volleyball/volleyball-leagues.service";
import {VolleyballTeam, VolleyballLeague} from "../../domain/volleyball-league.domain";

@Component({
  selector: 'weddings-testimonials-component',
  template: `
    <md-card>
      <img md-card-lg-image src="../../assets/wedding-bowling.png" style="height: 300px; width: 400px;">
      <img md-card-lg-image src="../../assets/wedding-dancing-2.png" style="height: 300px; width: 400px;">
      <img md-card-lg-image src="../../assets/cake.png" style="height: 300px; width: 400px;">
    </md-card>
    <br><br>
    <md-card>
      <md-card-content>
      I can't believe how easy New Hope Bowl made our day.  Working with Chris for our custom menu was amazing, he catered to our Greek style wedding with a build your own Gyro bar with ease.  Everyone absolutely loved the food.  We were also able to set up our decorations the day before and simply had to show Andrea our centerpieces and they set them up for us the next day.  The biggest hit, however, was the bowling.  EVERYONE bowled and had an absolute blast doing so.  We also had a big basket of fun socks for our gift and everyone loved them.  I can't believe how far our budget was able to go and the level of expertise and delivery for that price.  I would highly recommend them to anyone.
        <br><br>
        - Jake
      </md-card-content>
    </md-card>
    <br><br>
    <md-card>
      <md-card-content>
        We were able to go from start to finish in as little as two months, thanks to New Hope Bowl.  We opted to have Kristina help us with the coordination, and it was the best money I spent.  The day went flawlessly, and the planning was executed perfectly.  Chris made a delicious chicken marsala and the service was fantastic.  We created a specialty drink for the night and the bar had no problems fulfilling our needs.  What a great night!
        <br><br>
        - Holly
      </md-card-content>
    </md-card>
    <br><br>
    <md-card>
      <md-card-content>
        What a perfect end to our special day.  The DJ we got was amazing, and about 1/2 the price of anyone else around town.  Everyone had a great time bowling, and we were able to include a couple kegs and cases of wine for our guests at a very reasonable price.  We were able to get suggestions for photographers, cakes, decorations, and florists that all fit our budget.  All in all we were able to pay for our entire wedding for less than most venues were charging just for the room rental.  Everyone was amazed at how transformed the entire venue became and how amazing the service was.  I couldn't be happier.
        <br><br>
        - Sam
      </md-card-content>
    </md-card>
`
})

export class WeddingsTestimonialsComponent {

  constructor() {}

}

