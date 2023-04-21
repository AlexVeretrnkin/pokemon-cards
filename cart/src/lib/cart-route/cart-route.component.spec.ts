import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartRouteComponent } from './cart-route.component';
import { provideRouter } from '@angular/router';

describe('CartRouteComponent', () => {
  let component: CartRouteComponent;
  let fixture: ComponentFixture<CartRouteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartRouteComponent],
      providers: [
        provideRouter([])
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CartRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
