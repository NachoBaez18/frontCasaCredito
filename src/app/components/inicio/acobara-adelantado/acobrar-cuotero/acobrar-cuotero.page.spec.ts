import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AcobrarCuoteroPage } from './acobrar-cuotero.page';

describe('AcobrarCuoteroPage', () => {
  let component: AcobrarCuoteroPage;
  let fixture: ComponentFixture<AcobrarCuoteroPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AcobrarCuoteroPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AcobrarCuoteroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
