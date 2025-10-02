import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { RolesActions } from './roles.actions';
import { RolesApi } from '../../core/services/roles.service';
import { catchError, map, mergeMap, of, switchMap } from 'rxjs';
import { toUserMessage } from '../../core/interceptors/error-interceptor';

@Injectable()
export class RolesEffects {
  private actions$ = inject(Actions);
  private api = inject(RolesApi);

  load$ = createEffect(() => this.actions$.pipe(
    ofType(RolesActions.load),
    switchMap(({ page = 1, pageSize = 10, query = '' }) =>
      this.api.list(page, pageSize, query).pipe(
        map(({ items, currentPage, totalPages }) => {
          const total = (totalPages - 1) * pageSize + items.length;
          return RolesActions.loadSuccess({ items, total, page: currentPage, pageSize });
        }),
        catchError(err => of(RolesActions.loadFailure({ error: toUserMessage(err) })))
      )
    )
  ));

  get$ = createEffect(() => this.actions$.pipe(
    ofType(RolesActions.get),
    mergeMap(({ id }) => this.api.get(id).pipe(
      map(item => RolesActions.getSuccess({ item })),
      catchError(err => of(RolesActions.getFailure({ error: toUserMessage(err) })))
    ))
  ));

  create$ = createEffect(() => this.actions$.pipe(
    ofType(RolesActions.create),
    mergeMap(({ dto }) => this.api.create(dto).pipe(
      map(item => RolesActions.createSuccess({ item })),
      catchError(err => of(RolesActions.createFailure({ error: toUserMessage(err) })))
    ))
  ));

  update$ = createEffect(() => this.actions$.pipe(
    ofType(RolesActions.update),
    mergeMap(({ id, dto }) => this.api.update(id, dto).pipe(
      map(item => RolesActions.updateSuccess({ item })),
      catchError(err => of(RolesActions.updateFailure({ error: toUserMessage(err) })))
    ))
  ));

  remove$ = createEffect(() => this.actions$.pipe(
    ofType(RolesActions.remove),
    mergeMap(({ id }) => this.api.remove(id).pipe(
      map(() => RolesActions.removeSuccess({ id })),
      catchError(err => of(RolesActions.removeFailure({ error: toUserMessage(err) })))
    ))
  ));
}
