import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { ServerKafka } from '@nestjs/microservices';

@Injectable()
export class KafkaConsumerService
  extends ServerKafka
  implements OnModuleDestroy
{
  constructor() {
    super({
      client: {
        clientId: 'notifications',
        brokers: ['magical-pegasus-13366-us1-kafka.upstash.io:9092'],
        sasl: {
          mechanism: 'scram-sha-256',
          username:
            'bWFnaWNhbC1wZWdhc3VzLTEzMzY2JNBBHPCbOS2-TUpU5GMHwrhoRJgdcGXSWTE',
          password:
            'awwJxoxdTTRxKRHT92UngcUEIxE-45Bbwo8vAaZlVwGUmUZ3mX6fH--WSz_a2WJIezs5wA==',
        },
        ssl: true,
      },
    });
  }

  async onModuleDestroy() {
    await this.close();
  }
}
