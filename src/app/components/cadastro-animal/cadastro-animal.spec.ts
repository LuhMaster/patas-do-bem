import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CadastroAnimal } from './cadastro-animal';

describe('CadastroAnimal', () => {
  let component: CadastroAnimal;
  let fixture: ComponentFixture<CadastroAnimal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastroAnimal],
    }).compileComponents();

    fixture = TestBed.createComponent(CadastroAnimal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
