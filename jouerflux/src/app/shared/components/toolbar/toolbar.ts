import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';


@Component({
selector: 'app-toolbar',
standalone: true,
imports: [RouterLink],
template: `
<header class="toolbar">
<nav>
<a routerLink="/">JouerFlux</a>
<a routerLink="/firewalls">Firewalls</a>
<a routerLink="/policies">Policies</a>
<a routerLink="/rules">Rules</a>
</nav>
</header>
`,
styles: [`
.toolbar{position:sticky;top:0;display:flex;align-items:center;gap:1rem;padding:.75rem 1rem;background:#0f172a;color:#fff}
nav a{color:#fff;text-decoration:none;margin-right:1rem}
nav a:hover{text-decoration:underline}
`]
})
export class ToolbarComponent {
dark = signal(false);
}