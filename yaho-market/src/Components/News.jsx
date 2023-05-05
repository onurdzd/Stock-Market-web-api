const News = ({ item }) => {
    const {link,publisher,title,relatedTickers,thumbnail,type}=item
  return (
    <div>
      <div>{link}</div>
      <div>{publisher}</div>
      <div>{title}</div>
      <div>{relatedTickers}</div>
      <div>
        <img
          src={thumbnail?.resolutions[0].url}
          alt="logo"
          className="w-1/2"
        ></img>
      </div>
      <div>{type}</div>
    </div>
  );
};

export default News;
