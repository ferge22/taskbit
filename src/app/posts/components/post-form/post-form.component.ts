import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Post, ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html'
})
export class PostFormComponent implements OnInit {
  @Input() formGroup!: FormGroup;
  @Input() formEdit = true;
  private readonly subscriptions = new Subscription();

  constructor(
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService,

  ) { }

  ngOnInit(): void {
    if (!this.formEdit) {
      this.subscriptions.add(
        this.apiService.getPost(this.activatedRoute.snapshot.params.id).subscribe(
          (res: Post) => {
            this.formGroup.patchValue(res)
          },
          (err) => {
            console.log(err);
          }
        )
      );
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  checkControlValidity(control: string) {
    return this.getControl(control).invalid && this.getControl(control).touched;
  }

  getControl(name: string): FormControl {
    return this.formGroup.get(name) as FormControl;
  }
}
