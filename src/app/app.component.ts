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
  creative: boolean = true;

  constructor(public communitymashup: CommunityMashupService) {
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
    console.log(result)
    return result;
  }

  /*
  returns true if item (organisation or Person or...) is connected to a content object with the metaTag Abschlussarbeit
  */
  itemConnectedToAbschlussarbeit(item:Item):boolean{
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
  TODO: check if when filtered person has been selected then "keine Auswahl" is selected again if filterPerson value is null again

  returns true if item (organisation or Person or...) is connected to the selected filterPerson
  */
  itemConnectedToFilterPerson(item:Item):boolean{
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
  TBD when Datenmodell ready
  not metaTag but Tag
  itemHasTag
  */
  itemConnectedToFilterTag(item:Item):boolean{
    return true;
    // if(this.filterTag == null) return true;
    // var connections = item.getConnectedFromItems();
    // var result = [];
    // if (connections.length >0){
    //   connections.forEach(item0 => {
    //     if (item0 instanceof Content) {
    //       if (item0.getMetaTagsAsString().includes("Abschlussarbeit")) { result.push(item0);}
    //       }})
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
    if (orgas != null){
      orgas.forEach(org => {
      if(this.itemConnectedToAbschlussarbeit(org) && this.itemConnectedToFilterPerson(org)){
              results.push(org)
      } else {
        childOrgas = org.getChildOrganisations();
          if(childOrgas != null){
            if(this.filterOrganisations(childOrgas).length > 0){
            results.push(org)
            }
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


