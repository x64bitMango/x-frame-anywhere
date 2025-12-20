# X-Frame-Anywhere

[![Live Demo](https://img.shields.io/badge/Demo-_✦_Live-green)](https://x64bitmango.github.io/x-frame-anywhere/)
![Open Issues](https://img.shields.io/github/issues/x64bitMango/x-frame-anywhere)
![License](https://img.shields.io/github/license/x64bitMango/x-frame-anywhere)
![Last Commit](https://img.shields.io/github/last-commit/x64bitMango/x-frame-anywhere)
![Repo Size](https://img.shields.io/github/repo-size/x64bitMango/x-frame-anywhere)

## Synopsis
X-Frame-Anywhere is a [Customized Built-in Element](https://html.spec.whatwg.org/multipage/custom-elements.html#custom-elements-customized-builtin-example), which extends an IFrame to bypass the [`X-Frame-Options: deny/sameorigin`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options) response header. Normally such headers prevent embedding a web page in an `<iframe>` element, but X-Frame-Anywhere reflects an iframe's `src` value through multiple CORS proxies to circumvent this restriction.

X-Frame-Anywhere is a personal, rewritten fork of [Niutech's X-Frame-Bypass](https://github.com/niutech/x-frame-bypass) but with some extra flexibility and a debug option. Big honourable mention to them for the original repository still.

This repository also serves as an unofficial extension of documentation for X-Frame-Bypass and an official documentation of X-Frame-Anywhere.


## Usage

> [!WARNING]
> An iframe which has both `allow-scripts` and `allow-same-origin` (like the X-Frame-Anywhere iframes) sandbox values **can escape it's sandboxing**. Only iframe secure content which is deemed safe! I doubt this warning will do anything but fall on deaf ears, though.

### **1. Include the X-Frame-Anywhere JS module:**
From small scale demos, projects and blogs, to large scale deployments & projects, the use of the jsdelivr CDN package should be relied on.
   ```html
   <script type="module" src="https://cdn.jsdelivr.net/gh/x64bitMango/x-frame-anywhere/x-frame-anywhere.js" defer></script>
   ```
### **2. Insert the X-Frame-Anywhere Custom Element:**
   ```html
   <iframe is="x-frame-anywhere" src="https://example.org/"></iframe>
   ```
   You can also include the `debug` attribute to enable debug logging in the console.
   
   ```html
   <iframe is="x-frame-anywhere" debug src="https://example.org/"></iframe>
   ```

## How does this work?

As to the dismay of myself and everyone else wanting to bypass x-frame policies and restrictions, this is not a clear cut way of doing so, and is just a circumvention method which doesn't truly _iframe_ an element.

Both X-Frame-Anywhere and X-Frame-Bypass scrape the HTML of the `src` URL using a CORS proxy to access and reflect the source HTML alongside through said CORS proxy. 

## Frequently asked Questions

### Q1: Do X-Frame-Anywhere and X-Frame-Bypass make traditional iframes redundant?
**A**: **No. Anything but.** Traditional iframes should still, and always, be used for embedding/iframing content that you have access to and that CORS and x-frame policies permit. Neither X-Frame-Anywhere nor X-Frame-Bypass are true bypasses of x-frame restrictions, and should only be used in cases where you do not have CORS or x-frame permissions.

At face value, they seem as if they're a magical quack remedy for iframe restrictions, but they are both very restrictive in what you can do with them, and cannot connect to any backend regarding PHP, backend persistent storage and the such. 

Both x-frame bypassing resources act merely as mirrors of frontend code through a CORS proxy, which work for the most part, but break at a point of services which require logging in, or any backend interaction that's usually restricted because of CORS, while traditional iframes with correct CORS permissions run the iframed page's frontend and can connect to the backend because they have the permissive CORS and x-frame permissions which CORS proxies just can't mimic.

---

### Q2: How do you deal with relative paths towards Javascript, CSS and other media?
**A**: The X-Frame-Anywhere script adds a `<base>` tag inside of the `<head>` so relative paths still get forwarded through the source URL

---

### Q3: How does debug logging work? What does it do?
**A**: Adding the `debug` attribute to your X-Frame-Anywhere iframe enables a simple debug logging mode which uses the following method:
```js
debugLog(level, ...args) {
   if (!this.hasAttribute('debug')) return;
   console[level]("X-Frame-Anywhere :", ...args);
   }
```

**The following table lists all methods that are logged when debug logging is enabled:**

| Method | Debug Log Message |
|---|---|
| `constructor()` | `X-Frame-Anywhere Initialized & Constructed.` |
| `load()` | `'Loading URL:', ${url}` |
| `disconnectedCallback()` | `X-Frame-Anywhere Removed From Page` |
| `adoptedCallback()` | `X-Frame-Anywhere Moved To New Document.` |
| `attributeChangedCallback()` | `${name} attribute changed: ${oldValue} → ${newValue}` |
| `fetchProxy()` | `Attempting Fetching URL via proxy ${i}: ${proxies[i]}${url}` |
| `fetchProxy() error` | `Proxy ${i} failed, trying next proxy... ${i + 1}` |

---

### Q4: Comparing X-Frame-Anywhere with X-Frame-Bypass, should I prefer one over the other?

**A**: **Well, it's really up to preference.** Either one works for most use-cases where you would want an `<iframe>` to circumvent x-frame restrictions due to CORS and/or x-frame policies. 

**If you are to use this in active deployment, either one works perfectly fine.**

**If you plan to use this to link to data which can/should be installed/downloaded or deals with user storage at all, X-Frame-Anywhere** uses `allow-downloads` and `allow-storage-access-by-user-activation` in it's sandbox attribute while X-Frame-Bypass does not. I'll probably delve deeper into this if I decide to make a SECURITY.md.

**If you are to dissect, debug or fork your own version, stick with with X-Frame-Anywhere**. Maybe a little bias, but the **x-frame-anywhere.js** code is littered with helpful comments, notes and is rewritten in a more understandable framework alongside coming with the minimal debug code which can be further developed.

Table of X-Frame-Anywhere and X-Frame-Bypass and their access to the following iframe `sandbox` attribute values:

| Sandbox Value | X-Frame-Anywhere | X-Frame-Bypass |
|---|:---:|:---:|
| `allow-forms` | ✅ | ✅ |
| `allow-modals` | ✅ | ✅ |
| `allow-orientation-lock` | ✅ | ❌ |
| `allow-pointer-lock` | ✅ | ✅ |
| `allow-popups` | ✅ | ✅ |
| `allow-popups-to-escape-sandbox` | ✅ | ✅ |
| `allow-presentation` | ✅ | ✅ |
| `allow-same-origin` | ✅ | ✅ |
| `allow-top-navigation-by-user-activation` | ✅ | ✅ |
| `allow-top-navigation-to-custom-protocols` | **REDUNDANT*** | **REDUNDANT*** |
| `allow-downloads` | ✅ | ❌ |
| ⚠️ `allow-storage-access-by-user-activation` | ❌ | ❌ |
| ⚠️ `allow-top-navigation` | ❌ | ❌ |

⚠️ → Not included on either due to security reasons.

If `allow-popups` or `allow-top-navigation` are already specified in the sandbox attribute, as `allow-popups` is with both, `allow-top-navigation-to-custom-protocols` **becomes redundant** as those broader permissions already encompass the ability to navigate to custom protocols. 

> [!NOTE]
> Even with this redundancy, X-Frame-Anywhere still includes `allow-top-navigation-to-custom-protocols` since `allow-popups` requires the opening of a new window to navigate to custom protocols. So to not require an extra window be open to navigate to custom protocols, this value is included.
>
> This is an experimental feature within X-Frame-Anywhere in it of itself so there is no guarantee for success of custom protocol navigation.

> [!CAUTION]
> `allow-storage-access-by-user-activation` allows iframes using X-Frame-Anywhere to access unpartitioned cookies among other resources via the [`Storage Access API`](https://developer.mozilla.org/en-US/docs/Web/API/Storage_Access_API). Unpartitioned cookies are a traditional type of cookie that are **shared across all top-level websites**. This isn't included in the sandbox of either X-Frame-Anywhere nor X-Frame-Bypass for **obvious potential for allowing cross-site tracking**.


---


## Demo

See my [GitHub profile using x-frame-anywhere](https://x64bitmango.github.io/x-frame-anywhere/). Current versions of of Chrome, Firefox and Edge are supported. Safari does not support Customized Built-in Elements yet (hasn't been tested. Please submit a new GitHub issue if this is no longer the case).

## ⚖️ License

&copy; 2025 x64BitMango under Apache License 2.0.

&copy; 2019 Jerzy Głowacki under Apache License 2.0.
