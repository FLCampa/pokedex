import { Component, OnInit } from '@angular/core';
import { PokeApiService } from 'src/app/service/poke-api.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  public setAllPokemons: any;
  public getAllPokemons: any;
  public apiError: boolean = false;

  constructor(private pokeApiService: PokeApiService) {}

  ngOnInit(): void {
    // como é get n precisa chamar como funcao
    this.pokeApiService.apiListAllPokemons.subscribe(
      (res) => {
        this.setAllPokemons = res.results;
        this.getAllPokemons = this.setAllPokemons;
      },
      (error) => {
        this.apiError = true;
      }
    );
  }

  public getSearch(value: string) {
    const filter = this.setAllPokemons.filter((res: any) => {
      return !res.name.indexOf(value.toLowerCase());
    });

    this.getAllPokemons = filter;
  }
}
