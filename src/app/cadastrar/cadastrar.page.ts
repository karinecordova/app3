import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.page.html',
  styleUrls: ['./cadastrar.page.scss'],
})
export class CadastrarPage implements OnInit {

  data:any = {};
  constructor(public http: HttpClient, public router: Router, public toastController: ToastController) {
    this.data.nome = '';
    this.data.email = '';
    this.data.response = '';
    
    this.http = http;
  }

  ngOnInit() {
  }
  
  cadastrar() {
    var link = 'http://localhost/api-slim/pessoas/';
    var myData = JSON.stringify({nome: this.data.nome, email: this.data.email});
    
    this.http.post(link, myData)
    .subscribe(data => {
    this.data.response = data["_body"]; 
    console.log("Deu boa!");
    this.router.navigateByUrl('/home');
    }, error => {
    console.log("Oooops!");
    });
    }

    async notificacaoCadastro() {
      const toast = await this.toastController.create({
        message: 'Pessoa cadastrada com sucesso! ',
        duration: 2000,
        position: 'middle',
      });
      toast.present();
    }


}
