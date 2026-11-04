import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartaoAnimal } from './cartao-animal';

describe('CartaoAnimal', () => {
  let component: CartaoAnimal;
  let fixture: ComponentFixture<CartaoAnimal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartaoAnimal],
    }).compileComponents();

    fixture = TestBed.createComponent(CartaoAnimal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
