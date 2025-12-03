import { Routes } from '@angular/router';
import { ObservableComponent } from './components/reactive-module/observable/observable';
import { SubjectComponent } from './components/reactive-module/subject/subject';
import { ComputedComponent } from './components/reactive-module/computed/computed';
import { ChatComponent } from './components/chat/chat';
import { HomeComponent } from './components/home/home';
import { AboutComponent } from './components/about/about';
import { AdresseComponent } from './components/routage-module/adresse/adresse';
import { StagiereComponent } from './components/routage-module/stagiere/stagiere';
import { CalculComponent } from './components/routage-module/calcul/calcul';
import { Tableau } from './components/routage-module/tableau/tableau';
import { NotFoundComponent } from './components/not-found/not-found';
import { FormulaireSimpleComponent } from './components/formulaire-module/formulaire-simple/formulaire-simple';
import { CalculetteComponent } from './components/formulaire-module/calculette/calculette';
import { FormulaireReactifComponent } from './components/formulaire-module/formulaire-reactif/formulaire-reactif';
import { FormulaireBuilderComponent } from './components/formulaire-module/formulaire-builder/formulaire-builder';
import { CommentComponent } from './components/formulaire-module/comment/comment';
import { FormulaireSignalComponent } from './components/formulaire-module/formulaire-signal/formulaire-signal';
import { PersonneComponent } from './components/personne-module/personne/personne';
import { ProduitComponent } from './components/intteraction-module/produit/produit';
import { PrimeurComponent } from './components/intteraction-module/primeur/primeur';
import { ParentComponent } from './components/intteraction-module/parent/parent';
import { Clavier } from './components/intteraction-module/clavier/clavier';
import { PereComponent } from './components/intteraction-module/pere/pere';
import { PaysComponent } from './components/intteraction-module/pays/pays';
import { VilleComponent } from './components/intteraction-module/ville/ville';
import { ContainerComponent } from './components/intteraction-module/container/container';
import { TchatComponent } from './components/intteraction-module/tchat/tchat';
import { PersonneDetailsComponent } from './components/personne-module/personne-details/personne-details';
import { AuthComponent } from './components/auth/auth';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Accueil' },
  { path: 'auth', component: AuthComponent, title: 'Authentification' },
  { path: 'adresse', component: AdresseComponent, title: 'Adresse' },
  { path: 'address', redirectTo: '/adresse' },
  { path: 'pays', component: PaysComponent, title: 'Pays - Villes' },
  { path: 'ville', component: VilleComponent, title: 'Ville' },
  { path: 'personne', component: PersonneComponent, title: 'Personne', canActivate: [authGuard] },
  { path: 'personne/:id', component: PersonneDetailsComponent, title: 'Détails Personne', canActivate: [authGuard]},
  { path: 'stagiaire/:nom/:prenom', component: StagiereComponent, title: 'Stagiaire' },
  { path: 'calcul/:op', component: CalculComponent, title: 'Calcul' },
  { path: 'tableau/:indice', component: Tableau, title: 'Tableau' },
  { path: 'observable', component: ObservableComponent, title: 'Observable' },
  { path: 'subject', component: SubjectComponent, title: 'Subject' },
  { path: 'computed', component: ComputedComponent, title: 'Computed' },
  { path: 'chat', component: ChatComponent, title: 'Chat' },
  { path: 'tchat', component: TchatComponent, title: 'Tchat' },
  { path: 'formulaire-simple', component: FormulaireSimpleComponent, title: 'Formulaire Simple' },
  { path: 'formulaire-reactif', component: FormulaireReactifComponent, title: 'Formulaire Reactif' },
  { path: 'formulaire-builder', component: FormulaireBuilderComponent, title: 'Formulaire Builder' },
  { path: 'formulaire-signal', component: FormulaireSignalComponent, title: 'Formulaire Signal' },
  { path: 'comment', component: CommentComponent, title: 'Comment' },
  { path: 'calculette', component: CalculetteComponent, title: 'Calculette' },
  { path: 'pere', component: PereComponent, title: 'Père/fils' },
  { path: 'container', component: ContainerComponent, title: 'Container' },
  { path: 'about', component: AboutComponent, title: 'À propos' },
  { path: 'primeur', component: PrimeurComponent, title: 'Primeur' },
    { path: 'parent', component: ParentComponent, title: 'Parent' },
    { path: 'clavier', component: Clavier, title: 'Clavier' },
  { path: 'not-found', component: NotFoundComponent, title: 'Page non trouvée' },
  { path: '**', redirectTo: '/not-found' },
];
