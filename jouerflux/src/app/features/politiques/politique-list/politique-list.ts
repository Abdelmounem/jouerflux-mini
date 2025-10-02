import { Component, TemplateRef, ViewChild, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';

import { ReactiveFormsModule, FormBuilder, Validators, FormsModule } from '@angular/forms';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog';

import { PolitiquesActions } from '../../../state/politiques/politiques.actions';
import {
  selectPolitiques,
  selectPolitiquesLoading,
  selectPolitiquesError,
  selectPolitiquesPage,
  selectPolitiquesPageSize,
  selectPolitiquesTotal
} from '../../../state/politiques/politiques.selectors';

export interface Politique {
  id: number;
  name: string;
  firewall_id: number;
}

@Component({
  selector: 'app-politique-list',
  standalone: true,
  imports: [
    CommonModule, RouterLink,
    ReactiveFormsModule, FormsModule,
    MatTableModule, MatPaginatorModule, MatButtonModule, MatDialogModule, MatIconModule,
    MatFormFieldModule, MatInputModule
  ],
  templateUrl: './politique-list.html',
  styleUrls: ['./politique-list.scss']
})
export class PolitiqueList {
  private store  = inject(Store);
  private fb     = inject(FormBuilder);
  private dialog = inject(MatDialog);

  // --- Données depuis NgRx
  items   = toSignal(this.store.select(selectPolitiques),        { initialValue: [] as Politique[] });
  loading = toSignal(this.store.select(selectPolitiquesLoading), { initialValue: false });
  error   = toSignal(this.store.select(selectPolitiquesError),   { initialValue: null });

  page     = toSignal(this.store.select(selectPolitiquesPage),     { initialValue: 1 });
  pageSize = toSignal(this.store.select(selectPolitiquesPageSize), { initialValue: 10 });
  total    = toSignal(this.store.select(selectPolitiquesTotal),    { initialValue: 0 });

  search = signal('');

  displayedColumns: Array<'name' | 'firewall_id' | 'actions'> = ['name', 'firewall_id', 'actions'];

  filtered = computed(() => {
    const q = this.search().toLowerCase();
    return (this.items() ?? []).filter(p => (p.name ?? '').toLowerCase().includes(q));
  });

  ngOnInit() {
    this.store.dispatch(PolitiquesActions.load({
      page: this.page(),
      pageSize: this.pageSize(),
      query: this.search()
    }));
  }

  onSearch(value: string) {
    this.search.set(value);
    this.store.dispatch(PolitiquesActions.load({ page: 1, pageSize: this.pageSize(), query: value }));
  }

  onPage(e: PageEvent) {
    this.store.dispatch(PolitiquesActions.load({
      page: e.pageIndex + 1,
      pageSize: e.pageSize,
      query: this.search()
    }));
  }

  askDelete(p: Politique) {
    const name = p?.name?.trim() || `#${p?.id}`;
    this.dialog.open(ConfirmDialogComponent, {
      width: '380px',
      data: {
        title: 'Supprimer',
        message: `Confirmer la suppression de la policy « ${name} » ?`,
        confirmLabel: 'Supprimer',
        cancelLabel: 'Annuler',
        warn: true
      }
    }).afterClosed().subscribe(ok => {
      if (!ok) return;
      this.store.dispatch(PolitiquesActions.remove({ id: p.id }));
      this.store.dispatch(PolitiquesActions.load({
        page: this.page(), pageSize: this.pageSize(), query: this.search()
      }));
    });
  }

  @ViewChild('createTpl') createTpl!: TemplateRef<any>;
  private createRef?: MatDialogRef<any>;

  createForm = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    firewall_id: [null as number | null, [Validators.required]]
  });

  openCreate() {
    this.createForm.reset({ name: '', firewall_id: null });
    this.createRef = this.dialog.open(this.createTpl, { width: '520px', disableClose: true });
  }

 submitCreate() {
  if (this.createForm.invalid) return;

  const raw = this.createForm.getRawValue() as { name: string; firewall_id: number | null };

  const dto: Partial<Politique> & { firewall_id?: number } = {
    name: raw.name?.trim()
  };
  if (raw.firewall_id != null) {
    dto.firewall_id = Number(raw.firewall_id);
  }

  this.store.dispatch(PolitiquesActions.create({ dto }));
  this.createRef?.close(true);

  this.store.dispatch(PolitiquesActions.load({
    page: this.page(),
    pageSize: this.pageSize(),
    query: this.search()
  }));
}

  @ViewChild('editTpl') editTpl!: TemplateRef<any>;
  private editRef?: MatDialogRef<any>;

  editId = signal<number | null>(null);
  editName = signal<string>('');

  editForm = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    firewall_id: [null as number | null, [Validators.required]]
  });

  openEdit(p: Politique) {
    this.editId.set(p.id);
    this.editName.set(p.name ?? '');
    this.editForm.reset({
      name: p.name ?? '',
      firewall_id: (p as any).firewall_id ?? (p as any).policy_id ?? null
    });
    this.editRef = this.dialog.open(this.editTpl, { width: '520px', disableClose: true });
  }

 submitEdit() {
  if (this.editForm.invalid || this.editId() == null) return;

  const raw = this.editForm.getRawValue();
  const id  = this.editId()!;

  const dto: Partial<Politique> = {
    name: raw.name?.trim(),
    firewall_id: raw.firewall_id != null ? Number(raw.firewall_id) : undefined
  };

  this.store.dispatch(PolitiquesActions.update({ id, dto }));
  this.editRef?.close(true);

  this.store.dispatch(PolitiquesActions.load({
    page: this.page(),
    pageSize: this.pageSize(),
    query: this.search()
  }));
}

}
