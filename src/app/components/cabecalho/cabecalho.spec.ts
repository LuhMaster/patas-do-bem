import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Cabecalho } from './cabecalho';
import { provideRouter } from '@angular/router';

describe('Cabecalho', () => {
  let component: Cabecalho;
  let fixture: ComponentFixture<Cabecalho>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Cabecalho],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Cabecalho);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
