"use client";
import Card from '../ui/Card'
import { useEffect,useState } from "react";
export default function Inventory(props:any){
  const [Cards, setCards] = useState();
  useEffect(() => { 
    const items = async () => {
      console.log(props)
      const itemCount = await props.MarketPlaceContract.itemCount()
      console.log(itemCount)
      const itemsList = []
      for (let i = 1; i <= itemCount; i++) {
        const item = await props.MarketPlaceContract.items(i)
        console.log(item)
        const uri = await props.NFTContract.tokenURI(item.tokenIdInNFT)
        const totalPrice = await props.MarketPlaceContract.getTotalPrice(item.itemIdInMarketplace)

        if((props.account as string).toLowerCase() === item.owner.toLowerCase()){
          console.log(item.owner)
          console.log(props.account)
          itemsList.push({
            inListItemId: item.itemIdInMarketplace,
            inListTokenIdInNFT: item.tokenIdInNFT,
            uri: uri,
            price: totalPrice.toString(),
          })
        }
      } 
     const Cards = itemsList.map((item:any) => {
      return <Card key={item.itemIdInMarketplace} isInventory={true} src={"https://ipfs.io/ipfs/"+item.uri} alt="image" name={item.inListTokenIdInNFT.toString()} price={item.price.toString()} width="300" height="300"/>
    }); 
    return Cards;
    }
    items().then((res:any) => {
      setCards(res)
    })
  },[props])
  



      const navbarText = ["Hepsi", "Tarih", "Spor", "Bilim", "Müzik"];
      const navbar = navbarText.map((text:any) => (
        <button
          key={text}
          className="text-white hover:bg-red-600 px-4 rounded-xl py-2.5 text-xl"
        >
          {text}
        </button>
      ));

    return (
    <div>
            <div className="flex py-2 overflow-x-auto mx-12">{navbar}</div>
        <div className="grid grid-cols-5 gap-6 w-full bg-gray-800 px-16 py-8 min-h-[50vh]" >
            {Cards}
        </div>
    </div>
        )
}