import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { MaterialModule } from 'src/app/material/material.module';
import { State } from 'src/app/state/reducers';
import { ChartViewerComponent } from './chart-viewer.component';

describe('FriendListComponent', () => {
  let component: ChartViewerComponent;
  let fixture: ComponentFixture<ChartViewerComponent>;
  let store: MockStore;
  const initialState: State = { friends: { allFriends: [] } };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, RouterModule.forChild([]), MaterialModule],
      declarations: [ChartViewerComponent],
      providers: [provideMockStore({ initialState })],
    });
    store = TestBed.inject(MockStore);

    fixture = TestBed.createComponent(ChartViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change chart type', () => {
    component.changeChartType('theTest');
    expect(component.chosenChartType).toBe('theTest');
  });
});
