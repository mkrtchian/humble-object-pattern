export interface IBus {
  send(message: string): void;
}

export class MessageBus {
  private bus: IBus;
  constructor(bus?: IBus) {
    this.bus = bus ?? new Bus();
  }

  sendEmailChangedMessage(userId: number, newEmail: string) {
    this.bus.send(
      `Subject: USER; Type: EMAIL CHANGED; Id: ${userId}; NewEmail: ${newEmail}`
    );
  }
}

class Bus implements IBus {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  send(message: string) {
    // TODO: add a real message broker
  }
}
