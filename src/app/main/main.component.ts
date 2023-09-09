import { Component, HostListener, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { SidebarService } from '../service/sidebar.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent {
  windowWidth: number = window.innerWidth; // Initialize with the initial window width
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.windowWidth = event.target.innerWidth;
  }

  showSidebar: boolean = true;

  constructor(private router: Router, private sidebarService: SidebarService) {}
  get showSidebarS(): boolean {
    return this.sidebarService.showSidebar;
  }

  ngOnInit() {
    // Subscribe to router events to update the header and sidebar visibility
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Check the current route and update the header and sidebar visibility accordingly
        const currentRoute = event.url;
        console.log(currentRoute);
        this.showSidebar = !currentRoute.includes('/login');
      }
    });
  }
}
