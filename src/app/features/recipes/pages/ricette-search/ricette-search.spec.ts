import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RicetteSearch } from './ricette-search';

describe('RicettePerCategoriaPage', () => {
  let component: RicetteSearch;
  let fixture: ComponentFixture<RicetteSearch>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RicetteSearch],
    }).compileComponents();

    fixture = TestBed.createComponent(RicetteSearch);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
