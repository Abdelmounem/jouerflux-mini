import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';
import { FirewallsActions } from '../../../state/firewalls/firewalls.actions';
import { selectSelectedFirewall, selectFwLoading, selectFwError } from '../../../state/firewalls/firewalls.selectors';

@Component({
  selector: 'app-firewall-detail',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './firewall-detail.html',
  styleUrls: ['./firewall-detail.scss']
})
export class FirewallDetailComponent {
  private store = inject(Store);
  private route = inject(ActivatedRoute);

  fw = toSignal(this.store.select(selectSelectedFirewall), { initialValue: null });
  loading = toSignal(this.store.select(selectFwLoading), { initialValue: false });
  error = toSignal(this.store.select(selectFwError), { initialValue: null });

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!isNaN(id)) this.store.dispatch(FirewallsActions.get({ id }));
  }
}
