import { Component, TemplateRef, ViewChild, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { FirewallsActions } from '../../../state/firewalls/firewalls.actions';
import {
  selectFirewalls, selectFwLoading, selectFwError,
  selectFwPage, selectFwPageSize, selectFwTotal
} from '../../../state/firewalls/firewalls.selectors';
import { Firewall } from '../../../core/models/firewall.model';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog';

@Component({
  selector: 'app-firewall-list',
  standalone: true,
  imports: [
    CommonModule, RouterLink,
    ReactiveFormsModule, FormsModule,
    MatTableModule, MatPaginatorModule, MatDialogModule, MatButtonModule, MatIconModule,
    MatFormFieldModule, MatInputModule
  ],
  templateUrl: './firewall-list.html',
  styleUrls: ['./firewall-list.scss']
})
export class FirewallListComponent {
  private store  = inject(Store);
  private dialog = inject(MatDialog);
  private fb     = inject(FormBuilder);

  // --- State NGRX
  items   = toSignal(this.store.select(selectFirewalls), { initialValue: [] as Firewall[] });
  loading = toSignal(this.store.select(selectFwLoading), { initialValue: false });
  error   = toSignal(this.store.select(selectFwError),   { initialValue: null });

  page     = toSignal(this.store.select(selectFwPage),     { initialValue: 1 });
  pageSize = toSignal(this.store.select(selectFwPageSize), { initialValue: 10 });
  total    = toSignal(this.store.select(selectFwTotal),    { initialValue: 0 });

  search = signal('');
  localPage     = signal(1);
  localPageSize = signal(10);

  filtered = computed(() => {
    const q = this.search().trim().toLowerCase();
    const list = this.items() ?? [];
    if (!q) return list;
    return list.filter(i => (i.name ?? '').toLowerCase().includes(q));
  });

  paged = computed(() => {
    if (!this.search().trim()) return this.items() ?? [];
    const start = (this.localPage() - 1) * this.localPageSize();
    return this.filtered().slice(start, start + this.localPageSize());
  });

  displayedColumns: Array<'name' | 'actions'> = ['name', 'actions'];

  ngOnInit() {
    this.store.dispatch(FirewallsActions.load({
      page: this.page(),
      pageSize: this.pageSize()
    }));
  }

  onSearch(value: string) {
    this.search.set(value);
    this.localPage.set(1);
    if (!value.trim()) {
      this.store.dispatch(FirewallsActions.load({ page: 1, pageSize: this.pageSize() }));
    }
  }

  onPage(e: PageEvent) {
    if (this.search().trim()) {
      this.localPage.set(e.pageIndex + 1);
      this.localPageSize.set(e.pageSize);
    } else {
      this.store.dispatch(FirewallsActions.load({ page: e.pageIndex + 1, pageSize: e.pageSize }));
    }
  }

  @ViewChild('createTpl') createTpl!: TemplateRef<any>;
  private createRef?: MatDialogRef<any>;

  createForm = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
  });

  openCreate() {
    this.createForm.reset({ name: '' });
    this.createRef = this.dialog.open(this.createTpl, { width: '480px', disableClose: true });
  }

  submitCreate() {
    if (this.createForm.invalid) return;
    const dto = this.createForm.getRawValue();
    this.store.dispatch(FirewallsActions.create({ dto }));
    this.createRef?.close(true);
    this.store.dispatch(FirewallsActions.load({ page: this.page(), pageSize: this.pageSize() }));
  }

  askDelete(fw: Firewall) {
    const name = fw?.name?.trim() || `#${fw?.id}`;
    this.dialog.open(ConfirmDialogComponent, {
      width: '380px',
      data: { title: 'Supprimer', message: `Confirmer la suppression du firewall « ${name} » ?`, confirmLabel: 'Supprimer', cancelLabel: 'Annuler', warn: true }
    }).afterClosed().subscribe(ok => {
      if (!ok) return;
      this.store.dispatch(FirewallsActions.remove({ id: fw.id }));
      this.store.dispatch(FirewallsActions.load({ page: this.page(), pageSize: this.pageSize() }));
    });
  }

  @ViewChild('editTpl') editTpl!: TemplateRef<any>;
  private editRef?: MatDialogRef<any>;

  editId = signal<number | null>(null);
  editName = signal<string>('');

  editForm = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
  });

  openEdit(fw: Firewall) {
    this.editId.set(fw.id);
    this.editName.set(fw.name ?? '');
    this.editForm.reset({ name: fw.name ?? '' });
    this.editRef = this.dialog.open(this.editTpl, { width: '480px', disableClose: true });
  }

  submitEdit() {
    if (this.editForm.invalid || this.editId() == null) return;
    const id  = this.editId()!;
    const dto = this.editForm.getRawValue();
    this.store.dispatch(FirewallsActions.update({ id, dto }));
    this.editRef?.close(true);
    this.store.dispatch(FirewallsActions.load({ page: this.page(), pageSize: this.pageSize() }));
  }
}
