import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ParticipantComponent } from '../participant/participant';
import { TchatService } from '../../services/tchat';

@Component({
  selector: 'app-tchat',
  standalone: true,
  imports: [CommonModule, FormsModule, ParticipantComponent],
  templateUrl: './tchat.html',
  styleUrl: './tchat.css',
})
export class TchatComponent {
  newParticipantName: string = '';
  participants: { name: string; id: number }[] = [];
  nextParticipantId: number = 0;
  participantToKickId: number | null = null;

  constructor(private ts: TchatService, private cdr: ChangeDetectorRef) {}

  addParticipant() {
    if (this.newParticipantName.trim()) {
      const newParticipant = {
        name: this.newParticipantName.trim(),
        id: this.nextParticipantId++,
      };
      this.participants.push(newParticipant);
      this.newParticipantName = '';
    }
  }

  generateParticipants() {
    this.ts.clearAllMessages();
    this.participants = this.ts.generateParticipants();
    this.participantToKickId = null;
  }
  removeParticipant(id: number, name: string) {
    this.participants = this.participants.filter((p) => p.id !== id);

    const message =
      name.toLowerCase() === 'thales'
        ? `${name} a été kick ! À force de chercher on finit toujours par trouver... lol`
        : `${name} a été kick ! On l'a échappé belle !`;

    this.ts.sendMessage(-1, 'Système', message, new Date());

    this.cdr.detectChanges();
  }
  kickSelectedParticipant() {
    const participant = this.participants.find((p) => p.id === this.participantToKickId);
    if (participant) {
      this.removeParticipant(participant.id, participant.name);
      this.participantToKickId = null;
    }
  }
}
