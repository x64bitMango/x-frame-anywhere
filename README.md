# X-Frame-Anywhere
[![Live Demo](https://img.shields.io/badge/Demo-_✦_Live-green)](https://x64bitmango.github.io/x-frame-anywhere/)


X-Frame-Anywhere is a [Customized Built-in Element](https://html.spec.whatwg.org/multipage/custom-elements.html#custom-elements-customized-builtin-example), which extends an IFrame to bypass the [`X-Frame-Options: deny/sameorigin`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options) response header. Normally such headers prevent embedding a web page in an `<iframe>` element, but X-Frame-Anywhere uses a CORS proxy to allow this.

Now.. this may look like a 1:1 copy of [Niutech's X-Frame-Bypass](https://github.com/niutech/x-frame-bypass), but it's really not. X-Frame-Anywhere is a personal, rewritten fork of Niutech's X-Frame-Bypass with a couple additional flexibility and debug options. But big honourable mention to them for the original.


## Usage

> [!WARNING]
> An iframe which has both `allow-scripts` and `allow-same-origin` (like the X-Frame-Anywhere iframes) sandbox values **can escape its sandboxing**. Only iframe secure content which is deemed safe! I doubt this warning will do anything but fall on deaf ears, though.

For small scale demos, projects and hobby sites, you can source use the raw GitHub User Content directly. Please do **not** use that for large scale projects and/or deployments TwT.. but for the time being, a CDN package is still in the works, so feel free to temporarily rely on the raw Github User Content.

### **1. Include the X-Frame-Anywhere JS module:**
   ```html
   <script type="module" src="https://raw.githubusercontent.com/x64bitMango/x-frame-anywhere/refs/heads/main/x-frame-anywhere.js"></script>
   ```
### **2. Insert the X-Frame-Bypass Custom Element:**
   ```html
   <iframe is="x-frame-anywhere" src="https://example.org/"></iframe>
   ```
   You can also include the `debug` attribute to enable debug logging.
   
   ```html
   <iframe is="x-frame-anywhere" debug src="https://example.org/"></iframe>
   ```

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



## Demo

See my [GitHub profile using x-frame-anywhere](https://x64bitmango.github.io/x-frame-anywhere/). Current versions of of Chrome, Firefox and Edge are supported. Safari does not support Customized Built-in Elements yet (hasn't been tested. Please submit a new repo issue if this is fixed).

## License

&copy; 2025 x64BitMango under Apache License 2.0.
