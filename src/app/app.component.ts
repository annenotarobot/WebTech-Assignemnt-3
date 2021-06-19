import { MetaTag } from './communitymashup/model/metatag.model';
import { Tag } from './communitymashup/model/tag.model';
import { Connection } from './communitymashup/model/connection.model';
import { Content } from './communitymashup/model/content.model';
import { PopupComponent } from './utils/popup/popup.component';
import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/communitymashup/model/item.model';
import { Person } from 'src/app/communitymashup/model/person.model';
import { Organisation } from 'src/app/communitymashup/model/organisation.model';
import { CommunityMashupService } from 'src/app/communitymashup/communitymashup.service';
import { MatDialog } from '@angular/material/dialog';
import { DragDropModule } from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'abschlussarbeiten-app';
  filterPerson: Person = null;
  filterTag: Tag = null;
  creative: boolean = false;

  constructor(public communitymashup: CommunityMashupService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.communitymashup.loadFromUrl();
  }

  getMetaTags() {
    return this.communitymashup.getMetaTags();
  }

  getPersons(metaTag) {
    return this.communitymashup.getPersons(metaTag);
  }
  getContents(metaTag) {
    var result = this.communitymashup.getContents(metaTag);
    return result;
  }
  getOrganisations(metaTag) {
    var orgs = this.communitymashup.getOrganisations(metaTag);
    var results = [];
    // if (metaTag == 'institut' && orgs!=null){
    //   orgs.forEach(org => {
    //     var conItems = org.getConnectedFromItems()
    //     if (conItems.length >0){
    //       if (conItems.filter(con => con.getMetaTagsAsString().includes("Abschlussarbeit")).length>0){
    //       results.push(org)
    //       }
    //     };
    //   });
    //   return results;
    // }
    return orgs;
  }

  getConnectedPersons(item:Item): Person[] {
    var items = item.getConnectedFromItems();
    var result = [];
    items.forEach(item => {
      if (item instanceof Person) { result.push(item); }
    } );
    return result;
  }

  getConnectedOrganisations(item:Item): Organisation[] {
    var items = item.getConnectedFromItems();
    var result = [];
    items.forEach(item => {
      if (item instanceof Organisation) { result.push(item); }
    } );

    return result;
  }

  /*
  param: Organisation: professur or institute
  returns Abschlussarbeiten
  */
  getConnectedAbschlussarbeiten(orga:Organisation): Content[] {
    var items = orga.getConnectedFromItems();
    var result = [];
    if (items != undefined) {
      items.forEach(organization => {
        if (organization instanceof Content) { 
          if (this.itemConnectedToAbschlussarbeit(organization)) {
           result.push(organization);
          }
        } 
      } );
    }
    return result;
  }

  itemConnectedToAbschlussarbeit(item:Item):Boolean{
    // returns whether the person is connected to an Abschlussarbeit
    return true;
    var connections = item.getConnectedFromItems();
    console.log(connections) //TODO: connections ist immer leer, Personen sind nicht verbunden
    var result = [];
    if (connections.length >0){
      console.log("connections length not 0!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!: "+connections.length);
      connections.forEach(item0 => {
        if (item0 instanceof Content) {
          console.log("here2");
          if (item0.getMetaTagsAsString().includes("Abschlussarbeit")) { result.push(item0);}
          }})
    };

    return (result.length !=0);
  }

  getPersonsWithAbschlussarbeit():Person[]{
    var allPersons:Person[] = this.getPersons(null);
    var personsWithAbschlussarbeit = [];
    if (allPersons != undefined){
      allPersons.forEach(person => {
        if (this.itemConnectedToAbschlussarbeit(person)) {
          personsWithAbschlussarbeit.push(person);
          //console.log("personsWithAbschlussarbeit nicht leer ");
        }
      })
    }
    return personsWithAbschlussarbeit
  }

  openPopUp(): void {
    const dialogRef = this.dialog.open(PopupComponent, {
      id: "0", // TODO: get ID of Abschlussarbeit
      width: "70%"
    });
  }

  valid(org: Organisation):boolean{
    return this.creative && (org!=undefined)
  }
allowDrop(ev) {console.log("allowdrop")
  ev.preventDefault();
}
drop(ev, id) {
  console.log("drop")
  ev.preventDefault();
  var data = ev.dataTransfer.getData(id);
  ev.target.appendChild(document.getElementById(data));
}

}
