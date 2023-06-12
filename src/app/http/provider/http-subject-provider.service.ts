import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { JournalApiService } from '../service/journal-api.service';

var sub_url= "Subject/";

@Injectable({
  providedIn: 'root'
})
export class HttpSubjectProviderService {

  constructor(private journalApi: JournalApiService) {}

  public getList():Observable<any>{
    return this.journalApi.get(sub_url);
  }

  public delete(id:number):Observable<any>{
    return this.journalApi.delete(sub_url + id);
  }
}
