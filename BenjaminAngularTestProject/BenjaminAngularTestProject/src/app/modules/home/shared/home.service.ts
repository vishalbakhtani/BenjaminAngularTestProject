import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiCallService } from '../../../services/api-call.service';

@Injectable({
    providedIn: 'root'
})
export class HomeService {

    constructor(private api: ApiCallService) { }

    getPosts(): Observable<any> {
        return this.api.get<any>("https://randomuser.me/api/?results=100", 'Get Posts', null);
    }
}
