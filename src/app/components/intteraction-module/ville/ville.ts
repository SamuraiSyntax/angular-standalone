import { Component, model } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ville',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './ville.html',
  styleUrl: './ville.css',
})
export class VilleComponent {
  ville = model<string>();
}
