const provider2 = window.ethereum;
const AvalancheChainId = '0xa86a';
const tokenAddress2 = '0x23f07a1c03e7c6d0c88e0e05e79b6e3511073fd5';
const tokenSymbol2 = 'CDS';
const tokenDecimals2 = 8;
const tokenImage2 = 'https://i.imgur.com/ZXf2SKw.png';

/** Connect to Crypto Development Services and the BSC mainnet network */
const setupAvalancheChain = async () => {
  /** In case we need to throw an error, let's grab the error modal & error message */
  const errorModalContainer = document.querySelector('.error-modal-container');
  const errorMessage = document.querySelector('.error-message');

  if (provider2) {
    try {
      await provider2.request({ method: 'eth_requestAccounts' });
      await provider2.request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            chainId: AvalancheChainId,
            chainName: 'Avalanche - Mainnet',
            nativeCurrency: {
              name: 'Avalanche',
              symbol: 'BNB',
              decimals: 18,
            },
            rpcUrls: ['https://api.avax.network/ext/bc/C/rpc'],
            blockExplorerUrls: [
              'https://snowtrace.io/',
            ],
          },
        ],
      });
      await provider2.request({ method: 'wallet_watchAsset',
      params: {
        type: 'ERC20', // Initially only supports ERC20, but eventually more!
        options: {
          address: tokenAddress2, // The address that the token is at.
          symbol: tokenSymbol2, // A ticker symbol or shorthand, up to 5 chars.
          decimals: tokenDecimals2, // The number of decimals in the token
          image: tokenImage2, // A string url of the token logo
        },
      },
     })
    } catch (e) {
      /** Code 4001 is user rejected, we don't need to notify the user if they rejected the request */
      if (e.code !== 4001) {
        errorModalContainer.style.display = 'block';
        errorMessage.innerHTML = e.message;
      }
    }
  } else {
    errorModalContainer.style.display = 'block';
    errorMessage.innerHTML = `It looks like MetaMask hasn't been installed. Please <a href="https://metamask.io/download.html" target="_blank" rel="noreferrer noopener">install MetaMask</a> and try again.`;
  }
};

/**  Add event listener to the Connect MetaMask buttons */
const connectMetaMaskavax = document.querySelector('.connectMetaMaskavax');
const connectMetaMaskNav2 = document.querySelector('.connectMetaMask-nav');

// If user is not on Integrate MetaMask page, connectMetaMask will not be available so
// we need to check if it's there before adding the event listener to it
 if (connectMetaMaskavax) {
  connectMetaMaskavax.addEventListener('click', () => {
    setupAvalancheChain();
  });
}
//  } if (connectMetaMask) {
// connectMetaMaskNav2.addEventListener('click', () => {
//   setupAvalancheChain();
// });
//  }
/** If we are already connected to Crypto Development Services, show disbled button with 'Connected' text */
const connectButtonsavax = [connectMetaMaskavax/*, connectMetaMaskNav2*/];
const displayConnectedButton2 = async () => {
  const accounts = await ethereum.request({ method: 'eth_accounts' });
  connectButtonsavax.forEach((button) => {
    if (button && accounts.length > 0) {
      const shortenedAccount = `${accounts[0].slice(
        0,
        6
      )}...${accounts[0].slice(-4)}`;
      button.innerHTML = `Connected: ${shortenedAccount}`;
      button.className += ' disabled-button';
      button.removeEventListener('click', () => {});
    }
  });
};

const isConnectedToAvalancheChain = async () => {
  const chainId = await provider2.request({
    method: 'eth_chainId',
  });
  if (chainId === AvalancheChainId) {
    displayConnectedButton2();
  }
};

if (provider2) {
  /** Check if user is connected to Wrapped NewYorkCoin and display correct button text */
  isConnectedToAvalancheChain();

  /** Reload the page if the chain changes */
  provider2.on('chainChanged', () => {
    // MetaMask recommends reloading the page unless we have good reason not to
    // Plus, everytime the window reloads, we call isConnectedToAvalancheChain again
    // and can show the correct 'Connected' or 'Connect MetaMask' button text
    window.location.reload();
  });

  /** When the account changes update the button text */
  provider2.on('accountsChanged', (accounts) => {
    if (accounts.length > 0) {
      displayConnectedButton2();
    } else {
      window.location.reload();
    }
  });
}

