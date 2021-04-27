import {Component, HostListener, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'buenos dias';
  vocabulario = ['A', 'W','S','D','a','w','s','d'];
  hour = -700;
  estadoInicio = 0;
  estadoFinal = [0];
  estadoActual = this.estadoInicio;
  heightA = "50px";
  heightB = 50;
  estatus = false;
  vuelo = "-700px";
  contador = 0;
  progreso = 0;
  teclaPresionada = "N/A";
  width = -370;
  wCtrl = "-370px";  // MAX Horizontal 950px
  band = false;
  band2 = false;
  band3 = false;
  color = "#85cadd";
  cicle = false;
  confirm = false;

  constructor() {
  }


  ngOnInit(): void {
  }

  @HostListener('document:keydown', ['$event'])
  keypress(e: KeyboardEvent) {
    if(e.key == this.vocabulario[3] || e.key == this.vocabulario[7] ){
      this.teclaD();
    }

    if(e.key == this.vocabulario[0]  || e.key == this.vocabulario[4] ){
      this.teclaA();
    }

    if(e.key == this.vocabulario[1]  || e.key == this.vocabulario[5] ){
      this.teclaW();
    }

    if(e.key == this.vocabulario[2]  || e.key == this.vocabulario[6] ){
      this.teclaS();
    }

    this.teclaPresionada = e.key;
  }

  teclaD() {
    this.estadoActual = 0;
    this.hour += 30;
    this.vuelo = this.hour + 'px';
    if (this.hour >= 1350){
      this.hour = -700;
      this.vuelo = "-700px";
      this.contador = 0;
      this.progreso = 0;
    }
    this.evalEstado();

    this.countable();
  }

  teclaA(){
    this.hour -= 30;
    this.vuelo = this.hour + 'px';
    if (this.hour <= -700){
      this.hour = -700;
      this.vuelo = "-700px";
      this.contador = 0;
      this.progreso = 0;
    }
    this.countableLow();
  }

  teclaW(){
    this.heightB -= 5;
    if(this.heightB >= -90){
      this.heightA = this.heightB + 'px';
    }
  }

  teclaS(){
    this.heightB += 5;
    if(this.heightB <= 190){
      this.heightA = this.heightB + 'px';
    }
  }

  countableLow(){
    this.contador++;
    if (this.hour >= 4.4*this.contador){
      this.progreso -= 3.3;
    }
  }

  countable(){
    this.contador++;
    if (this.hour >= 4.4*this.contador){
      this.progreso += 3.3;
    }
  }

  estadoAmanecer(){
    if(this.width > 104){
      this.estadoActual = 1;
    } else {
      this.width += 9.13;
      this.wCtrl = this.width + 'px';
    }
  }

  estadoDia(){
   if(this.estadoActual == 1){
     if(this.width > 104 && this.width < 497){
       this.width += 9.13;
       this.wCtrl = this.width + 'px';
     } else {
       this.estadoActual = 2;
     }
   }
  }

  estadoAtardecer(){
    if (this.estadoActual == 2){
      if(this.width > 497 && this.width < 1000){
        this.width += 9.13;
        this.wCtrl = this.width + 'px';
      }
    }
    if(this.width > 1000){
      this.estadoActual = 3;
      this.wCtrl = "-370px";  // MAX Horizontal 950px
      this.width = -370;
      this.band = true;
    }
  }

  estadoAnochecer(){
    if(this.width > 104){
      this.band = false;
      this.band2 = true;
      this.estadoActual = 4;
    } else {
      this.estatus = true;
      this.color = '#000';
      this.width += 9.13;
      this.wCtrl = this.width + 'px';
    }
  }

  estadoMadrugada(){
      if(this.width > 104 && this.width < 497){
        this.width += 9.13;
        this.wCtrl = this.width + 'px';
      } else {
        this.band2 = false;
        this.band3 = true;
      }
  }

  estadoFinNoche(){
    if(this.width > 497 && this.width < 1000){
      this.width += 9.13;
      this.wCtrl = this.width + 'px';
    }

    if(this.width > 1000){
      this.estadoActual = 3;
      this.wCtrl = "-370px";  // MAX Horizontal 950px
      this.width = -370;
      this.band3 = false;
      this.estatus = false;
      this.estadoActual = 1;
      this.color = "#85cadd";
      this.cicle = true;
      setTimeout(()=>{
        this.cicle = false;
      }, 3000);
    }
  }
  confirmar(){
    this.confirm = true;
  }

  evalEstado(){
    if(this.estadoActual === 0 && !this.band && !this.band2 && !this.band3){
      this.title = 'buenos dias';
      this.estadoAmanecer();
    }

    if(this.estadoActual === 1 && !this.band && !this.band2 && !this.band3){
      this.estadoDia();
    }

    if(this.estadoActual === 2 && !this.band && !this.band2 && !this.band3){
      this.title = 'buenas tardes';
      this.color = "#FFDF99";
      this.estadoAtardecer();
    }

    if(this.band){
      this.title = 'buenas noches';
      this.estadoAnochecer();
    }

    if(this.band2){
      this.title = 'buenas madrugadas';
      this.color = '#3D487A';
      this.estadoMadrugada();
    }

    if(this.band3){
      this.title = 'buen fin de noche';
      this.estadoFinNoche();
      this.estadoActual = 0;

      if(this.estadoActual == 0){
        this.title = 'concluido el ciclo';
        setTimeout(()=>{
          this.cicle = false;
        }, 3000);
      };
    }


  }

}
