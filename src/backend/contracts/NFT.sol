// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
// import "@openzeppelin/contracts/utils/Counters.sol";

contract NFT is ERC721URIStorage {
    constructor() ERC721("ParlaTR","PTR") {}
    uint public amountOfToken;

    // function mint(
    //     string calldata _uri,
    //     uint256 _tokenid,
    //     address _to
    // ) external onlyOwner {
    //     _mint(_to, _tokenid);
    //     _setTokenURI(_tokenid, _uri);
    // }

    function mint(string memory _tokenURI) external returns(uint) {
        amountOfToken++;
        _safeMint(msg.sender, amountOfToken);
        _setTokenURI(amountOfToken, _tokenURI);
        return(amountOfToken);
    }
}