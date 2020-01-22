
var ama = "amazon.ca";
var wal = "walmart.ca";
var arrayer; 
  /* set up XMLHttpRequest */
  var url = "listingdata.csv";
  var oReq = new XMLHttpRequest();
  oReq.open("GET", url, true);
  oReq.responseType = "arraybuffer";
  
  oReq.onload = function(e) {
    var arraybuffer = oReq.response;
  
    /* convert data to binary string */
    var data = new Uint8Array(arraybuffer);
    var arr = new Array(); //has all the values
    
    for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
    var bstr = arr.join("");
  
    /* Call XLSX */
    var workbook = XLSX.read(bstr, {type:"binary"});
  
    /* DO SOMETHING WITH workbook HERE */
    var first_sheet_name = workbook.SheetNames[0];
    /* Get worksheet */
    var worksheet = workbook.Sheets[first_sheet_name];
     arrayer = XLSX.utils.sheet_to_json(worksheet,{raw:true});

   console.log(arrayer);
   var obj = arrayer[0];
  
   console.log(obj);
   console.log (obj.Listings); 
   console.log(arrayer);
   
   var imageval; 

var people = []; 
   for (var i = 0; i < (arrayer.length - 1); ++i){
     var urlval;
     var price; 
    if (i <=2){
        imageval = 'images/amazon.png'
        urlval = 'https://www.amazon.ca' + arrayer[i].URLs;
        console.log("url : " + urlval);
        price = "$"+ (arrayer[i].Prices).substring(0, (arrayer[i].Prices).length-1)+".00"
        

    }
    else if (i <=5){
        imageval = 'images/ebay.png'
        urlval = arrayer[i].URLs;
        console.log(urlval);
        price =  (arrayer[i].Prices).substring(1, (arrayer[i].Prices).length)

    }
    else {imageval = 'images/walmart-square.jpg'
    urlval = 'https://www.walmart.ca' + arrayer[i].URLs;
    console.log("output" + urlval);
    price = "$"+ (arrayer[i].Prices).substring(1, (arrayer[i].Prices).length)


}
       

     var postdata = {
                     id: i,
                     name: (JSON.stringify(arrayer[i].Listings)).substring(1, (JSON.stringify(arrayer[i].Listings)).length -1),
                     role:price, 
                     stream: JSON.stringify(arrayer[i].Worth),
                     description:JSON.stringify(arrayer[i].Bullshit),
                     url: urlval,
                     image_link: imageval,
                     is_favourite: false};
     people.push(postdata);
   }


const replaceHTMLCardTemplate = () => {
    let source = document.getElementById('card-template').innerHTML;
    let template = Handlebars.compile(source);
    let context = { people: people };
    let html = template(context);
    document.getElementById('target').innerHTML = html;
  };

  
  
  replaceHTMLCardTemplate();

  for (var i = 0; i < (people.length); ++i){
    console.log(JSON.stringify(people[i].url));
    document.getElementsByTagName("a")[i].href = people[i].url;
    console.log("url" + i + "changed");
}

  }

  
 oReq.send();



