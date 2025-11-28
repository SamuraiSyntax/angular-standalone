import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-adresse',
  imports: [],
  templateUrl: './adresse.html',
  styleUrl: './adresse.css',
})
export class AdresseComponent {
  ville = '';
  cp = '';

  constructor(private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      this.ville = params.get('ville') ?? '';
      this.cp = params.get('cp') ?? '';
    });
  }
}
// ?ville=Marseille&cp=13000