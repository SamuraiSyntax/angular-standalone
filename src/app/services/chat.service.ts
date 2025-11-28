// src/app/services/chat.service.ts
import { Injectable, OnDestroy } from '@angular/core';
import { ReplaySubject, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

// Interface pour un message de chat
export interface ChatMessage {
  sender: string;
  message: string;
  timestamp: Date;
}

// --- Simulation d'un serveur WebSocket ---
// En réalité, ce serait une connexion à un vrai serveur.
// Ici, nous simulons l'envoi et la réception de messages.
class MockWebSocket {
  private messageSubject = new Subject<ChatMessage>();
  public messages$: Observable<ChatMessage> = this.messageSubject.asObservable();

  constructor() {
    console.log('MockWebSocket: Serveur simulé démarré.');
  }

  // Simule l'envoi d'un message au "serveur"
  send(message: ChatMessage): void {
    console.log(`MockWebSocket: Message envoyé au serveur: [${message.sender}] ${message.message}`);
    // Le serveur renvoie le message à tous les clients connectés (ici, nous le renvoyons directement)
    setTimeout(() => this.messageSubject.next(message), 50); // Petite latence
  }

  // Simule la réception d'un message du "serveur"
  // (Dans un vrai WebSocket, ceci serait déclenché par l'événement 'onmessage')
  simulateIncomingMessage(message: ChatMessage): void {
    this.messageSubject.next(message);
  }

  close(): void {
    this.messageSubject.complete();
    console.log('MockWebSocket: Serveur simulé arrêté.');
  }
}
// --- Fin de la simulation WebSocket ---

@Injectable({
  providedIn: 'root', // Rend le service disponible dans toute l'application
})
export class ChatService implements OnDestroy {
  // Le ReplaySubject stockera TOUS les messages.
  // Quand un nouvel abonné arrive, il recevra TOUS les messages précédents.
  private chatMessagesSubject = new ReplaySubject<ChatMessage>();

  // Observable public pour que les composants puissent s'abonner aux messages
  public chatMessages$: Observable<ChatMessage> = this.chatMessagesSubject.asObservable();

  // Simule la connexion WebSocket
  private webSocket: MockWebSocket;
  private destroy$ = new Subject<void>(); // Pour gérer la désinscription lors de la destruction du service

  constructor() {
    console.log('ChatService initialisé.');
    this.webSocket = new MockWebSocket();
    this.connectToWebSocket();

    // Simuler quelques messages initiaux via le "serveur"
    this.webSocket.simulateIncomingMessage({
      sender: 'Bot',
      message: 'Bienvenue dans le chat !',
      timestamp: new Date(),
    });
    this.webSocket.simulateIncomingMessage({
      sender: 'Alice',
      message: 'Salut tout le monde !',
      timestamp: new Date(),
    });
    this.webSocket.simulateIncomingMessage({
      sender: 'Bob',
      message: 'Bonjour Alice !',
      timestamp: new Date(),
    });
  }

  /**
   * Établit la connexion au WebSocket et écoute les messages entrants.
   */
  private connectToWebSocket(): void {
    // S'abonne aux messages du WebSocket et les passe au ReplaySubject
    this.webSocket.messages$
      .pipe(takeUntil(this.destroy$)) // Se désinscrit quand le service est détruit
      .subscribe(
        (message) => {
          console.log(
            `ChatService: Message reçu du WebSocket: [${message.sender}] ${message.message}`
          );
          this.chatMessagesSubject.next(message);
        },
        (error) => console.error('Erreur WebSocket:', error),
        () => console.log('WebSocket fermé.')
      );
  }

  /**
   * Envoie un nouveau message au chat via le WebSocket.
   * Le message sera ensuite reçu par le service via le WebSocket et diffusé par le ReplaySubject.
   */
  public sendMessage(sender: string, message: string): void {
    const newMessage: ChatMessage = {
      sender,
      message,
      timestamp: new Date(),
    };
    this.webSocket.send(newMessage); // Envoie le message au "serveur" WebSocket
  }

  /**
   * Simule l'invitation d'un nouveau membre.
   * Le nouveau membre s'abonne aux messages et reçoit TOUT l'historique.
   * (Cette méthode est plus pour la démonstration du ReplaySubject,
   * dans une vraie application, le composant s'abonnerait directement)
   */
  public inviteNewMember(memberName: string): void {
    console.log(`\n--- ${memberName} rejoint la conversation ---`);
    this.chatMessages$.subscribe(
      (message) => {
        console.log(
          `[${memberName} voit] (${message.timestamp.toLocaleTimeString()}) ${message.sender}: ${
            message.message
          }`
        );
      },
      (error) => console.error(`Erreur pour ${memberName}:`, error),
      () => console.log(`${memberName} a terminé de recevoir les messages.`)
    );
    this.sendMessage('Système', `${memberName} a rejoint le chat.`);
  }

  /**
   * Nettoie les ressources lors de la destruction du service.
   */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.chatMessagesSubject.complete();
    this.webSocket.close();
    console.log('ChatService détruit.');
  }
}
