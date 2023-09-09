import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  private _showSidebar: boolean = true;

  get showSidebar(): boolean {
    return this._showSidebar;
  }

  set showSidebar(value: boolean) {
    this._showSidebar = value;
  }

  constructor() {}
}
