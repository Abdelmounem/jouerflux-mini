import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { FirewallsActions } from './firewalls.actions';
import { FirewallsApi } from '../../core/services/firewalls.service';
import { catchError, map, mergeMap, of, switchMap } from 'rxjs';
import { toUserMessage } from '../../core/interceptors/error-interceptor';

@Injectable()
export class FirewallsEffects {
private actions$ = inject(Actions);
private api = inject(FirewallsApi);


load$ = createEffect(() => this.actions$.pipe(
    ofType(FirewallsActions.load),
    switchMap(({ page = 1, pageSize = 10, query = '' }) =>
      this.api.list(page, pageSize, query).pipe(
        map(({ items, currentPage, totalPages }) => {
          // total exact pour MatPaginator
          const total = (totalPages - 1) * pageSize + items.length;
          return FirewallsActions.loadSuccess({
            items,
            total,
            page: currentPage,
            pageSize
          });
        }),
        catchError(err => of(FirewallsActions.loadFailure({ error: toUserMessage(err) })))
      )
    )
  ));

get$ = createEffect(() => this.actions$.pipe(
ofType(FirewallsActions.get),
mergeMap(({ id }) => this.api.get(id).pipe(
map(item => FirewallsActions.getSuccess({ item })),
catchError(err => of(FirewallsActions.getFailure({ error: toUserMessage(err) })))
))
));


create$ = createEffect(() => this.actions$.pipe(
ofType(FirewallsActions.create),
mergeMap(({ dto }) => this.api.create(dto).pipe(
map(item => FirewallsActions.createSuccess({ item })),
catchError(err => of(FirewallsActions.createFailure({ error: toUserMessage(err) })))
))
));


update$ = createEffect(() => this.actions$.pipe(
ofType(FirewallsActions.update),
mergeMap(({ id, dto }) => this.api.update(id, dto).pipe(
map(item => FirewallsActions.updateSuccess({ item })),
catchError(err => of(FirewallsActions.updateFailure({ error: toUserMessage(err) })))
))
));


remove$ = createEffect(() => this.actions$.pipe(
ofType(FirewallsActions.remove),
mergeMap(({ id }) => this.api.remove(id).pipe(
map(() => FirewallsActions.removeSuccess({ id })),
catchError(err => of(FirewallsActions.removeFailure({ error: toUserMessage(err) })))
))
));
}