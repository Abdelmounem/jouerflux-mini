import { Component, inject, computed } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';
import { RolesActions } from '../../../state/roles/roles.actions';
import { selectSelectedRole } from '../../../state/roles/roles.selectors';
import { selectPolitiques } from '../../../state/politiques/politiques.selectors';
import { PolitiquesActions } from '../../../state/politiques/politiques.actions';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-role-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor],
  templateUrl: './role-form.html',
  styleUrls: ['./role-form.scss']
})
export class RoleForm {
  private store = inject(Store);
  private route = inject(ActivatedRoute);

  id = toSignal(this.route.paramMap.pipe(map(pm => {
    const v = pm.get('id'); return v !== null ? Number(v) : null;
  })), { initialValue: null as number | null });

  selected  = toSignal(this.store.select(selectSelectedRole), { initialValue: null });
  policies  = toSignal(this.store.select(selectPolitiques),     { initialValue: [] });

  form = new FormGroup({
    name:      new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.maxLength(50)] }),
    policy_id: new FormControl<number | null>(null, { validators: [Validators.required] })
  });

  isEdit = computed(() => this.id() !== null);

  ngOnInit() {
    // pour remplir le select de policies
    this.store.dispatch(PolitiquesActions.load({ page: 1, pageSize: 10 }));
    if (this.isEdit()) this.store.dispatch(RolesActions.get({ id: this.id()! }));
  }

  ngOnChanges() {
    const r = this.selected();
    if (r) this.form.patchValue({ name: r.name, policy_id: r.policy_id }, { emitEvent: false });
  }

  submit() {
    const raw = this.form.getRawValue();
    const dto = { ...raw, policy_id: raw.policy_id ?? undefined }; 
    const currentId = this.id();

    if (currentId != null) this.store.dispatch(RolesActions.update({ id: currentId, dto }));
    else this.store.dispatch(RolesActions.create({ dto }));
  }
}
