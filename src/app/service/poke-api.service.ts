import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PokeApiService {
  private url: string = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=100';

  constructor(private http: HttpClient) {}

  get apiListAllPokemons(): Observable<any> {
    return this.http.get<any>(this.url).pipe(
      tap((res) => res), // retorna objeto
      tap((res) => {
        // usa o objeto para filtrar
        res.results.map((resPokemons: any) => {
          this.apiGetPokemon(resPokemons.url).subscribe(
            // cria objeto status com a resposta do get anterior
            (res) => (resPokemons.status = res)
          );
        });
      })
    );
  }

  public apiGetPokemon(url: string): Observable<any> {
    return this.http.get<any>(url).pipe(map((res) => res));
  }
}
