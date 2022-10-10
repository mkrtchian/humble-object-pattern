class Bus {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  send(message: string) {
    // TODO: add a real message broker
  }
}

const bus = new Bus();

export function sendEmailChangedMessage(userId: number, newEmail: string) {
  bus.send(
    `Subject: USER; Type: EMAIL CHANGED; Id: ${userId}; NewEmail: ${newEmail}`
  );
}
