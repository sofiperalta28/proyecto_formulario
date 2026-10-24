import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Pasatiempos } from './pasatiempos';

describe('Pasatiempos', () => {
  let component: Pasatiempos;
  let fixture: ComponentFixture<Pasatiempos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Pasatiempos],
    }).compileComponents();

    fixture = TestBed.createComponent(Pasatiempos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
