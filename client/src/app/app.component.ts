import { HttpClient } from '@angular/common/http';
import { Component ,OnInit} from '@angular/core';
import { IProduct } from './shared/models/product';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
 
  title = 'Welcome to my shop!';
  constructor(private http: HttpClient){

  }
  ngOnInit(): void {
      
  }
}
