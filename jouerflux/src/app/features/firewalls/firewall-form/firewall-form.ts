import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { FirewallsActions } from '../../../state/firewalls/firewalls.actions';

@Component({
  selector: 'app-firewall-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './firewall-form.html',
  styleUrls: ['./firewall-form.scss']
})
export class FirewallFormComponent {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private store = inject(Store);

  isEdit = signal(false);
  id = signal<number | null>(null);

  form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    vendor: ['']
  });

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.isEdit.set(true);
      this.id.set(Number(idParam));
    }
  }

  submit() {
    const dto = this.form.getRawValue();
    if (this.isEdit() && this.id() != null) {
      this.store.dispatch(FirewallsActions.update({ id: this.id()!, dto }));
    } else {
      this.store.dispatch(FirewallsActions.create({ dto }));
    }
    this.router.navigate(['/firewalls']);
  }
}
