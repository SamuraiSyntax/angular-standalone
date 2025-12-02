import { Routes } from '@angular/router';
import { ObservableComponent } from './components/observable/observable';
import { SubjectComponent } from './components/subject/subject';
import { ComputedComponent } from './components/computed/computed';
import { ChatComponent } from './components/chat/chat';
import { HomeComponent } from './components/home/home';
import { AboutComponent } from './components/about/about';
import { AdresseComponent } from './components/adresse/adresse';
import { StagiereComponent } from './components/stagiere/stagiere';
import { CalculComponent } from './components/calcul/calcul';
import { Tableau } from './components/tableau/tableau';
import { NotFoundComponent } from './components/not-found/not-found';
import { FormulaireSimpleComponent } from './components/formulaire-simple/formulaire-simple';
import { CalculetteComponent } from './components/calculette/calculette';
import { FormulaireReactifComponent } from './components/formulaire-reactif/formulaire-reactif';
import { FormulaireBuilderComponent } from './components/formulaire-builder/formulaire-builder';
import { CommentComponent } from './components/comment/comment';
import { FormulaireSignalComponent } from './components/formulaire-signal/formulaire-signal';
import { PersonneComponent } from './components/personne/personne';
import { ProduitComponent } from './components/produit/produit';
import { PrimeurComponent } from './components/primeur/primeur';
import { ParentComponent } from './components/parent/parent';
import { Clavier } from './components/clavier/clavier';
import { PereComponent } from './components/pere/pere';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Accueil' },
  { path: 'adresse', component: AdresseComponent, title: 'Adresse' },
  { path: 'address', redirectTo: '/adresse' },
  { path: 'personne', component: PersonneComponent, title: 'Personne' },
  { path: 'stagiaire/:nom/:prenom', component: StagiereComponent, title: 'Stagiaire' },
  { path: 'calcul/:op', component: CalculComponent, title: 'Calcul' },
  { path: 'tableau/:indice', component: Tableau, title: 'Tableau' },
  { path: 'observable', component: ObservableComponent, title: 'Observable' },
  { path: 'subject', component: SubjectComponent, title: 'Subject' },
  { path: 'computed', component: ComputedComponent, title: 'Computed' },
  { path: 'chat', component: ChatComponent, title: 'Chat' },
  { path: 'formulaire-simple', component: FormulaireSimpleComponent, title: 'Formulaire Simple' },
  { path: 'formulaire-reactif', component: FormulaireReactifComponent, title: 'Formulaire Reactif' },
  { path: 'formulaire-builder', component: FormulaireBuilderComponent, title: 'Formulaire Builder' },
  { path: 'formulaire-signal', component: FormulaireSignalComponent, title: 'Formulaire Signal' },
  { path: 'comment', component: CommentComponent, title: 'Comment' },
  { path: 'calculette', component: CalculetteComponent, title: 'Calculette' },
  { path: 'pere', component: PereComponent, title: 'Père/fils' },
  { path: 'about', component: AboutComponent, title: 'À propos' },
  { path: 'primeur', component: PrimeurComponent, title: 'Primeur' },
    { path: 'parent', component: ParentComponent, title: 'Parent' },
    { path: 'clavier', component: Clavier, title: 'Clavier' },
  { path: 'not-found', component: NotFoundComponent, title: 'Page non trouvée' },
  { path: '**', redirectTo: '/not-found' },
];
