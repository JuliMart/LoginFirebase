import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {

  email:string = '';
  constructor(
    private navCtrl: NavController,
 

  ) { }

  ngOnInit() {
  }

  reset(){
    
  }
  navigateLeft() {
    this.navCtrl.back();
  }

}
