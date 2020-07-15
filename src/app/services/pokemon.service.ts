import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
 
@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  
  baseUrl = 'https://brasil.io/api/dataset/covid19/caso';
  imageUrl = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';
 
  constructor(private http: HttpClient) {}
 
  getPokemon(offset = 0) {
    /*
    this.http
    .get(`${this.baseUrl}/data/`) .subscribe(
      result => {
        console.log ( result['results'] );
      });
    */
   offset++;
    
    return this.http
      .get(`${this.baseUrl}/data?page=${offset}`)
      //.get(`${this.baseUrl}/data?page=${offset}&state=RJ`)
      .pipe(
        map(result => {
          return result['results'];
        }),
        map(pokemon => {
          return pokemon.map((poke, index) => {
            //poke.image = this.getPokeImage(offset + index + 1);
            poke.pokeIndex = offset + index + 1;
            return poke;
          });
        })
      );
  }
 
  findPokemon(search) {
    return this.http.get(`${this.baseUrl}/data`)
    .pipe(
      map(result => {
        return result['results'];
      }),
      map(pokemon => {
        return pokemon.map((poke, index) => {
          //poke.image = this.getPokeImage(offset + index + 1);
          //poke.pokeIndex = offset + index + 1;
          if ( search = poke.city)
          return poke;
        });
      })
    );
  }
 
  getPokeImage(index) {
    return `${this.imageUrl}${index}.png`;
  }
 
  getPokeDetails(index) {
    return this.http.get(`${this.baseUrl}/pokemon/${index}`).pipe(
      map(poke => {
        let sprites = Object.keys(poke['sprites']);
        poke['images'] = sprites
          .map(spriteKey => poke['sprites'][spriteKey])
          .filter(img => img);
        return poke;
      })
    );
  }
}