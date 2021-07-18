import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-find-agents',
  templateUrl: './find-agents.page.html',
  styleUrls: ['./find-agents.page.scss'],
})
export class FindAgentsPage implements OnInit {
  agentsList: String[];
  agent: any;
  agen_prop_id = new BehaviorSubject('');
  showData: boolean = false;
  
  constructor(private userService: UserService) {
    this.getAllAgents();
  }
  getAllAgents() {
    this.userService.getAgents().subscribe(async (data: any) => {

      this.agentsList = data['agents'];
      console.log(this.agentsList);
      this.showData = true;
      this.agentsList.map(agent => {
        console.log(agent)
      });
    })
 
  }  
  ngOnInit() {
  }

}
