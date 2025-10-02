import { Component, EventEmitter, Input, Output, computed, signal } from '@angular/core';

@Component({
selector: 'app-paginator',
standalone: true,
template: `
<div class="pager">
<button (click)="prev()" [disabled]="page()===1">Prev</button>
<span>Page {{page()}} / {{pages()}}</span>
<button (click)="next()" [disabled]="page()===pages()">Next</button>
</div>
`,
styles: [`.pager{display:flex;gap:.75rem;align-items:center}`]
})
export class PaginatorComponent {
@Input() total = 0;
@Input() pageSize = 10;
@Output() pageChange = new EventEmitter<number>();


page = signal(1);
pages = computed(() => Math.max(1, Math.ceil(this.total / this.pageSize)));
next(){ if(this.page()<this.pages()){ this.page.update(p=>p+1); this.pageChange.emit(this.page()); } }
prev(){ if(this.page()>1){ this.page.update(p=>p-1); this.pageChange.emit(this.page()); } }
}