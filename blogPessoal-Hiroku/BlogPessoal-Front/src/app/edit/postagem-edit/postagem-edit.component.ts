import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Postagem } from 'src/app/model/Postagem';
import { Tema } from 'src/app/model/Tema';
import { AlertasService } from 'src/app/service/alertas.service';
import { AuthService } from 'src/app/service/auth.service';
import { PostagemService } from 'src/app/service/postagem.service';
import { TemaService } from 'src/app/service/tema.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-postagem-edit',
  templateUrl: './postagem-edit.component.html',
  styleUrls: ['./postagem-edit.component.css']
})
export class PostagemEditComponent implements OnInit {
  
  idTema: number
  postagem: Postagem = new Postagem()
  tema: Tema = new Tema()
  listsTemas : Tema[]

  numCaracter : number[]
  numCara = 0



  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private postagemService: PostagemService,
    private temaService:TemaService,
    private alerta: AlertasService
  ) { }

  ngOnInit(){
    window.scroll(0,0)
    if(environment.token == ''){
      this.router.navigate(['/entrar'])
      this.alerta.showAlertInfo("Você saiu da sua conta!")
    }
   let id= this.route.snapshot.params['id']
   this.findAllById(id)
   this.findallTema()
  }
  contadorCaracteres(event: any){
    this.numCaracter = event.target.value
    this.numCara = this.numCaracter.length
    if(this.numCara > 255){
      //this.alerta.showAlertDanger("O numero de caracteres é maior que 255")
    }
  }
  // achar o id 
  findAllById(id: number){
    this.postagemService.getByIdPostagem(id).subscribe((resp:Postagem)=>{
      this.postagem = resp
    })
  }
  
  findByIdTema(){
    this.temaService.getByIdTema(this.idTema).subscribe((resp: Tema )=>{
      this.tema = resp
    })
  }
  findallTema(){
    this.temaService.getAllTema().subscribe((reps: Tema[])=>{
      this.listsTemas = reps
    })
  }
 
  atualizar(){
    this.tema.id = this.idTema
    this.postagem.tema = this.tema

    this.postagemService.postPostagem(this.postagem).subscribe((resp: Postagem)=>{
      this.postagem = resp 
      this.alerta.showAlertSuccess('Postagem atualizada com sucesso!')
      this.router.navigate(['/inicio'])
    })
  }

}
