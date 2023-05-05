import gpt from "../assets/gpt.jpg";

const News = ({ item}) => {
  const { link, publisher, title, thumbnail, type } = item;

  const imageOnError = (e) => {
    console.log("hata")
    e.target.src=gpt
  };

  return (
    <>
      <div  className="text-blue-700 font-semibold hover:text-slate-500">
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
