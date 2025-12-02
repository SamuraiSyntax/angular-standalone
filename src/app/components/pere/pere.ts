import {
  AfterViewInit,
  Component,
  OnInit,
  QueryList,
  viewChild,
  ViewChild,
  viewChildren,
  ViewChildren,
} from '@angular/core';
import { FilsComponent } from '../fils/fils';

@Component({
  selector: 'app-pere',
  imports: [FilsComponent],
  templateUrl: './pere.html',
  styleUrl: './pere.css',
})
export class PereComponent implements OnInit, AfterViewInit {
  fils = viewChildren(FilsComponent);
  nom = 'John Wick';
  maVille = 'Marseille';
  ngAfterViewInit(): void {
    console.log(this.fils());
  }
  ngOnInit(): void {
    console.log(this.fils());
  }

  tousLesEnfants() {
    this.fils().forEach((f) => console.log(f.ville()));
  }
}
