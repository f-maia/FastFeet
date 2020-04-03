import Bee from 'bee-queue';

export default interface Queues {
  [key: string]: {
    bee: Bee;
    handle(data: {} | undefined): void;
  };
}
