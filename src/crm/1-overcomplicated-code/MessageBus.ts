class IBus {
  send(message: string) {
    console.log(message);
    // TODO: add a real message broker
  }
}

const bus: IBus = new IBus();

export function sendEmailChangedMessage(userId: number, newEmail: string) {
  bus.send(
    `Subject: USER; Type: EMAIL CHANGED; Id: ${userId}; NewEmail: ${newEmail}`
  );
}
