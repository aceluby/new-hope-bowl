import {Component, Input, Output, EventEmitter, ViewChild, ElementRef} from "@angular/core";
import {VolleyballLeaguesService} from "../../services/volleyball/volleyball-leagues.service";
import {VolleyballGame, VolleyballTeam} from "../../domain/volleyball-league.domain";

@Component({
  selector: 'input-file',
  template: `
    <span>
    <input [accept]="accept" type="file" (change)="onNativeInputFileSelect($event)" #inputFile hidden />
    <button type="button" md-raised-button (click)="selectFile()">
        <md-icon>file_upload</md-icon>
        <ng-content select=".nofiles"></ng-content>
    </button>
</span>
`
})

export class InputFile {
  @Input() accept: string;
  @Output() onFileSelect: EventEmitter<File[]> = new EventEmitter();

  @ViewChild('inputFile') nativeInputFile: ElementRef;

  private _files: File[];

  onNativeInputFileSelect($event) {
    this._files = $event.srcElement.files;
    this.onFileSelect.emit(this._files);
  }

  selectFile() {
    this.nativeInputFile.nativeElement.click();
  }
}
