# Mydemo

Learning majordomo Protocol MDP -- https://rfc.zeromq.org/spec/7

> Partitioning of workers by service allows for multiple applications
> to share the same broker infrastructure.
>
> -- MDP / Scalability and Performance

We do not follow the protocol, our changes are the following:

- We use `Dealer` and `Router`, to avoid empty envelope delimiter frame.
- We always use two router sockets.
- We always add a `kind` at the start of the multi-part message,
  to make it possible to extend it.

# Message formats

The broker's router sockets' message formats
just mirror its clients' message formats,
plus a router id at the start.

`client` and `broker.frontend`:

```
client.send:
| ["Request", serviceName, ...request]
client.receive:
| ["Reply", serviceName, ...reply]

broker.frontend.receive:
| [clientId, "Request", serviceName, ...request]
broker.frontend.send:
| [clientId, "Reply", serviceName, ...reply]
```

`worker` and `broker.backend`:

```
worker.send:
| ["Ready", serviceName]
| ["Reply", clientId, ...reply]
| ["Heartbeat"]
| ["Disconnect"]
worker.receive:
| ["Request", clientId, ...request]
| ["Heartbeat"]
| ["Disconnect"]

broker.backend.receive:
| [workerId, "Ready", serviceName]
| [workerId, "Reply", clientId, ...reply]
| [workerId, "Heartbeat"]
| [workerId, "Disconnect"]
broker.backend.send:
| [workerId, "Request", clientId, ...request]
| [workerId, "Heartbeat"]
| [workerId, "Disconnect"]
```

# Dialogs

`client` and `broker.frontend` dialog:

```
Repeat:
| C: REQUEST
| B: REPLY
| ...
```

`worker` and `broker.backend` dialog:

```
W: READY

Repeat:
| B: REQUEST
| S: REPLY
| ...
```

`broker.backend` heartbeat:

```
Repeat:
| B: HEARTBEAT

B: DISCONNECT
```

`worker` heartbeat:

```
Repeat:
| W: HEARTBEAT

W: DISCONNECT
```
