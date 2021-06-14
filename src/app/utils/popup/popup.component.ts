import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { Item } from 'src/app/communitymashup/model/item.model';
import { Person } from 'src/app/communitymashup/model/person.model';
import { Organisation } from 'src/app/communitymashup/model/organisation.model';
import { CommunityMashupService } from 'src/app/communitymashup/communitymashup.service';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PopupComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<PopupComponent>,
    @Inject(MAT_DIALOG_DATA) public id: any,
    public communitymashup: CommunityMashupService) { }

  ngOnInit(): void {
    this.communitymashup.loadFromUrl(); // was macht das?
  }

  next(): void {
    // load next topic of Professur
  }
  previous(): void {
    // load previous topic of Professur
  }
  get_name(): string {
    return "Name"
  }
  get_info(): string {
    return "Information, information, information, information, information, information, information, information, information, information"
  }
  is_image(): boolean{
    // if image is there?
    return true
  }
  get_image_src(): string{
    // returns source of image to be loaded
    return "assets/space2.jpg"
  }
  close(): void {
    this.dialogRef.close();
  }
}
