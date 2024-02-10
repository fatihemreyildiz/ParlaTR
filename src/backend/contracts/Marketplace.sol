// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "hardhat/console.sol";

contract Marketplace is ReentrancyGuard {
    address payable public immutable feeAccount;
    uint public immutable feePercent;
    uint public itemCount = 0; 

    // When the struct is initialized all the values set to default...
    // That's why when we print, we see all zeros.
    // In order to fix it, we set the index 1...
    struct Item {
        uint itemIdInMarketplace;
        IERC721 nftIERC721;
        uint tokenIdInNFT;
        uint price;
        address payable owner;
        bool sold;
    }

    mapping(uint => Item) public items;

    event Offered(
        uint itemIdInMarketplace,
        address indexed nftIERC721,
        uint tokenIdInNFT,
        uint price,
        address indexed owner
    );

    event Bought(
        uint itemIdInMarketplace,
        address indexed nftIERC721,
        uint tokenIdInNFT,
        uint price,
        address indexed owner,
        address indexed buyer
    );

    constructor(uint _feePercent) {
        feeAccount = payable(msg.sender);
        feePercent = _feePercent;
    }

    // These two functions are added to dissmiss the error messages...
    receive() external payable {}
    fallback() external payable {}

    // Add, the URI of the nftIERC721 or Find a way to access URI over '_nftIERC721'
    function makeItem(IERC721 _nftIERC721, uint _tokenIdInNFT, uint _price) external nonReentrant {
        require(_price > 0, "Price must be greater than zero");
        itemCount++;
        _nftIERC721.transferFrom(msg.sender, address(this), _tokenIdInNFT);

        items[itemCount] = Item (
            itemCount,
            _nftIERC721,
            _tokenIdInNFT,
            _price,
            payable(msg.sender),
            false
        );

        emit Offered(
            itemCount,
            address(_nftIERC721),
            _tokenIdInNFT,
            _price,
            msg.sender
        );
    }

    function purchaseItem(uint _itemIdInMarketplace) external payable nonReentrant {
        uint _totalPrice = getTotalPrice(_itemIdInMarketplace);
        Item storage item = items[_itemIdInMarketplace];
        require(_itemIdInMarketplace > 0 && _itemIdInMarketplace <= itemCount, "item doesn't exist");
        require(msg.sender.balance >= _totalPrice, "Not enough PTR to cover item price and market fee");
        require(!item.sold, "Item already sold");

        (bool success, ) = item.owner.call{value:item.price}("");
        require(success, "Transfer failed.");
        item.sold = true;

        item.nftIERC721.transferFrom(address(this), msg.sender, item.tokenIdInNFT);
        emit Bought(
            _itemIdInMarketplace,
            address(item.nftIERC721),
            item.tokenIdInNFT,
            item.price,
            item.owner,
            msg.sender
        );
        item.owner = payable(msg.sender);
    }
    
    function getTotalPrice(uint _itemIdInMarketplace) view public returns(uint){
        return((items[_itemIdInMarketplace].price*(100 + feePercent))/100);
    }

    function getEachItem(uint index) external view 
    returns (uint, address, uint, uint, address, bool) {
        return(items[index].itemIdInMarketplace, address(items[index].nftIERC721), items[index].tokenIdInNFT, items[index].price, items[index].owner, items[index].sold);
    }

    function getItemCount() public view returns (uint){
        return itemCount;
    }
}