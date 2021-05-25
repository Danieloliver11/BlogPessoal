import { HttpClient } from '@angular/common/http';
import { variable } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { User } from '../model/User';
import { UserLogin } from '../model/UserLogin';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
    ) { } // para rquisicoes HTTP. 
  url = environment.local + environment.porta

  entrar(userLogin: UserLogin): Observable<UserLogin>{
    return this.http.post<UserLogin>(`https://${this.url}/usuarios/logar`, userLogin)
  } 
  cadastrar(user: User): Observable<User>{
    return this.http.post<User>(`https://${this.url}/usuarios/cadastrar`, user)
  }
  getByIdUser(id : number):Observable<User>{
    return this.http.get<User>(`https://${this.url}/usuarios/${id}`)
  }

  logado(){
   let estaLogado: Boolean = false
   if(environment.token != ''){
    estaLogado = true
   }
   return estaLogado
  }
  adm(){
    let estadoAdm: boolean = false
    if(environment.tipo == "adm"){
      estadoAdm = true
    }
    return estadoAdm
  }
}
