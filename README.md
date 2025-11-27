# X-Frame-Anywhere

X-Frame-Anywhere is a [Customized Built-in Element](https://html.spec.whatwg.org/multipage/custom-elements.html#custom-elements-customized-builtin-example), which extends an IFrame to bypass the [`X-Frame-Options: deny/sameorigin`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options) response header. Normally such headers prevent embedding a web page in an `<iframe>` element, but X-Frame-Anywhere uses a CORS proxy to allow this.

Now.. this may look like a 1:1 copy of [Niutech's X-Frame-Bypass](https://github.com/niutech/x-frame-bypass), but it's really not. X-Frame-Anywhere is a personal, rewritten fork of Niutech's X-Frame-Bypass with a couple additional flexibility and debug options. But big honourable mention to them for the original.

> [!NOTE]
> ### current sandbox values:
> 
> `✦ allow-downloads`,
> `✦ allow-storage-access-by-user-activation`,
> `allow-forms`,
> `allow-modals`,
> `✦ allow-orientation-lock`,
> `allow-pointer-lock`,
> `allow-popups`,
> `allow-popups-to-escape-sandbox`,
> `✦ allow-presentation`,
> `allow-same-origin`,
> `allow-scripts`,
> `allow-top-navigation-by-user-activation`,
> `allow-top-navigation-to-custom-protocols`
>
> ✦ → New Additions


## Usage

> [!WARNING]
> An iframe which has both `allow-scripts` and `allow-same-origin` for it's sandbox values **can escape its sandboxing**. Only iframe secure content which you know is safe! I doubt this warning will do anything but fall on deaf ears, though.


## License

&copy; 2025 x64BitMango under Apache License 2.0.
