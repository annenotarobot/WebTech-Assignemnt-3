import { Attachment } from './attachment.model';
import { CommunityMashupService } from './../communitymashup.service';

export class Image extends Attachment {

  // additional attributes
  width: number;
  height: number;

  constructor(item, public service: CommunityMashupService) {
    super(item, service);
    // attributes
    this.width = item['width'];
    this.height = item['height'];
  }

}
