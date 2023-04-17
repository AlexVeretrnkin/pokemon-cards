import { Routes } from '@angular/router';
import { ShopComponent } from './shop/shop.component';

export const appRoutes: Routes = [
    {
        path: 'cart',
        loadChildren: () => import('@pokemon-cards/cart')
    },
    {
        path: '**',
        component: ShopComponent
    }
];
