const provider1 = window.ethereum;
const PolygonChainId = '0x89';
const tokenAddress1 = '0x23f07a1c03e7c6d0c88e0e05e79b6e3511073fd5';
const tokenSymbol1 = 'CDS';
const tokenDecimals1 = 8;
const tokenImage1 = 'https://i.imgur.com/ZXf2SKw.png';

/** Connect to Crypto Development Services */
const setupPolygonChain = async () => {
  /** In case we need to throw an error, let's grab the error modal & error message */
  const errorModalContainer = document.querySelector('.error-modal-container');
  const errorMessage = document.querySelector('.error-message');

  if (provider1) {
    try {
      await provider1.request({ method: 'eth_requestAccounts' });
      await provider1.request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            chainId: PolygonChainId,
            chainName: 'Polygon (Mainnet)',
            nativeCurrency: {
              name: 'Polygon (MATIC)',
              symbol: 'MATIC',
              decimals: 18,
            },
            rpcUrls: ['https://polygon-rpc.com'],
            blockExplorerUrls: [
              'https://explorer.matic.network/',
            ],
          },
        ],
      });
      await provider1.request({ method: 'wallet_watchAsset',
      params: {
        type: 'ERC20', // Initially only supports ERC20, but eventually more!
        options: {
          address: tokenAddress1, // The address that the token is at.
          symbol: tokenSymbol1, // A ticker symbol or shorthand, up to 5 chars.
          decimals: tokenDecimals1, // The number of decimals in the token
          image: tokenImage1, // A string url of the token logo
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
const connectMetaMaskpolygon = document.querySelector('.connectMetaMaskpolygon');
const connectMetaMaskNav1 = document.querySelector('.connectMetaMask-nav');

// If user is not on Integrate MetaMask page, connectMetaMask will not be available so
// we need to check if it's there before adding the event listener to it
 if (connectMetaMaskpolygon) {
  connectMetaMaskpolygon.addEventListener('click', () => {
    setupPolygonChain();
  });
}
//  } if (connectMetaMask) {
// connectMetaMaskNav1.addEventListener('click', () => {
//   setupPolygonChain();
// });
//  }
/** If we are already connected to Crypto Development Services, show disbled button with 'Connected' text */
const connectButtonspolygon = [connectMetaMaskpolygon/*, connectMetaMaskNav1*/];
const displayConnectedButton1 = async () => {
  const accounts = await ethereum.request({ method: 'eth_accounts' });
  connectButtonspolygon.forEach((button) => {
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

const isConnectedToPolygonChain = async () => {
  const chainId = await provider1.request({
    method: 'eth_chainId',
  });
  if (chainId === PolygonChainId) {
    displayConnectedButton1();
  }
};

if (provider1) {
  /** Check if user is connected to Crypto Development Services and display correct button text */
  isConnectedToPolygonChain();

  /** Reload the page if the chain changes */
  provider1.on('chainChanged', () => {
    // MetaMask recommends reloading the page unless we have good reason not to
    // Plus, everytime the window reloads, we call isConnectedToPolygonChain again
    // and can show the correct 'Connected' or 'Connect MetaMask' button text
    window.location.reload();
  });

  /** When the account changes update the button text */
  provider1.on('accountsChanged', (accounts) => {
    if (accounts.length > 0) {
      displayConnectedButton1();
    } else {
      window.location.reload();
    }
  });
}

