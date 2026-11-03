import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginVoluntario } from './login-voluntario';

describe('LoginVoluntario', () => {
  let component: LoginVoluntario;
  let fixture: ComponentFixture<LoginVoluntario>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginVoluntario],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginVoluntario);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
