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

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'inforadiator-theses';
  filterPerson: Person = null;
  filterTag: Tag = null;

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
    // var results = []
    // if (metaTag == 'institut'){
    //   orgs.forEach(org => {
    //     var conItems = org.getConnectedItems()
    //     console.log(conItems)
    //     if (conItems.filter(con => con.MetaTag.includes("Abschlussarbeit")).length>0){
    //       results.push(org)
    //       console.log("ein Erfolg")
    //     };
    //   });
    //   return results;
    // }
    return orgs;
  }

  getConnectedPersons(item:Item): Person[] {
    var items = item.getConnectedItems();
    var result = [];
    items.forEach(item => {
      if (item instanceof Person) { result.push(item); }
    } );
    return result;
  }

  getConnectedOrganisations(item:Item): Organisation[] {
    var items = item.getConnectedItems();
    var result = [];
    items.forEach(item => {
      if (item instanceof Organisation) { result.push(item); }
    } );

    return result;
  }




  // hasAbschlussarbeit(person:Person):Boolean{
  //   // returns whether the person is connected to an Abschlussarbeit
  //   console.log("person is: "+person.firstname);
  //   var connections = person.getConnectedItems();
  //   var result = [];
  //   if (connections.length !=0){
  //     console.log("connections length not 0!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!: "+connections.length);
  //   };

  //   connections.forEach(item => {
  //     if (item instanceof Content) {
  //       console.log("here2");
  //       var tags = item.getMetaTags()
  //       tags.forEach(tag => {
  //         if (tag.name == "Abschlussarbeit") { result.push(item); console.log("here2");}
  //       })}})

  //   return (result.length !=0);
  // }

  // getPersonsWithAbschlussarbeit():Person[]{
  //   var allPersons:Person[] = this.getPersons(null);
  //   console.log("getPersonsWithAbschlussarbeit "+allPersons[1].lastname);
  //   var personsWithAbschlussarbeit = [];
  //   if(personsWithAbschlussarbeit.length==0) console.log("personsWithAbschlussarbeit leer ");
  //   allPersons.forEach(person => {
  //     if (this.hasAbschlussarbeit(person)) {
  //       personsWithAbschlussarbeit.push(person);
  //       if(personsWithAbschlussarbeit.length!=0)console.log("personsWithAbschlussarbeit zwischenschritt "+personsWithAbschlussarbeit[0].lastname);
  //     }
  //   })
  //   if(personsWithAbschlussarbeit.length!=0)console.log("personsWithAbschlussarbeit end "+personsWithAbschlussarbeit[0].lastname);
  //   return personsWithAbschlussarbeit

  // }

  openPopUp(): void {
    const dialogRef = this.dialog.open(PopupComponent, {
      id: "0", // TODO: get ID of Abschlussarbeit
      width: "70%"
    });
  }

}
