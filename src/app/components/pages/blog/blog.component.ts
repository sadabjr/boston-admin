import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlogService } from 'src/app/service/blog.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
})
export class BlogComponent implements OnInit {
  tableData: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10; // You can change this to your desired number
  totalItems: number = 0;

  getPages(): number[] {
    const pageCount = Math.ceil(this.totalItems / this.itemsPerPage);
    return Array.from({ length: pageCount }, (_, i) => i + 1);
  }

  pageChanged(event: any): void {
    this.currentPage = event.page;
    this.fetchBlogData();
  }

  constructor(private blogService: BlogService, private router: Router) {}

  ngOnInit(): void {
    this.fetchBlogData();
  }

  fetchBlogData(): void {
    this.blogService.getAllBlogs(this.currentPage, this.itemsPerPage).subscribe(
      (data) => {
        this.tableData = data;
      },
      (error) => {
        console.error('Error fetching data: ', error);
      }
    );
  }

  editBlog(blogId: string): void {
    // Redirect to the edit blog page with the blog's ID as a parameter
    this.router.navigate(['/main/edit-blog', blogId]);
  }

  viewBlog(blogId: string): void {
    // Redirect to the edit blog page with the blog's ID as a parameter
    this.router.navigate(['/main/view-blog', blogId]);
  }

  deleteBlog(blogId: string): void {
    if (confirm('Are you sure you want to delete this blog?')) {
      this.blogService.deleteBlog(blogId).subscribe((response) => {
        // Handle the response from the API
        if (response.success) {
          // Remove the deleted blog from your local list (tableData)
          this.tableData = this.tableData.filter((blog) => blog._id !== blogId);
          // You may also want to display a success message to the user
          console.log('Blog deleted successfully.');
        } else {
          // Handle the case where the delete operation was not successful
          console.error('Failed to delete blog:', response.message);
        }
      });
    }
  }
}
