import { Component, OnInit } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { InputGroupModule } from 'primeng/inputgroup'; 
import { ButtonModule } from 'primeng/button'; 
@Component({
  selector: 'app-ask',
  standalone: true,
  imports: [InputTextModule, InputGroupModule, ButtonModule ], // Ensure these modules are imported
  templateUrl: './ask.component.html',
  styleUrls: ['./ask.component.scss']
})
export class AskComponent implements OnInit {
  

 

  ngOnInit() { }

  onSearch() {
   
}
}
