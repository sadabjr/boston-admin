import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from 'src/app/service/blog.service';

@Component({
  selector: 'app-view-blog',
  templateUrl: './view-blog.component.html',
  styleUrls: ['./view-blog.component.css']
})
export class ViewBlogComponent {

  blog: any; // Define your blog object structure here
  constructor( private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const blogId = params['id']; // 'id' should match the route parameter name

      // Fetch the specific blog post using the ID (you'll need to implement this)
      this.fetchBlogById(blogId);
    });
  }

  async fetchBlogById(blogId: string) {
    try {
      // Make an HTTP request to your API endpoint to fetch the blog post by ID
      const response = await fetch(`https://rich-tan-dhole-kilt.cyclic.app/api/blogs/${blogId}`, {
        method: 'GET',
      });

      if (response.ok) {
        // Parse the response JSON to get the blog data
        const blogData = await response.json();

        // Assign the fetched blog data to the 'blog' property
        this.blog = blogData;
      } else {
        console.error('Failed to fetch blog data.');
      }
    } catch (error) {
      console.error('An error occurred while fetching blog data:', error);
    }
  }

}
