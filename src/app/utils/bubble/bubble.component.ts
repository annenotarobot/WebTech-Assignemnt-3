import { Organisation } from 'src/app/communitymashup/model/organisation.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-bubble',
  templateUrl: './bubble.component.html',
  styleUrls: ['./bubble.component.css'],
})
export class BubbleComponent implements OnInit {
  @Input() institute: Organisation;
  showProfessuren: Boolean = false;
  professuren: Organisation[];
  instElement: HTMLElement;
  background = ["#b61827","#b4004e", "#790e8b", "#26418f", "#0086c3", "#338a3e", "#c9bc1f", "#c77800", "#c63f17", "#5f4339", "#8d8d8d", "#4b636e", "#005005", "#38006b", "#001064", "#b53d00", "#1b1b1b"][Math.floor(Math.random()*16.9)];
  background_lighter:string;
  left = (Math.floor(Math.random()*70.5)+15).toString().concat("%");
  top = (Math.floor(Math.random()*80.5)+10).toString().concat("%");
  constructor() {
  }

  ngOnInit(): void {
    this.professuren = this.institute.getChildOrganisations();
    this.background_lighter = this.lightenDarkenColor(this.background, 130);
  }

  getProfessurStyle(professur:Organisation): string{
    const idx = this.professuren.indexOf(professur);
    const radius = document.getElementById(this.institute.name).offsetWidth/2 +3;
    const center_x = document.getElementById(this.institute.name).offsetLeft + radius;
    const center_y = document.getElementById(this.institute.name).offsetTop + radius;
    const angle=2*Math.PI / this.professuren.length * idx;

    const x = center_x + radius * Math.cos(angle);
    const y = center_y + radius + Math.sin(angle);

    var res = "background-color: ".concat(this.background_lighter, "; left:", x.toString(), "; top:", y.toString(), ";");
    console.log(res);
    return res;
  }

  toggleArbeitsthema(professur:Organisation):void{

  }

  toggleProfessuren():void{
    this.showProfessuren = !this.showProfessuren;
    document.getElementById(this.institute.name).classList.toggle("paused");
    document.getElementById(this.institute.name).classList.toggle("brighten")
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

}
