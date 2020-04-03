import { Job } from 'bee-queue';

export default interface Queue {
  add(queue: string, job: {}): Promise<Job>;
  processQueue(): void;
}
