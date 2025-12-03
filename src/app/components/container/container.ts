import { Component } from '@angular/core';
import { FirstComponent } from '../first/first';
import { SecondComponent } from '../second/second';

@Component({
  selector: 'app-container',
  imports: [FirstComponent, SecondComponent],
  templateUrl: './container.html',
  styleUrl: './container.css',
})
export class ContainerComponent {

}
