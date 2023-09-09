import { DialogRef } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from 'src/app/service/blog.service';

@Component({
  selector: 'app-new-blog',
  templateUrl: './new-blog.component.html',
  styleUrls: ['./new-blog.component.css'],
})
export class NewBlogComponent implements OnInit {
  subtitleSubDescGroups: any[] = [{ subtitle: '', subDescription: '' }];
  blogForm: any;
  getImgExt: any;
  ImgUrl: any;
  imgName: any;
  selectedFile: any;
  data: any;

  // constructor (private _fb: FormBuilder, private _blogService: BlogService, private _dialogRef: DialogRef<NewBlogComponent>) {
  //  this.empForm = this._fb.group({
  //   title:"",
  //   titleDesc:"",
  //   shortDesc:"",
  //   description:"",
  //   category:"",
  //   subtitle:[

  //   ],
  //   author:"",
  //   onFileSelected(){}

  //  })
  // }

  constructor(
    private _fb: FormBuilder,
    private _blogService: BlogService,
    private route: ActivatedRoute,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadForm();
  }

  addSubField() {
    this.subtitleSubDescGroups.push({ subtitle: '', subDescription: '' });
  }

  removeSubField(index: number) {
    if (this.subtitleSubDescGroups.length > 1) {
      this.subtitleSubDescGroups.splice(index, 1);
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  // selectedFile: any = null;

  // onFileSelected(event: any): void {
  //     this.selectedFile = event.target.files[0] ?? null;

  // }

  loadForm() {
    this.blogForm = this._fb.group({
      title: ['', Validators.compose([Validators.required])],
      titleDesc: ['', Validators.compose([Validators.required])],
      shortDesc: ['', Validators.compose([Validators.required])],
      description: ['', Validators.compose([Validators.required])],
      category: ['', Validators.compose([Validators.required])],
      subtitle: ['', Validators.compose([Validators.required])],
      author: ['', Validators.compose([Validators.required])],
    });
  }

  onSubmit() {
    const formData = new FormData();

    formData.append('title', this.blogForm.value.title);
    formData.append('titleDesc', this.blogForm.value.titleDesc);
    formData.append('shortDesc', this.blogForm.value.shortDesc);
    formData.append('description', this.blogForm.value.description);
    formData.append('category', this.blogForm.value.category);
    formData.append('subtitle', JSON.stringify(this.blogForm.value.subtitle));
    formData.append('author', this.blogForm.value.author);
    formData.append('imgFile', this.selectedFile);
    console.log(this.blogForm.value);

    this._blogService.newBlog(formData).subscribe((res) => {
      this.data = res;
      if (this.data.success == true) {
        this.openSnackBar('Blog created Successfully!', 'dismiss');
        this.router.navigate(['/main/blogs'], {
          relativeTo: this.route,
        });
      } else {
        this.openSnackBar(this.data.message, 'dismiss');
      }

      console.log(this.data);
    });
  }

  onFileSelected(event: any) {
    let selResult = event.target.value.split('.');
    this.getImgExt = selResult.pop();
    this.getImgExt.toLowerCase();
    if (
      this.getImgExt == 'png' ||
      this.getImgExt == 'jpg' ||
      this.getImgExt == 'jpeg'
    ) {
      this.selectedFile = <File>event.target.files[0];
      if (event.target.files && event.target.files[0]) {
        var reader = new FileReader();
        reader.onload = (event: any) => {
          this.ImgUrl = event.target.result;
        };
        reader.readAsDataURL(event.target.files[0]);
        this.imgName = event.target.files[0].name;
      }
    } else {
      /*this.matSnackBar.open("Profile image allowed only jpg or png format", 'Close', {
      duration: 5000,
    });*/
    }
  }

  // onFormSubmit() {
  //   if(this.empForm.valid){
  //     console.log(this.empForm.value)
  //     this._blogService.newBlog(this.empForm.value).subscribe({
  //       next: (val: any) =>{
  //         alert('blog added sucess ')
  //         this._dialogRef.close
  //       },
  //       error: (err: any) =>{
  //         console.log(err);
  //       }
  //     })
  //   }
  // }
}
