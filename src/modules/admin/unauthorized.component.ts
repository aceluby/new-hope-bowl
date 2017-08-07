import {Component} from '@angular/core';

@Component({
             selector: 'unauthorized-component',
             template: `
<div>
  <h1>Unauthorized</h1> 
  <p>Your google account is not authorized for this function.</p>
  <p>This unauthorzed attempt will be reported.</p>
</div>
`
           })

export class UnauthorizedComponent {

}

