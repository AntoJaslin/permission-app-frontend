import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'username_label'
})
export class UsernamePipe implements PipeTransform {

  transform(userData:any): string {
    let name = '';
    if(userData.userName){
      const names = userData.userName.split(' ');
      if(names.length >= 2){
        name = names[0].slice(0,1) + names[1].slice(0,1);
      }else{
        name = userData.userName.slice(0,2);
      }
    }else{
      name = userData.email.slice(0,2);
    }
    return name.toUpperCase();
  }

}
