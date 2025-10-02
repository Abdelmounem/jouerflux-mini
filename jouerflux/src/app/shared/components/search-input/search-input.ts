import { Component, EventEmitter, Input, Output, signal } from '@angular/core';


@Component({
selector: 'app-search-input',
standalone: true,
template: `
<input
[placeholder]="placeholder"
[value]="query()"
(input)="onInput($event)"
class="search" aria-label="Rechercher" />
`,
styles: [`.search{width:100%;max-width:420px;padding:.5rem;border:1px solid #cbd5e1;border-radius:.5rem}`]
})
export class SearchInputComponent {
@Input() placeholder = 'Search...';
@Output() search = new EventEmitter<string>();
query = signal('');
onInput(e: Event) {
const v = (e.target as HTMLInputElement).value;
this.query.set(v);
this.search.emit(v);
}
}