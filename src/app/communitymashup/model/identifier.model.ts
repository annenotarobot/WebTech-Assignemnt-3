import { Item } from './item.model';
import { CommunityMashupService } from './../communitymashup.service';

export class Identifier extends Item {

  // additional attributes
  key: string;
  value: string;

  constructor(item, public service: CommunityMashupService) {
    super(item, service);
    // attributes
    this.key = item['key'];
    this.value = item['value'];
  }

}
