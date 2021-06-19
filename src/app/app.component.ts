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
    if (metaTag == 'institut' && orgs!=null){
      return this.filterOrganisations(orgs);
    }
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
  param: Organisation: normally professur or institute
  returns Abschlussarbeiten connected to the organisation
  */
  getConnectedAbschlussarbeiten(orga:Organisation):Content[]{
    var items = orga.getConnectedFromItems();
    var result = [];
    if (items != undefined) {
      items.forEach(item => {
        if (item instanceof Content) { 
          if (this.itemConnectedToAbschlussarbeit(item) && this.itemConnectedToFilterPerson) {
           result.push(item);
          }
        } 
      } );
    }
    return result;
  }

  itemConnectedToAbschlussarbeit(item:Item):Boolean{
    // returns whether the Item (person, organisation, etc) is connected to at leats one Abschlussarbeit
    var connections = item.getConnectedFromItems();
    var result = [];
    if (connections != undefined && connections.length >0){
      connections.forEach(item0 => {
        if (item0 instanceof Content) {
          if (item0.getMetaTagsAsString().includes("Abschlussarbeit")) { result.push(item0);}
          }})
    };
    return (result.length !=0);
  }

  /*
  TBD
  */
  itemConnectedToFilterPerson(item:Item):Boolean{
    return true;
    if(this.filterPerson == null) return true;
    var connections = item.getConnectedFromItems();
    var result = [];
    if (connections.length >0){
      connections.forEach(item0 => {
        if (item0 instanceof Content) {
          if (item0.getMetaTagsAsString().includes("Abschlussarbeit")) { result.push(item0);}
          }})
    };
    return (result.length !=0);
  }


  /*
  not metaTag but Tag
  itemHasTag
  */

  /*
  uses recursion to check if current organisation is connected to Abschlussarbeit, then checks if chidOrganisations are conncected to abschlussarbeit
  param: organisations
  returns: organisations filtered so that only organisations connected to Abschlussarbeiten remain
  */
  filterOrganisations(organisations: Organisation[]):Organisation[]{
    var results : Organisation[];
    var childOrgas : Organisation[];
    if (organisations!=null){
      organisations.forEach(org => {
        if(this.itemConnectedToAbschlussarbeit(org) && this.itemConnectedToFilterPerson(org)){
          results.push(org)
        } else {
        childOrgas = org.getChildOrganisations();
        if(childOrgas != null && !(this.filterOrganisations(childOrgas) == undefined)){
          results.push(org)
              }
        }
      });
    }
    return results;
  }

  getPersonsWithAbschlussarbeit():Person[]{
    var allPersons:Person[] = this.getPersons(null);
    var personsWithAbschlussarbeit = [];
    if (allPersons != undefined){
      allPersons.forEach(person => {
        if (this.itemConnectedToAbschlussarbeit(person)) {
          personsWithAbschlussarbeit.push(person);
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


