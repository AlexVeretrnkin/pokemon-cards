import { Component } from '@angular/core';
import { BannerComponent } from '@pokemon-cards/shared/ui';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'pokemon-cards-shop',
  standalone: true,
  imports: [BannerComponent, RouterLink],
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent {}
