import { Extension } from './extension.model';
import { CommunityMashupService } from './../communitymashup.service';

export class Attachment extends Extension {

  // additional attributes
  fileUrl: string;
  cachedFileUrl: string;
  cachedOnly: boolean; // TBD
  fileExtension: string;
  fileIdentifier: string;
  cachedFileName: string;
  noCache: boolean; // TBD

  constructor(item, public service: CommunityMashupService) {
    super(item, service);
    // attributes
    this.fileUrl = item['fileUrl'];
    this.fileExtension = item['fileExtension'];
    this.fileIdentifier = item['fileIdentifier'];
  }

}
