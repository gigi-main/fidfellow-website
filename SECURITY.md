# Sicurezza del sito Fidfellow e della vetrina Nuvia

Questa revisione riguarda le due pagine statiche del repository, non il backend del gestionale Nuvia.

Le pagine applicano una Content Security Policy tramite meta tag, prima delle risorse caricate: script solo dalla stessa origine, nessuno script inline eseguibile, nessuna connessione applicativa, nessun plugin/oggetto o iframe e nessun invio di form. I font Google esistenti restano autorizzati. La navigazione via link, i contatti `mailto:` e gli stili modificati dal JavaScript esistente sono preservati.

I contenuti dinamici della demo Nuvia vengono costruiti con elementi DOM e `textContent` anziché `innerHTML`. I dati attuali erano costanti: si tratta di una difesa preventiva per evitare che futuri dati esterni diventino HTML eseguibile.

Verifica locale: controllo sintassi di tutti i JavaScript, controllo del diff e revisione di script, link, stili e font rispetto alla policy. La verifica visuale del browser remoto non è stata possibile perché il server locale non è raggiungibile da quel browser.

## Limiti dell'hosting da verificare

- Confermare HTTPS obbligatorio nelle impostazioni GitHub Pages e controllare i domini personalizzati effettivamente pubblicati.
- Una CSP in meta non supporta `frame-ancestors`, quindi questa modifica non dichiara attivata la protezione dal clickjacking sul sito vetrina. Per `frame-ancestors`, `X-Content-Type-Options` e HSTS configurare intestazioni HTTP reali presso un hosting/proxy che le supporti. Un file `_headers` non abilita queste intestazioni su GitHub Pages.
- Verificare MFA degli amministratori e regole di protezione dei branch. Non mettere chiavi private, password, dati di ospiti o dump del gestionale in questo repository pubblico.
- Dopo la pubblicazione controllare menu, selettori prodotto, demo, cursori, font e console del browser su entrambe le pagine.

Queste modifiche devono essere integrate e pubblicate prima di proteggere il sito online. Non sono una garanzia contro ogni attacco.

Riferimenti: [GitHub Pages e HTTPS](https://docs.github.com/en/pages/getting-started-with-github-pages/securing-your-github-pages-site-with-https), [OWASP CSP e limiti del meta tag](https://cheatsheetseries.owasp.org/cheatsheets/Content_Security_Policy_Cheat_Sheet.html).
