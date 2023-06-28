import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JournalApiService } from '../service/journal-api.service';

@Injectable({
  providedIn: 'root'
})
export class HttpProviderService {
  sub_url: string = "";
  constructor(private journalApi: JournalApiService) { }

  public setUrl(url: string) {
    this.sub_url = url;
    return this;
  }

  public getList(): Observable<any> {
    return this.journalApi.get(this.sub_url);
  }

  public get(id: number): Observable<any> {
    return this.journalApi.get(this.sub_url + id);
  }

  public delete(id: number): Observable<any> {
    return this.journalApi.delete(this.sub_url + id);
  }

  public add(entity: any): Observable<any> {
    return this.journalApi.post(this.sub_url, entity);
  }

  public update(entity: any, id: number): Observable<any> {
    return this.journalApi.put(this.sub_url + id, entity);
  }
}
