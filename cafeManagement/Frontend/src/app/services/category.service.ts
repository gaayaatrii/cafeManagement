import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  url=environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  add(data: any) {
    return this.httpClient.post(this.url + "/category/add", data, {
      headers: new HttpHeaders().set('containt-type', 'application/Json')
    })
  }

  update(data: any) {
    return this.httpClient.post(this.url + "/category/update", data, {
      headers: new HttpHeaders().set('containt-type', 'application/Json')
    })
  }

  getCategory() {
    return this.httpClient.get(this.url + "/category/get")
  }

  getFilterCategory() {
    return this.httpClient.get(this.url + "/category/get?filterValue=true")
  }




}
