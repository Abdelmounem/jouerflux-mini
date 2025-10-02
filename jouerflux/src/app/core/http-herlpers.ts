import { HttpParams } from '@angular/common/http';


export function buildParams(query: Record<string, string | number | boolean | undefined>) {
let params = new HttpParams();
Object.entries(query).forEach(([k, v]) => {
if (v !== undefined && v !== null && v !== '') params = params.set(k, String(v));
});
return params;
}