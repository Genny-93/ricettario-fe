import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RicettePerCategoriaPage } from './ricette-per-categoria-page';

describe('RicettePerCategoriaPage', () => {
  let component: RicettePerCategoriaPage;
  let fixture: ComponentFixture<RicettePerCategoriaPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RicettePerCategoriaPage],
    }).compileComponents();

    fixture = TestBed.createComponent(RicettePerCategoriaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
