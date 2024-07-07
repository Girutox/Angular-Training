import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  serverElements = [];

  onServerCreated(serverElement: {serverName: string, serverContent: string}) {    
    this.serverElements.push({
      type: 'server',
      name: serverElement.serverName,
      content: serverElement.serverContent
    });
  }

  onBlueprintCreated(blueprintElement: {serverName: string, serverContent: string}) {
    this.serverElements.push({
      type: 'blueprint',
      name: blueprintElement.serverName,
      content: blueprintElement.serverContent
    });
  }

  onChangeFirst() {    
    this.serverElements[0].name = 'Changed!';
  }

  onRemoveFirst() {
    this.serverElements.splice(0, 1);
  }
}
