import { TestBed, fakeAsync } from '@angular/core/testing';
import { BehaviorSubject, of } from 'rxjs';
import { Action, Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { provideZonelessChangeDetection } from '@angular/core';

import { FirewallListComponent } from './firewall-list';

import {
  selectFirewalls,
  selectFwLoading,
  selectFwError,
  selectFwPage,
  selectFwPageSize,
  selectFwTotal
} from '../../../state/firewalls/firewalls.selectors';

interface Firewall { id: number; name: string; }

fdescribe('FirewallListComponent', () => {
  let component: FirewallListComponent;

  const items$    = new BehaviorSubject<Firewall[]>([]);
  const loading$  = new BehaviorSubject<boolean>(false);
  const error$    = new BehaviorSubject<string | null>(null);
  const page$     = new BehaviorSubject<number>(1);
  const pageSize$ = new BehaviorSubject<number>(10);
  const total$    = new BehaviorSubject<number>(0);

  const storeSpy = jasmine.createSpyObj<Store>('Store', ['select', 'dispatch']);

  storeSpy.select.and.callFake((selector: any) => {
    if (selector === selectFirewalls)   return items$.asObservable();
    if (selector === selectFwLoading)   return loading$.asObservable();
    if (selector === selectFwError)     return error$.asObservable();
    if (selector === selectFwPage)      return page$.asObservable();
    if (selector === selectFwPageSize)  return pageSize$.asObservable();
    if (selector === selectFwTotal)     return total$.asObservable();
    return of(null);
  });

  const dialogSpy = jasmine.createSpyObj<MatDialog>('MatDialog', ['open']);
  dialogSpy.open.and.returnValue({ afterClosed: () => of(false) } as any);

  const lastAction = (): Action =>
  storeSpy.dispatch.calls.mostRecent().args[0] as unknown as Action;

  const dispatchedTypes = (): string[] =>
  storeSpy.dispatch.calls.allArgs().map(a => (a[0] as unknown as Action).type);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FirewallListComponent],
      providers: [
        provideNoopAnimations(),
        { provide: Store, useValue: storeSpy },
        { provide: MatDialog, useValue: dialogSpy },
      ],
    }).compileComponents();

    const fixture = TestBed.createComponent(FirewallListComponent);
    component = fixture.componentInstance;

    storeSpy.dispatch.calls.reset();
    dialogSpy.open.calls.reset();
    items$.next([]);
    loading$.next(false);
    error$.next(null);
    page$.next(1);
    pageSize$.next(10);
    total$.next(0);
  });

  it('ngOnInit() doit dispatch [Firewalls] Load', () => {
    component.ngOnInit();
    expect(storeSpy.dispatch).toHaveBeenCalled();
    expect(lastAction().type).toContain('[Firewalls] Load');
  });

  it('onSearch() doit mettre à jour le signal de recherche', () => {
    component.onSearch('tes');
    expect(component['search']()).toBe('tes');
  });

  it('onSearch("") doit repasser en pagination serveur (Load)', () => {
    component.onSearch('');
    expect(lastAction().type).toContain('[Firewalls] Load');
  });

  it('askDelete() doit ouvrir un dialog et, si confirmé, supprimer puis recharger', () => {
    dialogSpy.open.and.returnValue({ afterClosed: () => of(true) } as any);

    items$.next([{ id: 3, name: 'fw-3' }]);
    component.askDelete({ id: 3, name: 'fw-3' } as Firewall);

    const types = dispatchedTypes();
    expect(types.some(t => t.includes('[Firewalls] Remove'))).toBeTrue();
    expect(types.some(t => t.includes('[Firewalls] Load'))).toBeTrue();
  });

  it('openCreate() + submitCreate() doivent créer puis recharger', () => {
    dialogSpy.open.and.returnValue({ afterClosed: () => of(true) } as any);

    component.openCreate();
    component.createForm.setValue({ name: 'new-fw' });
    component.submitCreate();

    const types = dispatchedTypes();
    expect(types.some(t => t.includes('[Firewalls] Create'))).toBeTrue();
    expect(types.some(t => t.includes('[Firewalls] Load'))).toBeTrue();
  });

  it('openEdit() + submitEdit() doivent update puis recharger', () => {
    dialogSpy.open.and.returnValue({ afterClosed: () => of(true) } as any);

    component.openEdit({ id: 9, name: 'old' } as Firewall);
    component.editForm.setValue({ name: 'new' });
    component.submitEdit();

    const types = dispatchedTypes();
    expect(types.some(t => t.includes('[Firewalls] Update'))).toBeTrue();
    expect(types.some(t => t.includes('[Firewalls] Load'))).toBeTrue();
  });

  it('filtered() doit filtrer côté client quand la recherche est non vide', () => {
    items$.next([
      { id: 1, name: 'alpha' } as any,
      { id: 2, name: 'beta'  } as any,
    ]);
    component.onSearch('alp');
    const res = component['filtered']();
    expect(res.length).toBe(1);
    expect(res[0].name).toBe('alpha');
  });

  it('paged() doit retourner items() quand la recherche est vide', () => {
    items$.next([{ id: 1, name: 'a' } as any]);
    component.onSearch('');
    expect(component['paged']()).toEqual([{ id: 1, name: 'a' } as any]);
  });
});
