import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';


@Component({
  selector: 'login',
  template: `
  <input [(ngModel)]="userName">
  <button (click)="login()">Login</button>`

})
export class LoginComponent implements OnInit{

    private uId;
    private userName = "";

    constructor(private authService:AuthService,
                private router: Router){
    }

    ngOnInit() {

    }

    public login(){
        if(this.userName.length > 0){
            let uId = this.hashCode(this.userName);
            this.authService.setUserId(uId);

            let url: string  = this.authService.getRedirectUrl();

            if(url.length == 0)
                url = "/q/1";

            console.log(url);

            this.router.navigate([url]);
        } else {
            console.log("Username to short");
        }
    }


    public hashCode(str) {
        let hash = 0, i, chr, len;
        if (str.length === 0) return hash;

        for (i = 0, len = str.length; i < len; i++) {
            chr   = str.charCodeAt(i);
            hash  = ((hash << 5) - hash) + chr;
            hash |= 0; // Convert to 32bit integer
        }
        return hash;
    }


}
