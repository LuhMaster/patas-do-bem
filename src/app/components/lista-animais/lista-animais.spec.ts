import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListaAnimais } from './lista-animais';

describe('ListaAnimais', () => {
  let component: ListaAnimais;
  let fixture: ComponentFixture<ListaAnimais>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaAnimais],
    }).compileComponents();

    fixture = TestBed.createComponent(ListaAnimais);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
