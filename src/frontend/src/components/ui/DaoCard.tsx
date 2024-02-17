import Image from "next/image";

export default function DaoCard(props: any) {
  return (
    <div className=" bg-gray-800 w-full h-full" > 
    <div className="border-black border bg-gray-700  flex flex-col " > 
    <h1 className='text-2xl text-red-700 text-center my-3'>halim  </h1>
    <img src="https://picsum.photos/1920/1080" className='w-1/2 mx-auto my-3' alt="" /> 
    <p className='w-1/2 mx-auto'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore obcaecati, neque quas dignissimos eum, ullam quo, omnis provident aliquam repellendus quibusdam. Nobis, dignissimos? Esse corporis fugiat voluptates ipsam dolorem beatae.</p>
    <div className='flex flex-row justify-around w-1/2 mx-auto my-3'> 
    <button className='text-xl py-2.5 px-5 bg-green-600 border-green-700 hover:bg-gray-500  border rounded-lg shadow-lg'>evet</button>
    <button className='text-xl py-2.5 px-5 bg-red-600 border-red-700 hover:bg-gray-500  border rounded-lg shadow-lg'>hayır</button>
    </div>
    </div>
    </div>
  );
}
