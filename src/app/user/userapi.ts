import { Observable } from 'rxjs/Observable';
import { UserInfo } from '../shared/model/user-info';
export abstract class Userapi {
    login: (userInfo:UserInfo) => Promise<any>;
    logout:() => void;
}
