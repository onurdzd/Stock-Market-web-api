import gpt from "../assets/gpt.jpg";

const News = ({ item }) => {
  const { link, publisher, title, thumbnail, providerPublishTime } = item;

  const imageOnError = (e) => {
    console.log("hata");
    e.target.src = gpt;
  };

  const timeCheck=(x)=>{
    let time = Date(x)
    let arrayTime=[...time]
    let sonuc=[]
    for (let i=0 ; i<28;i++){
        sonuc.push(arrayTime[i])
    }
    return sonuc.join("")
  }

  return (
    <>
      <div className="text-xs mb-1 font-medium italic">{timeCheck(providerPublishTime)}</div>
      <div className="text-blue-700 font-semibold hover:text-slate-500">
        <a href={link}>Haber Linki</a>
      </div>
      <div>
        <span className="text-blue-700 font-semibold italic">Yayınlayan: </span>
        <span className="italic">{publisher}</span>
      </div>
      <div className="font-bold">{title}</div>
      <div className="max-w-md my-2 mx-auto">
        <img
          className="w-full h-full"
          src={thumbnail ? thumbnail.resolutions[0].url : gpt}
          onError={imageOnError}
          alt="Haber Resmi"
        ></img>
      </div>
    </>
  );
};

export default News;
