import { InformationObject } from './informationobject.model';
import { CommunityMashupService } from './../communitymashup.service';

export class Content extends InformationObject {

  // additional attributes
  locale: string;
  // additional references
  // contents:Content, contributors:Person, author:Person, documents:Document, parentContent:Content, videos:Video

  constructor(item, public service: CommunityMashupService) {
    super(item, service);
    // attributes
    this.locale = item['locale'];
  }

  // TBD: getContents()
  // TBD: getContributors()
  // TBD: getAuthor()
  // TBD: getDocuments()
  // TBD: getParentContent()
  // TBD: getVideos()

}
