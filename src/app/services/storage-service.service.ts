import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageServiceService {

  constructor(private storage:Storage) { 
    
  }
  async setString(key:string,value:any){
    await this.storage.set(key,value);
  }
  async getString(key:string){
    return (await this.storage.get(key));
  }
  async clear(){
    await this.storage.clear()
  }
}
