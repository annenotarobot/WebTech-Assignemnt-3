import { Ranking } from './ranking.model';
import { CommunityMashupService } from './communitymashup.service';

export class StarRanking extends Ranking {

  // TBD: normalizedValue

  constructor(item, public service: CommunityMashupService) {
    super(item, service);
  }

  // TBD: getRankedInformationObject

}
