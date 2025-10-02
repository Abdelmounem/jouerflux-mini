import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ToolbarComponent } from '../../shared/components/toolbar/toolbar';


@Component({
selector: 'app-root',
standalone: true,
imports: [RouterLink, ToolbarComponent],
template: `

<main class="container">
<h1>JouerFlux UI</h1>
<p>Gérez vos firewalls, policies, et rules.</p>
<nav class="cards" style="padding-top:5em">
<a class="card" routerLink="/firewalls">Firewalls</a>
<a class="card" routerLink="/policies">Policies</a>
<a class="card" routerLink="/rules">Rules</a>
</nav>
</main>
`,
styles: [`.container{max-width:1000px;margin:1rem auto;padding:0 1rem}.cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:1rem}.card{display:block;border:1px solid #e2e8f0;border-radius:.75rem;padding:1rem;text-decoration:none}`]
})
export class HomeComponent {}