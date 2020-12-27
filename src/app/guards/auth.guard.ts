import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private dataService: DataService,
) {}

canActivate() {
    const roles = this.dataService.getRoles();
    const userData = this.dataService.getUser();
    if (userData) {
      const admin = roles.filter((role) => {
        return role.username === userData.username && role.username === userData.password;
      });

      const user = this.dataService.getUserList().filter((u) => {
        return u.userName === userData.username && u.userName === userData.password;
      });


      if (user.length > 0) {
        localStorage.user = JSON.stringify(user[0].userName);
        return true;
      }
      else if (admin.length > 0) {
        localStorage.user = JSON.stringify(admin[0].username);
        return true;
      }
    }
    else if (localStorage.user) {
      return true;
    }

    if (userData) {
      alert("User doesn't exists");
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/login']);
    return false;
}

}
