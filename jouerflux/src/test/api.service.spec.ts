import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ApiService } from '../app/core/services/api.service';
import { environment } from '../app/environments/environment';


describe('ApiService', () => {
let api: ApiService;
let http: HttpTestingController;


beforeEach(() => {
TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
api = TestBed.inject(ApiService);
http = TestBed.inject(HttpTestingController);
});


it('GET should prepend base url', () => {
api.get('/firewalls').subscribe();
const req = http.expectOne(environment.apiUrl + '/firewalls');
expect(req.request.method).toBe('GET');
});
});