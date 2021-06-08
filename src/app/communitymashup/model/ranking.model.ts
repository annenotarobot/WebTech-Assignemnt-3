import { Extension } from './extension.model';
import { CommunityMashupService } from './communitymashup.service';

export class Ranking extends Extension {

  // TBD: date

  constructor(item, public service: CommunityMashupService) {
    super(item, service);
  }

  // TBD: getRanker

}
