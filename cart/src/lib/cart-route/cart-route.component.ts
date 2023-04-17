import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BannerComponent } from '@pokemon-cards/shared/ui';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'pokemon-cards-cart-route',
  templateUrl: './cart-route.component.html',
  styleUrls: ['./cart-route.component.scss'],
  imports: [BannerComponent, RouterLink],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartRouteComponent {}
