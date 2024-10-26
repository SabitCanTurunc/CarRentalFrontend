import { Component, inject, OnInit } from '@angular/core';
import { CartSummaryComponent } from '../cart-summary/cart-summary.component';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { UserActionsService } from '../../services/user-actions.service';

@Component({
  selector: 'app-navi',
  standalone: true,
  imports: [CartSummaryComponent, CommonModule],
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css'], // styleUrl yerine styleUrls
})
export class NaviComponent implements OnInit {
  authService = inject(AuthService);
  userActionsService = inject(UserActionsService);
  userName: string | null = null;
  userExists = false;

  ngOnInit(): void {
    this.checkUserStatus();
  }

  checkUserStatus(): void {
    this.userExists = this.authService.isAuthenticated();
    this.userName = this.userExists ? this.userActionsService.getNameFromToken() : null;
    console.log(this.userName); // Durumu görmek için log
  }
}
