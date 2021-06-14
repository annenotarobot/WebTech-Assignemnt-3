import { InformationObject } from './informationobject.model';
import { Person } from './person.model';
import { CommunityMashupService } from './../communitymashup.service';

export class Organisation extends InformationObject {

  // no additional attributes
  // additional references
  // parentOrganisation:Organisation, members:Person, organizations:Organisation
  parentOrganisation: string = null;
  organisations: string[] = [];
  members: string[] = [];

  constructor(item, public service: CommunityMashupService) {
    super(item, service);
    // reference parentOrganisation
    this.parentOrganisation = item['parentOrganisation'];
    // reference organisations
    var tmps = item['organisations'];
    if(tmps) {
      var tmpsArr = tmps.split(" ");
      tmpsArr.forEach(id => this.organisations.push(id));
    }
    // reference members
    tmps = item['members'];
    if(tmps) {
      var tmpsArr = tmps.split(" ");
      tmpsArr.forEach(id => this.members.push(id));
    }
  }

  getParentOrganisation(): Organisation {
    if (this.parentOrganisation) {
      return this.service.getItemById(this.parentOrganisation);
    }
    return null;
  }

  getChildOrganisations(): Organisation[] {
    var result: Organisation[] = [];
    this.organisations.forEach(id => result.push(this.service.getItemById(id)));
    return result;
  }

  getMembers(): Person[] {
    var result: Person[] = [];
    this.members.forEach(id => result.push(this.service.getItemById(id)));
    return result;
  }

}
