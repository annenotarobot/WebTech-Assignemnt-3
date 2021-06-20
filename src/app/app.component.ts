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
import * as $ from 'jquery';  
import { isDeepStrictEqual } from 'util';



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

  organisationIsInstitut(orga:Organisation):boolean{
    if(orga.getMetaTagsAsString().includes("institut")){
      return true;
    }
    return false
  }

  organisationIsProfessur(orga:Organisation):boolean{
    if(orga.getMetaTagsAsString().includes("professur")) {
      return true;
    }
    return false
  }

  getProfessurenChildOrganisations(parentOrga:Organisation): Organisation[] {
    var orga = parentOrga;
    var professuren = [];
    var results = [];
    var childOrgas = [];
    childOrgas = orga.getChildOrganisations();
    childOrgas.forEach(org => {
          if (this.organisationIsProfessur(org)) { professuren.push(org);} 
          });    
    results = this.filterOrganisations(professuren);
    return results;
  }

  /*
  param: Organisation: normally professur or institute
  returns Abschlussarbeiten connected to the organisation
  */
  getConnectedAbschlussarbeiten(orga:Organisation):Content[]{
    var items = orga.getConnectedFromItems();
    var result = [];
    if(this.organisationIsInstitut(orga)){
      if (items != undefined) {
        items.forEach(item => {
          if (item instanceof Content) { 
            if (item.getMetaTagsAsString().includes("Abschlussarbeit") && this.itemConnectedToFilterPerson(item) && this.itemConnectedToFilterTag(item)) {
            result.push(item);
            }
          } 
        } );
      }
      return result;
    }
    if(this.organisationIsProfessur(orga)){
      if (items != undefined) {
        items.forEach(item => {
          if (item instanceof Content) { 
            if (item.getMetaTagsAsString().includes("Abschlussarbeit") && this.itemConnectedToFilterPerson(item) && this.itemConnectedToFilterTag(item)) {
            result.push(item);
            }
          } 
        } );
      }
      return result;
    }
  }

  /*
  returns true if item (organisation or Person or...) is connected to a content object with the metaTag Abschlussarbeit
  */
  itemConnectedToAbschlussarbeit(item:Item):Boolean{
    var connections = item.getConnectedFromItems();
    var result = [];
    if (connections != undefined && connections.length >0){
      connections.forEach(item0 => {
        if (item0 instanceof Content) {
          if (item0.getMetaTagsAsString().includes("Abschlussarbeit")) { result.push(item0);}
          }});
    }
    return (result.length !=0);
  }

  /*
  TODO: check if when filtered person has been selected then "keine Auswahl" is selected again if filterPerson value is null again
  
  returns true if item (organisation or Person or...) is connected to the selected filterPerson 
  */
  itemConnectedToFilterPerson(item:Item):Boolean{
    if(this.filterPerson == null) return true;
    var connectedItems = item.getConnectedFromItems();
    if (connectedItems != undefined && connectedItems.length >0){
      connectedItems.forEach(person => {
        if (person instanceof Person) {
          if (isDeepStrictEqual(person, this.filterPerson)) { 
            return true;
          }
        }
      });
    }
   return false;
  }


  /*
  TBD when Datenmodell ready
  not metaTag but Tag
  itemHasTag
  */
  itemConnectedToFilterTag(item:Item):Boolean{
    return true;
    // if(this.filterTag == null) return true;
    // var connections = item.getConnectedFromItems();
    // var result = [];
    // if (connections.length >0){
    //   connections.forEach(item0 => {
    //       if (item0.getTagsAsString().includes(filterTag.toString())) { result.push(item0);}
    //       })
    // };
    // return (result.length !=0);
  }

  /*
  uses recursion to check if current organisation is connected to Abschlussarbeit, then checks if chidOrganisations are conncected to abschlussarbeit
  param: organisations
  returns: organisations filtered so that only organisations connected to Abschlussarbeiten remain
  */
  filterOrganisations(organisations: Organisation[]):Organisation[]{
    var orgas = organisations;
    var results = [];
    var childOrgas = [];
    var connectedAbschlussarbeiten = [];
    orgas.forEach(org => {
      //verifies if the organization is connected to an abschlussarbeit
      //then check if at least one of the abschlussarbeiten fullfills the necessary criteria fullfils filtering criteria wiht person and tag
      if(this.itemConnectedToAbschlussarbeit(org)){
        connectedAbschlussarbeiten = this.getConnectedAbschlussarbeiten(org);
        console.log(connectedAbschlussarbeiten);
        //following could and shuld be better programmed
        if(connectedAbschlussarbeiten != undefined){
          if(connectedAbschlussarbeiten.length > 0){
            results.push(org)
          }
        }
      } else {
        childOrgas = org.getChildOrganisations();
          if(childOrgas != null){  
            if(this.filterOrganisations(childOrgas).length > 0){
            results.push(org)
            }
          }
        }
    }); 
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

printToConsole(s:string):void{
  console.log("console log: "+s)
}

updateDiv(): void{ 
    $( "accordion" ).load(window.location.href + " accordion" );
    console.log("console log: RELOADED ELEMENTS")
  }
}


