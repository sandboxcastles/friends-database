import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  BarChartComponent,
  getUpdatedDimensionValue,
  numberToNearest,
} from './bar-chart.component';

describe('BarChartComponent', () => {
  let component: BarChartComponent;
  let fixture: ComponentFixture<BarChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BarChartComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

describe('numberToNearest', () => {
  it('should be 55', () => {
    const result = numberToNearest(51, 5);
    expect(result).toBe(55);
  });

  it('should be 100', () => {
    const result = numberToNearest(3, 100);
    expect(result).toBe(100);
  });

  it('should be 43', () => {
    const result = numberToNearest(43, 1);
    expect(result).toBe(43);
  });

  it('should be 43', () => {
    const result = numberToNearest(43, 0);
    expect(result).toBe(43);
  });

  it('should be 4', () => {
    const result = numberToNearest(2, 2);
    expect(result).toBe(4);
  });

  it('should be 4', () => {
    const result = numberToNearest(3, 2);
    expect(result).toBe(4);
  });

  it('should be 55', () => {
    const result = numberToNearest(50, 5);
    expect(result).toBe(55);
  });
});

describe('getUpdatedDimensionValue', () => {
  it('should be 4', () => {
    const result = getUpdatedDimensionValue(6, 1);
    expect(result).toBe(4);
  });

  it('should be 70', () => {
    const result = getUpdatedDimensionValue(70, 0);
    expect(result).toBe(70);
  });

  it('should be 0', () => {
    const result = getUpdatedDimensionValue(4, 2);
    expect(result).toBe(0);
  });

  it('should be 0', () => {
    const result = getUpdatedDimensionValue(2, 2);
    expect(result).toBe(0);
  });
});
