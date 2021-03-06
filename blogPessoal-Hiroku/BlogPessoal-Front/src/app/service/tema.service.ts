import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Tema } from '../model/Tema';

@Injectable({
  providedIn: 'root'
})
export class TemaService {
  url = environment.local + environment.porta


  constructor( private http: HttpClient) { }
// um objeto token 
token={
  headers: new HttpHeaders().set('Authorization',environment.token)
}
getAllTema():Observable<Tema[]>{
  return this.http.get<Tema[]>(`https://${this.url}/tema`,this.token)
}
getByIdTema(id:number):Observable<Tema>{
  return this.http.get<Tema>(`https://${this.url}/tema/${id}`, this.token)
}
getByNomeTema(descricao:string):Observable<Tema[]>{
  return this.http.get<Tema[]>(`https://${this.url}/tema/nome/${descricao}`, this.token)
}
postTema(tema:Tema):Observable<Tema>{
  return this.http.post<Tema>(`https://${this.url}/tema`, tema, this.token)
}

putTema(tema:Tema):Observable<Tema>{
  return this.http.put<Tema>(`https://${this.url}/tema`, tema, this.token)
}

deleteTema(id:number){
  return this.http.delete(`https://${this.url}/tema/${id}`, this.token)

}









}
