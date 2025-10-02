import { Component, inject, signal, computed, effect } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';              
import { PolitiquesActions } from '../../../state/politiques/politiques.actions';
import { selectSelectedPolitique } from '../../../state/politiques/politiques.selectors';
import { selectFirewalls } from '../../../state/firewalls/firewalls.selectors';
import { FirewallsActions } from '../../../state/firewalls/firewalls.actions';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-politique-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor],
  templateUrl: './politique-form.html',
  styleUrls: ['./politique-form.scss']
})
export class PolitiqueForm {
  private store = inject(Store);
  private route = inject(ActivatedRoute);

  id = toSignal(
    this.route.paramMap.pipe(
      map(pm => {
        const v = pm.get('id');
        return v !== null ? Number(v) : null;
      })
    ),
    { initialValue: null as number | null }
  );

  selected  = toSignal(this.store.select(selectSelectedPolitique), { initialValue: null });
  firewalls = toSignal(this.store.select(selectFirewalls),      { initialValue: [] });

  form = new FormGroup({
    name:        new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.maxLength(50)] }),
    firewall_id: new FormControl<number | null>(null, { validators: [Validators.required] })
  });

  isEdit = computed(() => this.id() !== null);

  ngOnInit() {
    this.store.dispatch(FirewallsActions.load({}));

    const currentId = this.id();                        
    if (currentId != null) {
      this.store.dispatch(PolitiquesActions.get({ id: currentId }));  
    }

    effect(() => {
      const p = this.selected();
      if (p) {
        this.form.patchValue({ name: p.name, firewall_id: p.firewall_id }, { emitEvent: false });
      }
    });
  }

  submit() {
   const raw = this.form.getRawValue();

  const dto = {
    ...raw,
    firewall_id: raw.firewall_id ?? undefined
  };

  const currentId = this.id();

  if (currentId != null) {
    this.store.dispatch(PolitiquesActions.update({ id: currentId, dto }));
  } else {
    this.store.dispatch(PolitiquesActions.create({ dto }));
  }
  }
}
