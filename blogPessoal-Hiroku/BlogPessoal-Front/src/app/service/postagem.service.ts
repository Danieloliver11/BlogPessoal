import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../model/Postagem';

@Injectable({
  providedIn: 'root'
})
export class PostagemService {
  url = environment.local + environment.porta

  constructor(
    private htpp: HttpClient
  ) { }

  token={
    headers: new HttpHeaders().set('Authorization',environment.token)
  }

  getAllPostagem():Observable<Postagem[]>{
    return this.htpp.get<Postagem[]>(`https://${this.url}/postagem`,this.token)
  }
  getByIdPostagem(id: number):Observable<Postagem>{
    return this.htpp.get<Postagem>(`https://${this.url}/postagem/${id}`,this.token)
  }
  getByTituloPostagem(titulo:string):Observable<Postagem[]>{
    return this.htpp.get<Postagem[]>(`https://${this.url}/postagem/titulo/${titulo}`, this.token)
  }
  postPostagem(postagem:Postagem):Observable<Postagem>{
    return this.htpp.post<Postagem>(`https://${this.url}/postagem`, postagem,this.token)
  }
  putPostagem(postagem:Postagem):Observable<Postagem>{
    return this.htpp.put<Postagem>(`https://${this.url}/postagem`, postagem , this.token)
  }
  deletePostagem(id:number){
   return this.htpp.delete(`https://${this.url}/postagem/${id}`, this.token)
  }
  

}
