import { Classification } from './classification.model';
import { CommunityMashupService } from './../communitymashup.service';

export class Category extends Classification {

  constructor(item, public service: CommunityMashupService) {
    super(item, service);
  }

  // TBD: getCategorized()
  // TBD: getParentCategrory
  // TBD: getCategories
  // TBD: getMainCategorized

}
