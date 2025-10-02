import { Injectable, inject } from '@angular/core';
import { ApiService } from './api.service';
import { map, Observable } from 'rxjs';
import { Role } from '../../state/roles/roles.actions';

@Injectable({ providedIn: 'root' })
export class RolesApi {
  private api = inject(ApiService);

  list(page = 1, perPage = 10, query = ''): Observable<{ items: Role[]; currentPage: number; totalPages: number }> {
    return this.api.get<any>('/rules', { page, per_page: perPage, q: query }).pipe(
      map(res => ({
        items: res?.items ?? [],
        currentPage: Number(res?.current_page ?? page),
        totalPages: Number(res?.total_pages ?? 1)
      }))
    );
  }

  get(id: number) {
    return this.api.get<Role>(`/rules/${id}`);
  }

  create(dto: Partial<Role>) {
    return this.api.post<Role>('/rules', dto);
  }

  update(id: number, dto: Partial<Role>) {
    return this.api.put<Role>(`/rules/${id}`, dto);
  }

  remove(id: number) {
    return this.api.delete<void>(`/rules/${id}`);
  }
}
