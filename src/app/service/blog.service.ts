import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class BlogService {

  // private apiBaseUrl = 'http://localhost:5000/api/blogs';
  // private apiBaseUrl = 'http://bostonadmin.ezii.live:5000/api/blogs/';
  private apiBaseUrl = 'https://rich-tan-dhole-kilt.cyclic.app/api/blogs/';


  constructor(private _http: HttpClient) {}

  newBlog(data: any): Observable<any> {
    return this._http.post(this.apiBaseUrl, data)

  }

  getAllBlogs(page: number, itemsPerPage: number): Observable<any[]> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('itemsPerPage', itemsPerPage.toString());
    return this._http.get<any[]>(`${this.apiBaseUrl}?${params.toString()}`);
  }

  getBlogById(blogId: string): Observable<any> {
    const url = `${this.apiBaseUrl}/${blogId}`;
    return this._http.get(url);
  }

  deleteBlog(blogId: string): Observable<any> {
    const url = `${this.apiBaseUrl}/${blogId}`;
    return this._http.delete(url);
  }

  updateBlog(blogId: string, data: any): Observable<any> {
    const url = `${this.apiBaseUrl}/${blogId}`;
    return this._http.put(url, data);
  }
}
