import { Component, input, Input } from '@angular/core';

@Component({
  selector: 'app-fils',
  imports: [],
  templateUrl: './fils.html',
  styleUrl: './fils.css',
})
export class FilsComponent {
  // @Input({ required: true }) ville = 'Paris'
  // @Input() ville = 'Paris'
  ville = input<string>('Lille')
  // ville = input.required<string>()
}
