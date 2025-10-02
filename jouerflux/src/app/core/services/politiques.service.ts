import { Injectable, inject } from '@angular/core';
import { ApiService } from './api.service';
import { map, Observable } from 'rxjs';
import { Politique } from '../../state/politiques/politiques.actions';

@Injectable({ providedIn: 'root' })
export class PolitiquesApi {
  private api = inject(ApiService);

  list(page = 1, perPage = 10, query = ''): Observable<{ items: Politique[]; currentPage: number; totalPages: number }> {
    return this.api.get<any>('/policies', { page, per_page: perPage, q: query }).pipe(
      map(res => ({
        items: res?.items ?? [],
        currentPage: Number(res?.current_page ?? page),
        totalPages: Number(res?.total_pages ?? 1)
      }))
    );
  }

  get(id: number) {
    return this.api.get<Politique>(`/policies/${id}`);
  }

  create(dto: Partial<Politique>) {
    return this.api.post<Politique>('/policies', dto);
  }

  update(id: number, dto: Partial<Politique>) {
    return this.api.put<Politique>(`/policies/${id}`, dto);
  }

  remove(id: number) {
    return this.api.delete<void>(`/policies/${id}`);
  }
}
