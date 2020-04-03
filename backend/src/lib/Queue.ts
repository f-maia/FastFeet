import Bee, { Job } from 'bee-queue';

import redisConfig from '../config/redis';

import OrderAssignmentMail from '../app/jobs/OrderAssignmentMail';
import OrderCancellationMail from '../app/jobs/OrderCancellationMail';

import IQueue from '../app/interfaces/Queue';
import IQueues from '../app/interfaces/Queues';

const jobs = [OrderAssignmentMail, OrderCancellationMail];

class Queue implements IQueue {
  public queues: IQueues;

  constructor() {
    this.queues = {};

    this.init();
  }

  init(): void {
    jobs.forEach(({ key, handle }) => {
      this.queues[key] = {
        bee: new Bee(key, {
          redis: redisConfig,
        }),
        handle,
      };
    });
  }

  add(queue: string, job: {}): Promise<Job> {
    return this.queues[queue].bee.createJob(job).save();
  }

  processQueue(): void {
    jobs.forEach(job => {
      const { bee, handle } = this.queues[job.key];

      bee.on('failed', this.handleFailure).process(handle);
    });
  }

  handleFailure(job: Job, err: any): void {
    console.log(`Queue ${job.queue.name}: FAILED`, err);
  }
}

export default new Queue();
