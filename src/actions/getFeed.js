

export const getNews = async() =>{
  return  fetch("http://newsapi.org/v2/everything?q=bitcoin&from=2020-06-22&sortBy=publishedAt&apiKey=143c7e160135491f80221dd87e1450a0", {
	"method": "GET", 
})
    .then((res)=>{
        return res.json();
    })
    .then((res)=>{ 
        return res;
    })
}