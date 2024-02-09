import { Injectable } from '@angular/core';
import { SessionsService } from './session/sessions.service';
import { Permission } from '../constants/app.permission.enum';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {
  allowedPermisstion:any[];
  userPermission = [Permission.View_User];
  rolePermission = [Permission.Create_Role,Permission.Edit_Role,Permission.Delete_Role];
  examinerPermission = [Permission.Add_Examinner_Status,Permission.Edit_Examinner_Status,Permission.Delete_Examinner_Status];
  teamsPermission = [Permission.Create_Team,Permission.Edit_Team,Permission.Delete_Team,];
  aaaPermission = [Permission.View_Unassigned_cases];
  reportUser = Permission.View_User_Report;
  reportTeam = Permission.View_Teams_Report;
  adminRoutes: any = {
    userRole: '/admin-settings/user-role',
    role: '/admin-settings/roles',
    examinerStatus: '/admin-settings/examiner-status',
    teams: '/admin-settings/teams'
  }
  

  constructor(
    public localStorage:SessionsService,
  ) { 
    this.allowedPermisstion = this.localStorage.permisstions() || [];
  }

  getAdminUserPermission() {
    if(this.allowedPermisstion.some(item => {
      return this.userPermission.includes(item.actionID)
    })){
        return this.adminRoutes.userRole;
    }else if(this.allowedPermisstion.some(item => {
      return  this.teamsPermission.includes(item.actionID)
    })){
        return this.adminRoutes.teams;
    }else if(this.allowedPermisstion.some(item => {
      return this.rolePermission.includes(item.actionID)
    })){
        return this.adminRoutes.role;
    }else if(this.allowedPermisstion.some(item => {
      return  this.examinerPermission.includes(item.actionID)
    })){
        return this.adminRoutes.examinerStatus;
    }
  }

  checkPermission(value){
    return this.allowedPermisstion.some(item => item.actionID === value);
  }

}
