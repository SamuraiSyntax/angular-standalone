import { createReducer, on } from '@ngrx/store';
import { CounterState } from './counter.state';
import { addBy, decrement, increment } from './counter.action';

export const initialState: CounterState = { signe: 'nul', valeur: 0 };

export const counterReducer = createReducer(
  initialState,
  on(increment, (state) => ({ ...state, valeur: state.valeur + 1 })),
  on(decrement, (state) => ({ ...state, valeur: state.valeur - 1 })),
  on(addBy, (state, { value }) => ({ ...state, valeur: state.valeur + value }))
);
