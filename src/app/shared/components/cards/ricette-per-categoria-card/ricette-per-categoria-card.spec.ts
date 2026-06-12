import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RicetteCategoriaCard } from './ricette-per-categoria-card';

describe('RicetteCategoriaCard', () => {
  let component: RicetteCategoriaCard;
  let fixture: ComponentFixture<RicetteCategoriaCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RicetteCategoriaCard],
    }).compileComponents();

    fixture = TestBed.createComponent(RicetteCategoriaCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
