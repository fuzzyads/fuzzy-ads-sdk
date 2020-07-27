const IPFS = require('ipfs');

class FuzzyAd extends HTMLElement {

  get auID() {
    return this.getAttribute('auID');
  }

  static async createIPFSNode() {
    return await IPFS.create().then((ipfs) => {
      ipfs.config.get('Addresses.Swarm').then((res) => {
        console.log(res);
      })
    });
  }

  static async getAd(ipfs) {
    const chunks = []
    for await (const chunk of ipfs.cat('QmQ2r6iMNpky5f1m4cnm3Yqw8VSvjuKpTcK1X7dBR1LkJF')) {
      chunks.push(chunk)
    }
    console.log(Buffer.concat(chunks).toString())
  }

  connectedCallback() {
    // on connect call out to IPFS
    // FuzzyAd.createIPFSNode().then(() => {
      // FuzzyAd.getAd(ipfs)
    // });
  
    let adElem = document.createElement("img");
    adElem.width = "100"
    adElem.height = "100"
    adElem.src = "https://ipfs.io/ipfs/QmW2WQi7j6c7UgJTarActp7tDNikE4B2qXtFCfLPdsgaTQ/cat.jpg"
    this.appendChild(adElem);
  }

}

customElements.define('fuzzy-ad', FuzzyAd);
