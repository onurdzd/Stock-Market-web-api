import axios from "axios";
import { useState } from "react";
import { PORT } from "../config/config";
import News from "./Components/News";

function App() {
  const [data, setData] = useState();
  const [result, setResult] = useState([]);

  const request = async (e) => {
    e.preventDefault();
    await axios
      .get(`http://localhost:${PORT}/api/ask/${data}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setResult(res.data.message);
      })
      .catch((err) => console.log(err));
  };
  console.log(result);
  return (
    <>
      <div>
        <form onSubmit={(e) => request(e)}>
          <label>
            Hisse İsmi
            <input onChange={(e) => setData(e.target.value)}></input>
          </label>
          <button type="submit">Getir</button>
        </form>
        <div>
          {result.map((item, i) => 
            <div key={i}>
            <News item={item}></News>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
