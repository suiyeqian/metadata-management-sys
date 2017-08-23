// This shows a different way of testing a component, check about for a simpler one
import { Component } from '@angular/core';

import { TestBed } from '@angular/core/testing';

import { OverviewComponent } from './overview.component';

describe('Overview Component', () => {
  const html = '<my-overview></my-overview>';

  beforeEach(() => {
    TestBed.configureTestingModule({declarations: [OverviewComponent, TestComponent]});
    TestBed.overrideComponent(TestComponent, { set: { template: html }});
  });

  it('should ...', () => {
    const fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement.children[0].textContent).toContain('Overview Works!');
  });

});

@Component({selector: 'my-test', template: ''})
class TestComponent { }
