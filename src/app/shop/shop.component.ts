import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerComponent } from '@pokemon-cards/shared/ui';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'pokemon-cards-shop',
  standalone: true,
  imports: [CommonModule, BannerComponent, RouterLink],
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent {}
