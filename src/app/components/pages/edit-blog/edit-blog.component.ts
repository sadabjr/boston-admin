import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from 'src/app/service/blog.service';

@Component({
  selector: 'app-edit-blog',
  templateUrl: './edit-blog.component.html',
  styleUrls: ['./edit-blog.component.css'],
})
export class EditBlogComponent {
  displayedColumns: any[] = [
    'title',
    'titleDesc',
    'shortDesc',
    'description',
    'category',
    'subtitle',
    'author',
    'imgFile',
  ];

  blogForm: any; // Initialize with an empty FormGroup
  blogId: string = ''; // Initialize with an empty string
  subtitleSubDescGroups: any = [];
  existingBlog: any;
  selectedFile: any; // Initialize with null

  constructor(
    private fb: FormBuilder,
    private blogService: BlogService,
    private route: ActivatedRoute,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.blogId = this.route.snapshot.params['id'];
    console.log('Blog ID:', this.blogId);
    this.fetch();

    // Fetch the existing blog data by ID
  }

  fetch() {
    this.blogService.getBlogById(this.blogId).subscribe((data) => {
      console.log('Blog Data:', data);
      this.existingBlog = data;
      this.initializeForm(this.existingBlog);
    });
  }

  initializeForm(data: any) {
    // Initialize the form with existing blog data
    this.blogForm = this.fb.group({
      title: [data.title],
      category: [data.category],
      author: [data.author],
      shortDesc: [data.shortDesc],
      description: [data.description],
      imgFile: [''],
      // Add other form controls as needed
    });
  }

  onFileSelected(event: any) {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      this.selectedFile = selectedFile;
      console.log(this.selectedFile);
      // Update the image preview
      const reader = new FileReader();
      reader.onload = (event: any) => {
        this.existingBlog.imgFile.secure_url = event.target.result;
      };
      reader.readAsDataURL(selectedFile);
    }
  }

  addSubField() {
    this.subtitleSubDescGroups.push({ subtitle: '', subDescription: '' });
  }

  removeSubField(index: number) {
    if (this.subtitleSubDescGroups.length > 1) {
      this.subtitleSubDescGroups.splice(index, 1);
    }
  }

  onSubmit() {
    if (this.blogForm.valid) {
      const formData = new FormData();

      formData.append('title', this.blogForm.value.title);
      // formData.append('titleDesc', this.blogForm.value.titleDesc);
      formData.append('shortDesc', this.blogForm.value.shortDesc);
      formData.append('description', this.blogForm.value.description);
      formData.append('category', this.blogForm.value.category);
      // formData.append('subtitle', JSON.stringify(this.blogForm.value.subtitle));
      formData.append('author', this.blogForm.value.author);
      formData.append('imgFile', this.selectedFile);
      console.log(this.blogForm.value);

      // Update the blog data with the form values
      this.blogService.updateBlog(this.blogId, formData).subscribe((res) => {
        console.log(res);
        // Handle the response and navigate back to the blog list or show a success message
        this.router.navigate(['/main/blogs']);
      });
    }
  }
}
