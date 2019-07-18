# Cracker (better name pending) 

This repo is a fun attempt to try to guess Ethereum wallet private keys

## how to test

1. Clone this repo `git clone https://github.com/ctverceles/blockchain-wallet-guesser`
2. `cd blockchain-wallet-guesser`
3. `yarn` or `npm install`
4. `yarn test`: everything should be green

## explanation
What ive done so far is not difficult. all it is is generating a random number between 0 and 10^10 (from trial and error unit testing, this is a good range to stay within the 64 digit hex that is a private key), converting it to a private key (64 digits of hex values), using web3 to unlock it. thats the trivial part. whats difficult is (and i havent implemented this) 1) how to actually find a private key w balance in it within a large range of base10 private key equivalents (if your private key in base10 is between 1 and 100,000 for example, thats actually easy to brute force and it looks like someone's already done that on Ethereum). and 2) im brushing up now on some basic AI heuristic search algorithms and i need to find a "hook" to search around - my first guess is to check for patterns in bip39 wallet generation. 
