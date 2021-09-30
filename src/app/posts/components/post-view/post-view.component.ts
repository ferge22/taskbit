import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-post-view',
  templateUrl: './post-view.component.html'
})
export class PostViewComponent implements OnInit {
  postForm!: FormGroup;
  formEdit = false;
  submitDisabled = false;
  private readonly subscriptions = new Subscription();

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService,
    private notifierService: NotifierService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  submit(): void {
    this.submitDisabled = true;

    if (this.postForm.invalid) {
      this.postForm.markAllAsTouched();
      return;
    }

    this.subscriptions.add(
      this.apiService.updatePost(this.activatedRoute.snapshot.params.id, { ...this.postForm.value }).subscribe(
        (res: any) => {
          this.notifierService.notify('success', 'Post was successfully edited');
          this.router.navigate(['posts'])
        },
        (err: any) => {
          this.notifierService.notify('error', 'Somethink went wrong please try again later!');
        }
      )
    );
  }

  private initForm(): void {
    this.postForm = this.formBuilder.group(
      {
        title: [null, Validators.required],
        body: [null, Validators.required],
        id: [null],
        userId: [null]
      },
    );
  }
}
