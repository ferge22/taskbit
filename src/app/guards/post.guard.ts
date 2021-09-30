import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, UrlTree } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ApiService, Post } from '../services/api.service';

@Injectable({
  providedIn: 'root'
})
export class PostGuard implements CanActivate {
  constructor(
    private apiService: ApiService,
    private router: Router,
    private notifierService: NotifierService
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.apiService.getPost(route.params.id).pipe(
      map((data: Post) => {
        if (data.id) {
          return true;
        } else {
          this.notifierService.notify('error', 'Post not found!')
          this.router.navigate(['/posts']);
          return false;
        }
      }),
      catchError(() => {
        this.notifierService.notify('error', 'Post not found!')
        return this.router.navigate(['/posts']);
      })
    )
  };
}
