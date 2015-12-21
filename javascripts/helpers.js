function ratesParse(url, currencyCodeRequest, fixRate) {
  
 var feed = UrlFetchApp.fetch(url).getContentText();
 var items = getItems(feed);
 var notFound = true;
 var i = items.length - 1;
 
 while ((i > -1)&&(notFound)) {
    var item = items[i--];
    var date = item.getChildText('pubDate');
    var currencyCode = item.getChildText('title');
    
    if (currencyCode == currencyCodeRequest)
      {
        notFound = false;    
        var currencyRate = item.getChildText('description');
      }
  }
  
  var percent = fixRate * 100 / currencyRate;
  var different = (100 - percent);
  var result = "Курс НБРК на дату " + date + " составляет " + currencyRate + " тг. Потеря в з/п " + percent + " процентов.";
  return result;
}

function getItems(feed) {
  var doc = XmlService.parse(feed);
  var root = doc.getRootElement();
  var channel = root.getChild('channel');
  var items = channel.getChildren('item');
  return items;
}
