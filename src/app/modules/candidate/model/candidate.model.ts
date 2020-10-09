import { SocialEntry } from '../../../shared/model/social-entry.model';
import { SocialNetwork } from '../../../shared/model/social-network.model';
export class Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
  currentCompany: string;
  socialNetwork: SocialNetwork[];
  socialEntries: SocialEntry[];
  lastUpdate: Date;
}
