import { Metainformation } from './metainformation.model';
import { CommunityMashupService } from './communitymashup.service';

export class WebSite extends Metainformation {

  // additional attributes
  address: string;
  title: string;
  shortenedUrl: string;

  constructor(item, public service: CommunityMashupService) {
    super(item, service);
    // attributes
    this.address = item['address'];
    this.title = item['title'];
    this.shortenedUrl = item['shortenedUrl'];
  }

}