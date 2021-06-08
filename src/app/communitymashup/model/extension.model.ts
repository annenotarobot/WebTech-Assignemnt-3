import { Item } from './item.model';
import { CommunityMashupService } from './../communitymashup.service';

export class Extension extends Item {

  constructor(item, public service: CommunityMashupService) {
    super(item, service);
  }

  // TBD: getTags()

}
