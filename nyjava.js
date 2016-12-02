$(document).ready(function(){


// Code for the dropdown list
$("#somelist li").click(function(){

    //sets button text
   $("#label").text($($(this).find("a")).text())

    //removes isSelected class
    $("#somelist li a").removeClass("isSelected");

    //add isSlected Class to clicked element
    $($(this).find('a')).addClass("isSelected")
    
    $("#numberRecordsButton").html($($(this).find("a")).text());
})


$("#searchButton").click(function(event){
    event.preventDefault();
    
    var search = $("#searchTermBox").val().trim();
    var beginDate = $("#startYear").val().trim();
    var endDate = $("#endYear").val().trim();
    // var tempRecords = 5;
    // not working properly # of records button
    var recordsShow = $("#numberRecordsButton").text();
    
    console.log("Records button: "+recordsShow);
   
    // var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
    // url += '?' + $.param({
    //   'api-key': "e696e8df7f4c4a83b7091881b9a12103",
    //   'q': search 
    //   // 'begin_date': beginDate
    //   // 'end_date': end_date + ","
    //   // 'page':
    // });
    // http://api.nytimes.com/svc/search/v2/articlesearch.json?fq=romney&begin_date=20120101&end_date=20120101&api-key=e696e8df7f4c4a83b7091881b9a12103
    var baseURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?";
    var newApiKey = "e696e8df7f4c4a83b7091881b9a12103";
    // var queryURL = baseURL+"q="+search+"&begin_date="+beginDate+"&end_date="+endDate+"&api-key="+newApiKey;
    var queryURL = baseURL+"q="+search;
    
    if($("#startYear").val().length === 0){
    	console.log("Beginning date is empty");
    	
    }
    else{
    	queryURL += "&begin_date="+beginDate+"0101";
    	console.log("begin date NOT EMPTY");
    }
    if($("#endYear").val().length === 0){
    	console.log("End Date is empty")
    	
    }
    else{
    	queryURL += "&end_date="+endDate+"0101";
    }
    queryURL += "&api-key="+newApiKey;
    console.log("newtry "+queryURL);

    $.ajax({
    url: queryURL,
    method: 'GET',
    }).done(function(result) {
    	// console.log(url);
        //Display articles in below area
        // console.log(result);
        // console.log(result.response.docs[0].headline.main);
        // console.log(result.response.docs[0].web_url);
        // console.log(result.response.docs[0].snippet);
        $("#articlesHere").html("");

        for(var i = 0; i < recordsShow; i++){
        	var newArticle = $("<div>");
        	var articleURL = result.response.docs[i].web_url;
        	console.log("Record"+i+ ": "+articleURL);
        	newArticle.append('<a href="'+ articleURL+ '">'+"<h3>"+result.response.docs[i].headline.main+"</h3></a>");
        	newArticle.append("<p>"+result.response.docs[i].snippet+"</p>");
        	// Future CSS styling
        	newArticle.addClass("newArticleStyle");
        	// newArticle.wrap(articleURL);
        	
        	// newArticle.wrap('<a href="'+articleURL+'"></a>');
        	$("#articlesHere").append(newArticle);

        }


        // $("#articlesHere").append(result.response.docs[0].headline.main);

    }).fail(function(err) {
      throw err;
    });
}); // end of search button

$("#clearButton").click(function(event){
	event.preventDefault();
	// console.log("hello");
	$("#articlesHere").empty();
}); // end of clear results button


}); // end of document ready