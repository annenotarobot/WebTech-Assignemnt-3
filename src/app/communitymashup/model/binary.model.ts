import { Attachment } from './attachment.model';
import { CommunityMashupService } from './../communitymashup.service';

export class Binary extends Attachment {

  // TBD: bytes

  constructor(item, public service: CommunityMashupService) {
    super(item, service);
  }

}
