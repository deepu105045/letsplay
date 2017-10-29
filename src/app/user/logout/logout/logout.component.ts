import { Component, OnInit } from '@angular/core';
import { trigger,state,style,transition,animate,keyframes,group} from '@angular/animations';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css'],
  animations:[
    trigger('lightsOnOff',[
      state('off',style({
        backgroundColor:'black'
      })),
      state('on',style({
        backgroundColor:'white'
      })),
      transition('off=>on',[animate('2s')]),
      transition('on=>off',[animate('2s')])
    ])
  ]
})
export class LogoutComponent implements OnInit {
  roomState:string='off';
  constructor() { }

  ngOnInit() {
  }

  toggle(){
    this.roomState=(this.roomState === "off")? "on":"off"
  }

}
