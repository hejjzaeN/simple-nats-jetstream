## Simple demo of using NATS JetStream

## Getting Started
docker run -p 4222:4222 -ti nats:2.10.7 -js --auth pavelv

node src/consumer.mjs

node src/publisher.mjs