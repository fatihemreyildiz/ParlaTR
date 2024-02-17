
import Image from "next/image";


export default function NFTPage(props:any) {
  return (
    <div>
      <div className="flex flex-col mx-16 h-[60vh]">
        <div className="flex flex-row h-full mb-8">
          <img
            src="https://picsum.photos/1920/1080"
            className="w-1/3 rounded-lg mx-5 h-full"
            alt="Tatlı irem"
          />
          <div className="flex flex-col text-white">
            <h2 className="text-4xl text-center text-red-600">
              İrem çok çok çok çok tatlı{" "}
            </h2>
            <br />
            <p className="text-xl w-2/3 mx-auto text-gray-300">
              {" "}
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla
              voluptatem doloribus aperiam suscipit! Excepturi nulla suscipit
              dolore alias architecto aliquam maiores culpa quia neque saepe.
              Provident vitae explicabo incidunt ea. Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Nulla voluptatem doloribus aperiam
              suscipit! Excepturi nulla suscipit dolore alias architecto aliquam
              maiores culpa quia neque saepe. Provident vitae explicabo incidunt
              ea. Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla
              voluptatem doloribus aperiam suscipit! Excepturi nulla suscipit
              dolore alias architecto aliquam maiores culpa quia neque saepe.
              Provident vitae explicabo incidunt ea.
            </p>
            <button className="border border-black bg-red-600 w-1/6 text-xl px-3 py-2 rounded-lg shadow-lg mx-auto mt-4 ">
              {" "}
              ALBENİ
            </button>
            <button></button>
          </div>
        </div>
      </div>
    </div>
  );
}
