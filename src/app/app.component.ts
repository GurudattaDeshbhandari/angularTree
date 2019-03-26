import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  mainObject : any;
  _jsonurl = 'http://www.mocky.io/v2/5c3c7ad13100007400a1a401';

  constructor(private http:HttpClient ){

    this.getJSON().subscribe(data =>{
      this.responseData(data);
    })
  }

  public getJSON() : Observable <any>{
    return this.http.get(this._jsonurl);
  }

  responseData(data){
    this.mainObject = this.getTreeStructure(data.nodes,0);
    console.log(this.mainObject);
  }

  getTreeStructure(arr,parent){
    var Obj =[];
    for(var i in arr){
      if(arr[i].parent == parent){
        var children = this.getTreeStructure(arr,arr[i].id);

        if(children){
          arr[i]['children'] = children;
        }

        Obj.push(arr[i]);
      }
    }

    return Obj;
  }

}
