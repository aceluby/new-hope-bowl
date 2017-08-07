import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule, Routes} from '@angular/router';
import {AuthService} from 'angular2-google-login';
import {
  MdButtonModule,
  MdCardModule,
  MdMenuModule,
  MdToolbarModule,
  MdIconModule,
  MdSidenavModule,
  MdListModule,
  MdGridListModule,
  MdTabsModule,
  MdInputModule,
  MdSelectModule,
  MdDialogModule,
  MdChipsModule,
  MdDatepickerModule,
  MdNativeDateModule,
  MdCheckboxModule,
  MdSnackBarModule
} from '@angular/material';
import {AppComponent} from './app.component';
import {HomeComponent} from '../modules/home/home.component';
import {OpenBowlingComponent} from '../modules/bowling/open-bowling.component';
import {CarouselComponent} from '../modules/home/carousel.component';
import {LeagueBowlingComponent} from '../modules/bowling/league-bowling.component';
import {JoinALeagueComponent, BowlingDialogComponent} from '../modules/bowling/join-a-league.component';
import {MoonlightBowlingComponent} from '../modules/bowling/moonlight-bowling.component';
import {ContactUsComponent, EmailDialogComponent} from '../modules/contact-us/contact-us.component';
import {WeddingsComponent} from '../modules/events/weddings.component';
import {CorporateEventsComponent} from '../modules/events/corporate-events.component';
import {BirthdayPartiesComponent} from '../modules/events/birthday-parties.component';
import {ItalianPieShoppeComponent} from '../modules/food-and-drinks/italian-pie-shoppe.component';
import {HappyHourComponent} from '../modules/food-and-drinks/happy-hour.component';
import {LeagueInformationComponent} from '../modules/volleyball/league-information.component';
import {RulesComponent} from '../modules/volleyball/rules.component';
import {SchedulesComponent} from '../modules/volleyball/schedules.component';
import {WeatherPoliciesComponent} from '../modules/volleyball/weather-policies.component';
import {NewPlayerComponent} from '../modules/bowling/new-player.component';
import {UniqueDayPipe} from '../modules/common/pipes/unique-day.component';
import {TextMaskModule} from 'angular2-text-mask';
import {BowlingLeaguesService} from '../services/bowling/bowling-leagues.service';
import {OpenBowlingService} from '../services/bowling/open-bowling.service';
import {VolleyballLeaguesService} from '../services/volleyball/volleyball-leagues.service';
import {AdminComponent, BowlingLeagueDialogComponent} from '../modules/admin/admin.component';
import {VolleyballAdminComponent, ResetDialogConfirmComponent} from '../modules/admin/volleyball-admin.component';
import {UniqueDatePipe} from '../modules/common/pipes/unique-date.component';
import {NewGameComponent} from '../modules/admin/new-game.component';
import {NewTeamComponent} from '../modules/admin/new-team.component';
import {LeagueMaintenanceComponent} from '../modules/admin/league-maintenance.component';
import {NewsService} from '../services/news/news.service';
import {NewsAdminComponent} from '../modules/admin/news-admin.component';
import {PlayoffsComponent} from '../modules/volleyball/playoffs.component';
import {UniqueYearPipe} from '../modules/common/pipes/unique-year.component';
import {WeddingService} from '../services/wedding/wedding.service';
import {WeddingMenuComponent} from '../modules/admin/wedding-menu-admin.component';
import {UsersComponent} from '../modules/admin/users.component';
import {AdminService} from '../services/admin/admin.service';
import {OrderrByDatePipe} from '../modules/common/pipes/order-by-date.component';
import {EmailService} from '../services/email/emailservice';
import {UnauthorizedComponent} from '../modules/admin/unauthorized.component';
import {WeddingsHomeComponent} from '../modules/events/weddings-home.component';
import {WeddingsAdditionalServicesComponent} from '../modules/events/weddings-additional-services.component';
import {WeddingsTestimonialsComponent} from '../modules/events/weddings-testimonials.component';
import {WeddingsGetStartedComponent, WeddingDialogComponent} from '../modules/events/weddings-get-started.component';
import {LoginComponent} from '../modules/login/login.component';
import {InputFile} from '../modules/common/input-file.component';

const appRoutes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'open_bowling', component: OpenBowlingComponent},
  {path: 'league_bowling', component: LeagueBowlingComponent},
  {path: 'join_a_league', component: JoinALeagueComponent},
  {path: 'moonlight_bowling', component: MoonlightBowlingComponent},
  {path: 'contact_us', component: ContactUsComponent},
  {path: 'weddings', component: WeddingsComponent},
  {path: 'corporate_events', component: CorporateEventsComponent},
  {path: 'birthday_parties', component: BirthdayPartiesComponent},
  {path: 'italian_pie_shoppe', component: ItalianPieShoppeComponent},
  {path: 'happy_hour', component: HappyHourComponent},
  {path: 'vb_league_information', component: LeagueInformationComponent},
  {path: 'vb_rules', component: RulesComponent},
  {path: 'vb_schedules', component: SchedulesComponent},
  {path: 'weather_policies', component: WeatherPoliciesComponent},
  {path: 'unauthorized', component: UnauthorizedComponent},
  {path: 'admin', component: AdminComponent, canActivate: [AdminService]},
  {path: '', component: HomeComponent},
  {path: '**', component: HomeComponent},
];

@NgModule({
            declarations: [
              AppComponent,
              HomeComponent,
              CarouselComponent,
              OpenBowlingComponent,
              LeagueBowlingComponent,
              JoinALeagueComponent,
              NewPlayerComponent,
              MoonlightBowlingComponent,
              ContactUsComponent,
              WeddingsComponent,
              WeddingsHomeComponent,
              WeddingsAdditionalServicesComponent,
              WeddingsTestimonialsComponent,
              WeddingsGetStartedComponent,
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
              OrderrByDatePipe,
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
              WeddingMenuComponent,
              BowlingLeagueDialogComponent,
              WeddingDialogComponent,
              UsersComponent,
              UnauthorizedComponent,
              LoginComponent,
              InputFile
            ],
            imports: [
              RouterModule.forRoot(
                appRoutes,
                {enableTracing: true} // <-- debugging purposes only
              ),
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
              ResetDialogConfirmComponent,
              BowlingLeagueDialogComponent,
              WeddingDialogComponent
            ],
            providers: [
              BowlingLeaguesService,
              OpenBowlingService,
              VolleyballLeaguesService,
              NewsService,
              WeddingService,
              AdminService,
              EmailService,
              LoginComponent,
              AuthService
            ],
            bootstrap: [AppComponent]
          })

export class AppModule {
  title = 'New Hope Bowl';
}

