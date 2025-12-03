import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-calcul',
  imports: [],
  templateUrl: './calcul.html',
  styleUrl: './calcul.css',
})
export class CalculComponent implements OnInit {
  operation: string = '';
  value1: number = 0;
  value2: number = 0;
  result: number | string = '';

  constructor(private route: ActivatedRoute) {}
  ngOnInit(): void {
    combineLatest([
      this.route.paramMap,
      this.route.queryParamMap,
    ]).subscribe(([p, q]) => {
      this.operation = p.get('op') || '';
      this.value1 = +q.get('value1')! || 0;
      this.value2 = +q.get('value2')! || 0;
      this.calc();
    });
  }

  calc(): void {
    const op = this.operation;
    const a = this.value1;
    const b = this.value2;
    let res: number | string = this.result;

    if (!op || isNaN(a) || isNaN(b)) {
      this.result = op ? 'Veuillez fourni deux nombre valides.' : '';
      return;
    }

    if (op === 'div' && b === 0) {
      this.result = 'Division par zero impossible';
      return;
    }

    switch (op) {
      case 'plus':
        res = a + b;
        break;
      case 'moins':
        res = a - b;
        break;
      case 'fois':
        res = a * b;
        break;
      case 'div':
        res = a / b;
        break;
      default:
        this.result = 'Operation non reconnue';
        return;
    }
    this.result = res;
  }
}
