import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PolitiquesActions } from './politiques.actions';
import { PolitiquesApi } from '../../core/services/politiques.service';
import { catchError, map, of, switchMap, mergeMap } from 'rxjs';
import { toUserMessage } from '../../core/interceptors/error-interceptor';

@Injectable()
export class PolitiquesEffects {
  private actions$ = inject(Actions);
  private api = inject(PolitiquesApi);

  load$ = createEffect(() => this.actions$.pipe(
    ofType(PolitiquesActions.load),
    switchMap(({ page = 1, pageSize = 10, query = '' }) =>
      this.api.list(page, pageSize, query).pipe(
        map(({ items, currentPage, totalPages }) => {
          const total = (totalPages - 1) * pageSize + items.length;
          return PolitiquesActions.loadSuccess({ items, total, page: currentPage, pageSize });
        }),
        catchError(err => of(PolitiquesActions.loadFailure({ error: toUserMessage(err) })))
      )
    )
  ));

  get$ = createEffect(() => this.actions$.pipe(
    ofType(PolitiquesActions.get),
    mergeMap(({ id }) => this.api.get(id).pipe(
      map(item => PolitiquesActions.getSuccess({ item })),
      catchError(err => of(PolitiquesActions.getFailure({ error: toUserMessage(err) })))
    ))
  ));

  create$ = createEffect(() => this.actions$.pipe(
    ofType(PolitiquesActions.create),
    mergeMap(({ dto }) => this.api.create(dto).pipe(
      map(item => PolitiquesActions.createSuccess({ item })),
      catchError(err => of(PolitiquesActions.createFailure({ error: toUserMessage(err) })))
    ))
  ));

  update$ = createEffect(() => this.actions$.pipe(
    ofType(PolitiquesActions.update),
    mergeMap(({ id, dto }) => this.api.update(id, dto).pipe(
      map(item => PolitiquesActions.updateSuccess({ item })),
      catchError(err => of(PolitiquesActions.updateFailure({ error: toUserMessage(err) })))
    ))
  ));

  remove$ = createEffect(() => this.actions$.pipe(
    ofType(PolitiquesActions.remove),
    mergeMap(({ id }) => this.api.remove(id).pipe(
      map(() => PolitiquesActions.removeSuccess({ id })),
      catchError(err => of(PolitiquesActions.removeFailure({ error: toUserMessage(err) })))
    ))
  ));
}
