import { Injectable, inject } from '@angular/core';
import { ApiService } from './api.service';
import { map, Observable } from 'rxjs';
import { Firewall } from '../../state/firewalls/firewalls.actions';

export interface FirewallListResponse {
  items: Firewall[];
  currentPage: number;
  totalPages: number;
}

@Injectable({ providedIn: 'root' })
export class FirewallsApi {
  private api = inject(ApiService);

  list(page = 1, perPage = 10, query = ''): Observable<{ items: Firewall[]; currentPage: number; totalPages: number }> {
      return this.api.get<any>('/firewalls', { page, per_page: perPage, q: query }).pipe(
        map(res => ({
          items: res?.items ?? [],
          currentPage: Number(res?.current_page ?? page),
          totalPages: Number(res?.total_pages ?? 1)
        }))
      );
    }

  get(id: number) {
    return this.api.get<Firewall>(`/firewalls/${id}`);
  }

  create(dto: Partial<Firewall>) {
    return this.api.post<Firewall>('/firewalls', dto);
  }

  update(id: number, dto: Partial<Firewall>) {
    return this.api.put<Firewall>(`/firewalls/${id}`, dto);
  }

  remove(id: number) {
    return this.api.delete<void>(`/firewalls/${id}`);
  }
}
