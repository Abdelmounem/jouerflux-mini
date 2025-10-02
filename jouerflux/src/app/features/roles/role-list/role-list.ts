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

import { RolesActions, Role } from '../../../state/roles/roles.actions';
import {
  selectRoles, selectRolesLoading, selectRolesError,
  selectRolesPage, selectRolesPageSize, selectRolesTotal
} from '../../../state/roles/roles.selectors';

@Component({
  selector: 'app-role-list',
  standalone: true,
  imports: [
    CommonModule, RouterLink,
    ReactiveFormsModule, FormsModule,
    MatTableModule, MatPaginatorModule, MatButtonModule, MatDialogModule, MatIconModule,
    MatFormFieldModule, MatInputModule
  ],
  templateUrl: './role-list.html',
  styleUrls: ['./role-list.scss']
})
export class RoleList {
  private store  = inject(Store);
  private fb     = inject(FormBuilder);
  private dialog = inject(MatDialog);

  items   = toSignal(this.store.select(selectRoles),        { initialValue: [] as Role[] });
  loading = toSignal(this.store.select(selectRolesLoading), { initialValue: false });
  error   = toSignal(this.store.select(selectRolesError),   { initialValue: null });

  page     = toSignal(this.store.select(selectRolesPage),     { initialValue: 1 });
  pageSize = toSignal(this.store.select(selectRolesPageSize), { initialValue: 10 });
  total    = toSignal(this.store.select(selectRolesTotal),    { initialValue: 0 });

  search = signal('');
  displayedColumns: Array<'name' | 'policy_id' | 'actions'> = ['name', 'policy_id', 'actions'];

  filtered = computed(() => {
    const q = this.search().toLowerCase();
    return (this.items() ?? []).filter(r => (r.name ?? '').toLowerCase().includes(q));
  });

  ngOnInit() {
    this.store.dispatch(RolesActions.load({ page: this.page(), pageSize: this.pageSize(), query: this.search() }));
  }

  onSearch(v: string) {
    this.search.set(v);
    this.store.dispatch(RolesActions.load({ page: 1, pageSize: this.pageSize(), query: v }));
  }

  onPage(e: PageEvent) {
    this.store.dispatch(RolesActions.load({ page: e.pageIndex + 1, pageSize: e.pageSize, query: this.search() }));
  }

  askDelete(r: Role) {
    const name = r?.name?.trim() || `#${r?.id}`;
    this.dialog.open(ConfirmDialogComponent, {
      width: '380px',
      data: { title: 'Supprimer', message: `Supprimer le rôle « ${name} » ?`, confirmLabel: 'Supprimer', cancelLabel: 'Annuler', warn: true }
    }).afterClosed().subscribe(ok => {
      if (!ok) return;
      this.store.dispatch(RolesActions.remove({ id: r.id }));
      this.store.dispatch(RolesActions.load({ page: this.page(), pageSize: this.pageSize(), query: this.search() }));
    });
  }

  @ViewChild('createTpl') createTpl!: TemplateRef<any>;
  private createRef?: MatDialogRef<any>;

  createForm = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    policy_id: [null as number | null, [Validators.required]]
  });

  openCreate() {
    this.createForm.reset({ name: '', policy_id: null });
    this.createRef = this.dialog.open(this.createTpl, { width: '520px', disableClose: true });
  }

  submitCreate() {
    if (this.createForm.invalid) return;
    const raw = this.createForm.getRawValue();
    const dto: Partial<Role> & { policy_id?: number } = {
      name: raw.name?.trim()
    };
    if (raw.policy_id != null) dto.policy_id = Number(raw.policy_id);

    this.store.dispatch(RolesActions.create({ dto }));
    this.createRef?.close(true);
    this.store.dispatch(RolesActions.load({ page: this.page(), pageSize: this.pageSize(), query: this.search() }));
  }

  @ViewChild('editTpl') editTpl!: TemplateRef<any>;
  private editRef?: MatDialogRef<any>;

  editId = signal<number | null>(null);
  editName = signal<string>('');

  editForm = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    policy_id: [null as number | null, [Validators.required]]
  });

  openEdit(r: Role) {
    this.editId.set(r.id);
    this.editName.set(r.name ?? '');
    this.editForm.reset({
      name: r.name ?? '',
      policy_id: r.policy_id ?? null
    });
    this.editRef = this.dialog.open(this.editTpl, { width: '520px', disableClose: true });
  }

  submitEdit() {
    if (this.editForm.invalid || this.editId() == null) return;
    const raw = this.editForm.getRawValue();
    const id  = this.editId()!;
    const dto: Partial<Role> & { policy_id?: number } = {
      name: raw.name?.trim()
    };
    if (raw.policy_id != null) dto.policy_id = Number(raw.policy_id);

    this.store.dispatch(RolesActions.update({ id, dto }));
    this.editRef?.close(true);
    this.store.dispatch(RolesActions.load({ page: this.page(), pageSize: this.pageSize(), query: this.search() }));
  }
}
