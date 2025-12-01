import { Commentaire } from './commentaire';

export interface PersonneCommentaire {
  nom: string;
  prenom: string;
  commentaires: Commentaire[];
}
