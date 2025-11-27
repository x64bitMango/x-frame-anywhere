class x_frame_anywhere extends HTMLIFrameElement {
    static observedAttributes = ['src', 'debug'];
    static get observedAttributes() {
        return ['src'];
    }
    constructor() {
        super();
		if (this.hasAttribute('debug')) {console.info("X-Frame-Anywhere Initialized & Constructed.");}
		else
		{console.info("X-Frame-Anywhere Initialized & Constructed | Add 'debug' attribute to enable debug logging for selected XFA iframes.");
		console.info("If nothing is happening, make sure you are using the 'defer' attribute when loading this script.");
		}
    }

	debugLog(level, ...args) {
		if (!this.hasAttribute('debug')) return;
		console[level]("X-Frame-Anywhere :", ...args);
	}

    connectedCallback () {

		this.sandbox = '' + this.sandbox || 
        `allow-downloads allow-storage-access-by-user-activation allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-popups-to-escape-sandbox allow-presentation allow-same-origin allow-scripts allow-top-navigation-by-user-activation allow-top-navigation-to-custom-protocols` 
    }
        /* 
        - defaulted to a very open sandbox-- almost a sandcastle
        - allow-storage-access-by-user-activation isn't allowed in iframes by default so adding it here
        - allow-popups-to-escape-sandbox to allow links with target _blank to open new tabs
        - lowkey not even sure how allow-top-navigation-to-custom-protocols works but the more the merrier
        - all except allow-top-navigation which was left out in the original
        */

    load (url, options){
		if (!url) return
		if (!url.startsWith('http')) 
            throw new Error(`X-Frame-Anywhere src ${url} does not start with http(s)://`)
		
		this.debugLog('log', 'Loading URL:', url);

		this.srcdoc = `<!DOCTYPE html><html><head></head><body>Loading...</body></html>`
		this.fetchProxy(url, options, 0).then(res => res.text()).then(data => {
			if (data) this.srcdoc = data.replace(/<head([^>]*)>/i, `<head$1> <base href="${url}">
	<script>
	// X-Frame-Bypass sourced navigation event handlers
	document.addEventListener('click', e => {
		if (frameElement && document.activeElement && document.activeElement.href) {
			e.preventDefault()
			frameElement.load(document.activeElement.href)
		}
	})
	document.addEventListener('submit', e => {
		if (frameElement && document.activeElement && document.activeElement.form && document.activeElement.form.action) {
			e.preventDefault()
			if (document.activeElement.form.method === 'post') frameElement.load(document.activeElement.form.action, {method: 'post', body: new FormData(document.activeElement.form)})
			else frameElement.load(document.activeElement.form.action + '?' + new URLSearchParams(new FormData(document.activeElement.form)))
		}
	})
	</script>`).replace(/ crossorigin=['"][^'"]*['"]/gi, '')
		}).catch(e => console.error('Cannot load X-Frame-Anywhere:', e))
	}


    disconnectedCallback() {
		this.debugLog('log', "X-Frame-Anywhere Removed From Page");
    }
    adoptedCallback() {
		this.debugLog('log', "X-Frame-Anywhere Moved To New Document. Idk why tho. I'm just a little ol' log.");
    }


    attributeChangedCallback(name, oldValue, newValue) {
		this.debugLog('log', `${name} attribute changed: ${oldValue} → ${newValue}`);
        this.load(this.src)
    }


	fetchProxy (url, options, i) {
		const proxies = (options || {}).proxies || [
			'https://api.allorigins.win/raw?url=',
			'https://api.codetabs.com/v1/proxy/?quest=',
			'https://cors-anywhere.herokuapp.com/',
            'https://api.cors.lol/?url=', 
            'https://corsproxy.io/?url=' // added cors.lol and corsproxy.io as extra fallback proxies for cors
		]
		this.debugLog('info', `Attempting Fetching URL via proxy ${i}: ${proxies[i]}${url}`);
		return fetch(proxies[i] + encodeURIComponent(url), options).then(res => {
			if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
			return res
		}).catch(error => {
			if (i === proxies.length - 1) throw error
			this.debugLog('warn', `Proxy ${i} failed, trying next proxy... ${i + 1}`, error);
			return this.fetchProxy(url, options, i + 1) // try the next proxy if the previous one fails
        })
    }
}
customElements.define("x-frame-anywhere", x_frame_anywhere, { extends: "iframe" });

