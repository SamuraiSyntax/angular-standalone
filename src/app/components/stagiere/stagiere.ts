import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-stagiere',
  imports: [],
  templateUrl: './stagiere.html',
  styleUrl: './stagiere.css',
})
export class StagiereComponent implements OnInit {
  nom = '';
  prenom = '';
  constructor(private route: ActivatedRoute) {}
  ngOnInit(): void {
    // Asynchrone
    // this.route.paramMap.subscribe(params => {
    //   this.nom = params.get('nom') ?? ''
    //   this.prenom = params.get('prenom') ?? ''
    // })
    // Synchrone
    this.nom = this.route.snapshot.paramMap.get('nom') ?? '';
    this.prenom = this.route.snapshot.paramMap.get('prenom') ?? '';
  }
}
