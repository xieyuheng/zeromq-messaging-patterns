# ZeroMQ messaging patterns

> ZeroMQ is a really beautiful hammer, </br>
> you should take it with you </br>
> and find nails. </br>
>
> -- Xie Yuheng

I know about ZMQ years ago.

I admire [Pieter Hintjens](https://en.wikipedia.org/wiki/Pieter_Hintjens), I read many of his books, and watched all his talks I can find the internet. He was such a great leader!

But I never had a project about messaging, in which I can use it.

Until I want to write a _subdoman-based http reverse proxy_ (like [ngrok](https://ngrok.com)).

I implemented it by pure TCP and socket API,
a lot of features aboud reliability need to be implemented.

Then I went back to ZMQ docs again, and found that
the _subdoman-based http reverse proxy_ I want to implement
is exactly the **[majordemo(https://zguide.zeromq.org/docs/chapter4/#Service-Oriented-Reliable-Queuing-Majordomo-Pattern)]** of ZMQ's zguide.

I finally found the perfact nail!

## Development

```sh
npm install           # Install dependencies
npm run build         # Compile `src/` to `lib/`
npm run build:watch   # Watch the compilation
npm run format        # Format the code
```

## Contributions

To make a contribution, fork this project and create a pull request.

Please read the [STYLE-GUIDE.md](STYLE-GUIDE.md) before you change the code.

Remember to add yourself to [AUTHORS](AUTHORS).
Your line belongs to you, you can write a little
introduction to yourself but not too long.

It is assumed that all non draft PRs are ready to be merged.
If your PR is not ready to be merged yet, please make it a draft PR:

- [Creating draft PR](https://github.blog/2019-02-14-introducing-draft-pull-requests)
- [Changing a PR to draft](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/changing-the-stage-of-a-pull-request)

During the development of your PR, you can make use of
the [TODO.md](TODO.md) file to record ideas temporarily,
and this file should be clean again at the end of your development.

## License

[GPLv3](LICENSE)
