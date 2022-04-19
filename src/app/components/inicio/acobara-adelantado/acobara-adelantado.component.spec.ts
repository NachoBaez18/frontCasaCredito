import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AcobaraAdelantadoComponent } from './acobara-adelantado.component';

describe('AcobaraAdelantadoComponent', () => {
  let component: AcobaraAdelantadoComponent;
  let fixture: ComponentFixture<AcobaraAdelantadoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AcobaraAdelantadoComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AcobaraAdelantadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
