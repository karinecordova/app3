import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.page.html',
  styleUrls: ['./listar.page.scss'],
})
export class ListarPage implements OnInit {

  data:any = {};
  constructor(public http: HttpClient, public router: Router, public toastController: ToastController) { }

  ngOnInit() {
    this.get();
  }
  result : any;
  pessoas:any;

  get(){
      //chama a tela de aguarde
      this.obterPessoa()
      .then((response)=>{
        this.result = JSON.stringify(response);
        this.result= response;
        console.log(this.result);
        //fecha tela de aguarde
      })
      .catch((response)=>{
        this.result = JSON.stringify(response);
        //fecha tela de aguarde
      });
  }
  obterPessoa(){
    let url='http://localhost/api-slim/pessoas';   
    return this.http.get(url).toPromise();  
    }

    apagarpessoa(id:number) {
      var link = 'http://localhost/api-slim/pessoal_delete.php';
      var myData = JSON.stringify({
        id: id,     });
      
      this.http.post(link, myData)
      .subscribe(data => {
      this.data.response = data["_body"];    
       console.log("Deu boa!");
       this.router.navigateByUrl('/home');
       this.notificacaoExclusao();
      }, error => {
      console.log("Oooops!");
      });
      } 
      
      async notificacaoExclusao() {
        const toast = await this.toastController.create({
          message: 'Pessoa excluída com sucesso! ',
          duration: 2000,
          position: 'middle',
        });
        toast.present();
      }


}
