import {InformationObject} from './informationobject.model';
import {CommunityMashupService} from './../communitymashup.service';
import {MetaTag} from './metatag.model';

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

  getTags(): string {
    var res = '';
    var tagID: MetaTag[] = this.getMetaTags();
    for (var tag of tagID) {
      res = res + tag.name + ', ';
    }
    return res.substring(0, res.length - 2);
    ;
  }
}
