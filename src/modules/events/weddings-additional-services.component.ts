import {Component, Input} from "@angular/core";
import {VolleyballLeaguesService} from "../../services/volleyball/volleyball-leagues.service";
import {VolleyballTeam, VolleyballLeague} from "../../domain/volleyball-league.domain";

@Component({
  selector: 'weddings-additional-services-component',
  template: `
    <md-grid-list cols="9" rowHeight="450px">
      <!--ROW 1-->
      <md-grid-tile></md-grid-tile>
      <md-grid-tile colspan="3">
        <md-card style="height: 350px; width: 400px">
          <md-card-title>Day Of Coordinator - $500</md-card-title>
          <md-card-content>
            <md-list dense>
              <md-list-item>Create a customized day-of schedule for every minute from start to finish.</md-list-item>
              <md-list-item>Point of contact for all reception vendors.</md-list-item>
              <md-list-item>Coordinate all arrivals and pickups for reception flowers, catering, cake, hotel, decor, etc...</md-list-item>
              <md-list-item>Reception decor consultation and setup</md-list-item>
              <md-list-item>Transportation coordination</md-list-item>
              <md-list-item>3 consultations to discuss overall vision, vendor/decor coordination, and conduct final walkthrough.</md-list-item>
              <md-list-item>$250 for full day coordination, including ceremony</md-list-item>
            </md-list>
          </md-card-content>
        </md-card>
      </md-grid-tile>
      <md-grid-tile></md-grid-tile>
      <md-grid-tile colspan="3">
        <md-card style="height: 350px; width: 400px">
          <md-card-title>DJ Services - $500</md-card-title>
          <img md-card-md-image src="../../assets/wedding-dancing.png">
          <md-card-content>
            <md-list dense>
              <md-list-item>Custom playlist for both dinner and dancing.</md-list-item>
              <md-list-item>Synchronized lights and lasers.</md-list-item>
              <md-list-item>MC from bridal party entry through last call.</md-list-item>
              <md-list-item>A consultation meeting to discuss style, specific songs, dances, and overall flow of the night.</md-list-item>
            </md-list>
          </md-card-content>
        </md-card>
      </md-grid-tile>
      <md-grid-tile></md-grid-tile>
      <!--ROW 2-->
      <md-grid-tile></md-grid-tile>
      <md-grid-tile colspan="3">
        <md-card style="height: 350px; width: 400px">
          <md-card-title>Wedding Cake</md-card-title>
          <img md-card-xl-image src="../../assets/cake.png">
          <md-card-content>
            <br><br>
              We'll work with your budget and style to find a cake that will work for you.
          </md-card-content>
        </md-card>
      </md-grid-tile>
      <md-grid-tile></md-grid-tile>
      <md-grid-tile colspan="3">
        <md-card style="height: 350px; width: 400px">
          <md-card-title>Photography</md-card-title>
          <img md-card-xl-image src="../../assets/sit-wherever.png">
          <md-card-content>
            <br><br>
            We have contacts with many reputable photographers around the cities that can fit any budget.
          </md-card-content>
        </md-card>
      </md-grid-tile>
      <md-grid-tile></md-grid-tile>
      <!--ROW 3-->
      <md-grid-tile></md-grid-tile>
      <md-grid-tile colspan="3">
        <md-card style="height: 150px; width: 400px">
          <md-card-title>Decorations</md-card-title>
          <md-card-content>
            <md-list dense>
              Whether glamorous or thrifty, we can help make it happen.  Pricing varies depending on needs.
            </md-list>
          </md-card-content>
        </md-card>
      </md-grid-tile>
      <md-grid-tile></md-grid-tile>
      <md-grid-tile colspan="3">
        <md-card style="height: 150px; width: 400px">
          <md-card-title>Flowers</md-card-title>
          <md-card-content>
            Beautiful bouquets from local florists.  We can work with you to come up with something that fits your colors and style.
          </md-card-content>
        </md-card>
      </md-grid-tile>
      <md-grid-tile></md-grid-tile>
    </md-grid-list>
`
})

export class WeddingsAdditionalServicesComponent {

  constructor() {}

}

