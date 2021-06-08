import { InformationObject } from './informationobject.model'
import { Organisation } from './organisation.model';
import { Content } from './content.model';
import { CommunityMashupService } from './../communitymashup.service';

export class Person extends InformationObject {

  // additional attributes
  title: string;
  lastname: string;
  firstname: string;
  dateOfBirth: string;
  // additional references
  // leaderOf:Org, authored:Content, contributed:Content, persons:Person, ranked:Ranking

  constructor(item, public service: CommunityMashupService) {
    super(item, service);
    // attributes
    this.title = item['title'];
    this.lastname = item['lastname'];
    this.firstname = item['firstname'];
    this.dateOfBirth = item['dateOfBirth'];
  }

  getLeaderOf(): Organisation {
    // TBD
    return null;
  }

  getAuthored(): Content[] {
    // TBD
    return null;
  }

  getContributed(): Content[] {
    // TBD
    return null;
  }

  getPersons(): Person[] {
    // TBD
    return null;
  }

  // TBD: getRanked

}
