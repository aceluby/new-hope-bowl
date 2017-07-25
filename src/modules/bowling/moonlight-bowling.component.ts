import {Component} from "@angular/core";
@Component({
  selector: 'moonlight-bowling-component',
  templateUrl: './moonlight-bowling.component.html'
})

export class MoonlightBowlingComponent {

  onVacation : boolean;
  rules = RULES;
  moonlightWins = MOONLIGHT_WINS;

  constructor() {
    var today = new Date();
    if (today.getMonth() >= 9 || today.getMonth() <5) {
      this.onVacation = false;
    } else {
      this.onVacation = true;
    }
  }

}

const RULES: string[] = [
  "If a bowler bowls out of turn they are not eligible for prizes - NO EXCEPTIONS.",
  "We will only pay what we call!  If a shot is incorrectly called, you MUST correct us before you take your shot.",
  "We reserve the right to move bowlers to expedite the final game.",
  "Sign in starts at 9:00 PM, bowling begins at 9:45 PM",
  "Cost is just $17.00 Per Person (includes 3 games and free shoe rental)",
  "We will NOT put more than 5 bowlers per lane. Please plan your group accordingly.",
  "Must be 21 yrs or older (no exceptions)",
  "No reservations will be honored after 9:30 PM."
]

export class MoonlightWins{
  img: String;
  description: String;
  amount: String;
}

const MOONLIGHT_WINS: MoonlightWins[] = [
  {img: "../../assets/1000_combo.jpg", description: "#1 red, #3 yellow, #6 orange, #10 green", amount: "$1,000"},
  {img: "../../assets/400_combo.jpg", description: "#1 red, #2 yellow, #3 orange", amount: "$400"},
  {img: "../../assets/200_combo.jpg", description: "#1 yellow, #2 red, #3 orange", amount: "$200"},
  {img: "../../assets/100_combo.jpg", description: "#1 orange, #2 yellow, #3 red", amount: "$100"},
  {img: "../../assets/other_combos123.jpg", description: "All other 1-2-3  Colored Combinations", amount: "$50"},
  {img: "../../assets/other_combos13610.jpg", description: "#1-3-6-10 All Other Color Combinations", amount: "$75"},
  {img: "../../assets/other_combos1247.jpg", description: "#1-2-4-7 Any Color Combinations", amount: "$75"},
  {img: "../../assets/other_combos136.jpg", description: "#1-3-6 Any Color Combinations", amount: "$7"},
  {img: "../../assets/other_combos124.jpg", description: "#1-2-4 Any Color Combinations", amount: "$5"},
  {img: "../../assets/other_combos12.jpg", description: "#1-2 or #1-3 Any Color Combinations", amount: "$5"},
  {img: "../../assets/other_combos1.jpg", description: "#1 Pin Any Color", amount: "$1"}
]
