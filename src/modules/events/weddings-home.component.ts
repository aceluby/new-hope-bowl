import {Component, Input} from "@angular/core";
import {VolleyballLeaguesService} from "../../services/volleyball/volleyball-leagues.service";
import {VolleyballTeam, VolleyballLeague} from "../../domain/volleyball-league.domain";

@Component({
  selector: 'weddings-home-component',
  template: `
    <md-card>
      <img md-card-image src="../../assets/wedding-setup.png" style="height: 400px">
    </md-card>

    <md-grid-list cols="9" rowHeight="450px">
      <!--ROW 1-->
      <md-grid-tile></md-grid-tile>
      <md-grid-tile colspan="3">
        <md-card style="height: 350px; width: 400px">
          <md-card-title>Wedding Receptions</md-card-title>
          <md-card-content>
            <md-list dense>
              <md-list-item>One low, all-inclusive price of $30 per guest.</md-list-item>
              <md-list-item>Wedding reception facilities are available May - August and can accommodate up to 250 guests.</md-list-item>
              <md-list-item>Entire facility dedicated exclusively to your reception (for 125+ guests)</md-list-item>
              <md-list-item>Dinner: Prepared by our own Chef Husnik--a graduate of the prestigious School of Culinary Arts</md-list-item>
              <md-list-item>Tables/Linens</md-list-item>
              <md-list-item>Taxes/Gratuities</md-list-item>
              <md-list-item>Unlimited bowling & shoe rental from conclusion of dinner until midnight</md-list-item>
              <md-list-item>Certain meal choices and additional beverage options are available for an additional fee.</md-list-item>
            </md-list>
          </md-card-content>
          <md-card-footer></md-card-footer>
        </md-card>
      </md-grid-tile>
      <md-grid-tile></md-grid-tile>
      <md-grid-tile colspan="3">
        <md-card style="height: 350px; width: 400px">
          <img md-card-image src="../../assets/wedding-food.png" style="height: 350px;">
        </md-card>
      </md-grid-tile>
      <md-grid-tile></md-grid-tile>
      <!--ROW 2-->
    </md-grid-list>
`
})

export class WeddingsHomeComponent {

  constructor() {}
  
}

