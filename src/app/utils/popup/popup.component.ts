import { Content } from './../../communitymashup/model/content.model';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {ScrollingModule} from '@angular/cdk/scrolling';
import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { Item } from 'src/app/communitymashup/model/item.model';
import { Person } from 'src/app/communitymashup/model/person.model';
import { Organisation } from 'src/app/communitymashup/model/organisation.model';
import { CommunityMashupService } from 'src/app/communitymashup/communitymashup.service';
import { MetaTag } from 'src/app/communitymashup/model/metatag.model';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PopupComponent implements OnInit {
  idx:number;
  content:Content;
  allAbschlussarbeiten: Content[];

  constructor(public dialogRef: MatDialogRef<PopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public communitymashup: CommunityMashupService) {
      this.content = data.abschlussarbeit;
      this.allAbschlussarbeiten = data.all;
      this.idx = this.allAbschlussarbeiten.indexOf(this.content);
     }

  ngOnInit(): void {
    this.communitymashup.loadFromUrl(); // was macht das?
  }

  next(): void {
    // load next topic of Professur
    if (this.idx == this.allAbschlussarbeiten.length-1) {
      this.idx = 0;}
    else {this.idx += 1;}
    this.content = this.allAbschlussarbeiten[this.idx];
  }
  previous(): void {
    // load previous topic of Professur
    if (this.idx == 0) {
      this.idx = this.allAbschlussarbeiten.length-1;}
    else {this.idx -= 1;}
    this.content = this.allAbschlussarbeiten[this.idx];
  }
  get_name(): string {
    return this.content.name;
  }
  get_info(): string {
    return this.content.stringValue;
  }
  is_image(): boolean{
    // if image is there?
    return this.content.getImages().length > 0;
  }
  get_image_src(): string{
    // returns source of image to be loaded
    return this.content.getImages()[0]['fileUrl'];
  }
  close(): void {
    this.dialogRef.close();
  }
  getTags():string{
    var res = "";
    var tagID:MetaTag[] = this.content.getMetaTags();
    for (var tag of tagID){
      res = res + tag.name + " ";
    }
    return res;
  }
}
