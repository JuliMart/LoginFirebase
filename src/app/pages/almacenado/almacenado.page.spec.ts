import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { AlmacenadoPage } from './almacenado.page';

describe('AlmacenadoPage', () => {
  let component: AlmacenadoPage;
  let fixture: ComponentFixture<AlmacenadoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AlmacenadoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
