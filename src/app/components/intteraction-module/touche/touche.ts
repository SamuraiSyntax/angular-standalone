import { NgClass } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-touche',
  imports: [NgClass],
  templateUrl: './touche.html',
  styleUrl: './touche.css',
})
export class Touche {
  @Input() value: string = '';
  @Output() toucheClick = new EventEmitter<string>();

  onClick() {
    this.toucheClick.emit(this.value);
  }
}
