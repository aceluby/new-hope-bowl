import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MdButtonModule, MdCardModule, MdMenuModule, MdToolbarModule, MdIconModule, MdSidenavModule, MdListModule,
  MdGridListModule, MdTabsModule, MdInputModule, MdSelectModule, MdDialogModule, MdChipsModule, MdDatepickerModule,
  MdNativeDateModule, MdCheckboxModule, MdSnackBarModule
} from '@angular/material';
import { RouterModule, Routes } from '@angular/router';
import {AppComponent, LoginDialogComponent} from './app.component';
import {HomeComponent} from "../modules/home/home.component";
import {OpenBowlingComponent} from "../modules/bowling/open-bowling.component";
import {CarouselComponent} from "../modules/home/carousel.component";
import {LeagueBowlingComponent} from "../modules/bowling/league-bowling.component";
import {JoinALeagueComponent, BowlingDialogComponent} from "../modules/bowling/join-a-league.component";
import {MoonlightBowlingComponent} from "../modules/bowling/moonlight-bowling.component";
import {ContactUsComponent, EmailDialogComponent} from "../modules/contact-us/contact-us.component";
import {WeddingsComponent} from "../modules/events/weddings.component";
import {CorporateEventsComponent} from "../modules/events/corporate-events.component";
import {BirthdayPartiesComponent} from "../modules/events/birthday-parties.component";
import {ItalianPieShoppeComponent} from "../modules/food-and-drinks/italian-pie-shoppe.component";
import {HappyHourComponent} from "../modules/food-and-drinks/happy-hour.component";
import {LeagueInformationComponent} from "../modules/volleyball/league-information.component";
import {RulesComponent} from "../modules/volleyball/rules.component";
import {SchedulesComponent} from "../modules/volleyball/schedules.component";
import {WeatherPoliciesComponent} from "../modules/volleyball/weather-policies.component";
import {NewPlayerComponent} from "../modules/bowling/new-player.component";
import {UniqueDayPipe} from "../modules/common/pipes/unique-day.component";
import {TextMaskModule} from "angular2-text-mask";
import {BowlingLeaguesService} from "../services/bowling/bowling-leagues.service";
import {OpenBowlingService} from "../services/bowling/open-bowling.service";
import {VolleyballLeaguesService} from "../services/volleyball/volleyball-leagues.service";
import {AdminComponent} from "../modules/admin/admin.component";
import {VolleyballAdminComponent, ResetDialogConfirmComponent} from "../modules/admin/volleyball-admin.component";
import {UniqueDatePipe} from "../modules/common/pipes/unique-date.component";
import {NewGameComponent} from "../modules/admin/new-game.component";
import {NewTeamComponent} from "../modules/admin/new-team.component";
import {LeagueMaintenanceComponent} from "../modules/admin/league-maintenance.component";
import {NewsService} from "../services/news/news.service";
import {NewsAdminComponent} from "../modules/admin/news-admin.component";
import {PlayoffsComponent} from "../modules/volleyball/playoffs.component";
import {UniqueYearPipe} from '../modules/common/pipes/unique-year.component';
import {WeddingService} from '../services/wedding/wedding.service';
import {WeddingMenuComponent} from '../modules/admin/wedding-menu-admin.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginDialogComponent,
    HomeComponent,
    CarouselComponent,
    OpenBowlingComponent,
    LeagueBowlingComponent,
    JoinALeagueComponent,
    NewPlayerComponent,
    MoonlightBowlingComponent,
    ContactUsComponent,
    WeddingsComponent,
    CorporateEventsComponent,
    BirthdayPartiesComponent,
    ItalianPieShoppeComponent,
    HappyHourComponent,
    LeagueInformationComponent,
    RulesComponent,
    SchedulesComponent,
    WeatherPoliciesComponent,
    UniqueDayPipe,
    UniqueDatePipe,
    UniqueYearPipe,
    EmailDialogComponent,
    BowlingDialogComponent,
    AdminComponent,
    VolleyballAdminComponent,
    NewGameComponent,
    NewTeamComponent,
    LeagueMaintenanceComponent,
    NewsAdminComponent,
    ResetDialogConfirmComponent,
    PlayoffsComponent,
    WeddingMenuComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    MdButtonModule,
    MdMenuModule,
    MdCardModule,
    MdToolbarModule,
    MdIconModule,
    MdSidenavModule,
    MdListModule,
    MdGridListModule,
    MdTabsModule,
    MdInputModule,
    MdSelectModule,
    TextMaskModule,
    MdDialogModule,
    MdChipsModule,
    MdDatepickerModule,
    MdNativeDateModule,
    MdCheckboxModule,
    ReactiveFormsModule,
    MdSnackBarModule
  ],
  entryComponents: [
    EmailDialogComponent,
    BowlingDialogComponent,
    LoginDialogComponent,
    ResetDialogConfirmComponent
  ],
  providers: [
    BowlingLeaguesService,
    OpenBowlingService,
    VolleyballLeaguesService,
    NewsService,
    WeddingService
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
  title = 'New Hope Bowl';
}

