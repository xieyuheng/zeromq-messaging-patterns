# ZeroMQ messaging patterns

> ZeroMQ is a really beautiful hammer, </br>
> you should take it with you </br>
> and find nails. </br>
>
> -- Someone on the internet.

I know about ZMQ years ago.

I admire [Pieter Hintjens](https://en.wikipedia.org/wiki/Pieter_Hintjens), I read many of his books, and watched all his talks I can find the internet. He was such a great leader!

But I never had a project about messaging, in which I can use ZMQ.

Until I want to write a _subdoman-based http reverse proxy_ (like [ngrok](https://ngrok.com)).

I implemented it by pure TCP and socket API,
a lot of features aboud reliability need to be implemented.

Then I went back to ZMQ docs again, and found that
the _subdoman-based http reverse proxy_ I want to implement
is exactly the **[majordemo](https://zguide.zeromq.org/docs/chapter4/#Service-Oriented-Reliable-Queuing-Majordomo-Pattern)** of ZMQ's zguide.

I finally found the perfact nail!

## Development

```sh
npm install           # Install dependencies
npm run build         # Compile `src/` to `lib/`
npm run build:watch   # Watch the compilation
npm run format        # Format the code
```

## License

[GPLv3](LICENSE)
