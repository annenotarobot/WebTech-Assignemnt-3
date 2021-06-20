import { Organisation } from './../../communitymashup/model/organisation.model';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { Person } from 'src/app/communitymashup/model/person.model';
import { Tag } from 'src/app/communitymashup/model/tag.model';
import { MatDialog } from '@angular/material/dialog';
import { CommunityMashupService } from 'src/app/communitymashup/communitymashup.service';
import { PopupComponent } from '../popup/popup.component';
import { Content } from 'src/app/communitymashup/model/content.model';

@Component({
  selector: 'app-bubble',
  templateUrl: './bubble.component.html',
  styleUrls: ['./bubble.component.css'],
})
export class BubbleComponent implements OnChanges {
  @Input() institute: Organisation;
  @Input() filterPerson: Person;
  @Input() filterTag: Tag;
  @Input() filterOrganisations: (organisations: Organisation[]) => Organisation[];
  @Input() getConnectedAbschlussarbeiten: (orga:Organisation) => Content[];
  @Input() itemConnectedToAbschlussarbeit: (org: Organisation) => boolean;
  @Input() itemConnectedToFilterPerson: (org:Organisation) => boolean;
  bubblename: string;
  showProfessuren: boolean = false;
  professuren: Organisation[];
  instElement: HTMLElement;
  background = ["#b61827","#b4004e", "#790e8b", "#26418f", "#0086c3", "#338a3e", "#c9bc1f", "#c77800", "#c63f17", "#5f4339", "#8d8d8d", "#4b636e", "#005005", "#38006b", "#001064", "#b53d00", "#1b1b1b"][Math.floor(Math.random()*16.9)];
  background_lighter:string;
  left = (Math.floor(Math.random()*50.5)+25).toString().concat("%");
  top = (Math.floor(Math.random()*900)-250).toString().concat("px");
  showArbeitsthemen: boolean[];
  constructor(public communitymashup: CommunityMashupService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.professuren = this.filterOrganisations(this.institute.getChildOrganisations());
    this.background_lighter = this.lightenDarkenColor(this.background, 130);
    this.bubblename = this.institute.name.concat("bubble");
    this.showArbeitsthemen = new Array(this.professuren.length).fill(false);
  }
  ngOnChanges(changes:SimpleChanges):void {
    this.filterPerson = changes.filterPerson.currentValue;
    this.filterTag = changes.filterTag.currentValue;
  }

  getProfessurStyle(professur:Organisation): string{
    const idx = this.professuren.indexOf(professur);
    const radius = 125;
    var center_x = document.getElementById(this.institute.name).offsetLeft+radius;
    var center_y = document.getElementById(this.institute.name).offsetTop+radius;
    const angle= (idx+1)/this.professuren.length;
    const bigger_radius = radius+90;
    var prof_left = center_x + bigger_radius*Math.cos(2*Math.PI*angle)-90;
    var prof_top = center_y + bigger_radius*Math.sin(2*Math.PI*angle)-90;

    var res = "background-color: ".concat(this.background_lighter, "; left:", prof_left.toString(), "px; top:", prof_top.toString(), "px;");
    return res;
  }

  getContentStyle(professur:Organisation): string {
    var top = document.getElementById(professur.name).offsetTop+180;
    var left = document.getElementById(professur.name).offsetTop+180;
    var bordercolor = this.background_lighter;

    var res = "border-color: ".concat(bordercolor, "; left:", left.toString(), "px; top:", top.toString(), "px;");
    return res;
  }

  toggleArbeitsthemen(professur:Organisation):void{
    var idx = this.professuren.indexOf(professur);
    this.showArbeitsthemen[idx]=!this.showArbeitsthemen[idx];
    document.getElementById(professur.name).classList.toggle("brightensubbubble")
  }

  getshowArbeitsthemen(professur:Organisation):boolean{
    var idx = this.professuren.indexOf(professur);
    return this.showArbeitsthemen[idx];
  }


  toggleProfessuren():void{
    this.showProfessuren = !this.showProfessuren;
    document.getElementById(this.institute.name).classList.toggle("paused");
    document.getElementById(this.institute.name).classList.toggle("brighten")
  }

  openPopUp(allTopics:Content[], topic:Content): void {
    const dialogRef = this.dialog.open(PopupComponent, {
      data: {
        abschlussarbeit: topic,
        all: allTopics
      },
      width: "70%"
    });
  }

  lightenDarkenColor(col,amt):string {
    var usePound = false;
    if ( col[0] == "#" ) {
        col = col.slice(1);
        usePound = true;
    }
    var num = parseInt(col,16);
    var r = (num >> 16) + amt;
    if ( r > 255 ) r = 255;
    else if  (r < 0) r = 0;
    var b = ((num >> 8) & 0x00FF) + amt;
    if ( b > 255 ) b = 255;
    else if  (b < 0) b = 0;
    var g = (num & 0x0000FF) + amt;
    if ( g > 255 ) g = 255;
    else if  ( g < 0 ) g = 0;
    return (usePound?"#":"") + (g | (b << 8) | (r << 16)).toString(16);
  }


  // for differentiating clicking and dragging as well as dragging between different
  mousePosition = {
    x: 0,
    y: 0
  };

  mouseDown($event) {
    this.mousePosition.x = $event.screenX;
    this.mousePosition.y = $event.screenY;
  }

  onClick($event) {
    if (this.mousePosition.x === $event.screenX && this.mousePosition.y === $event.screenY) {
      this.toggleProfessuren()
    }
  }

}
