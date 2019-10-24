

// GRABS URL FORM PARAM

$(function getUrlVars() {
	    var vars = {};
	    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
	        vars = value;
	    });
	    console.log(vars);

// CALLS FUNCTION DEPENDING ON FORM URL PARAM
			if(vars == "all"){
				allUsers();
			}if (Object.keys(vars).length == 0){
				allUsers();
			}
			else{
				singleUsers(vars);
			}

// RETRIEVE API DATA

function getJSON(url) {
			var resp ;
			var xmlHttp ;
			resp  = '' ;
			xmlHttp = new XMLHttpRequest();
			if(xmlHttp != null)
			{
					xmlHttp.open( "GET", url, false );
					xmlHttp.send( null );
					resp = xmlHttp.responseText;
			}
			return resp ;
	}

// DISPLAYS ALL USERS ON PAGE WHEN SELECTED
	 function allUsers(){
		// CALLS FUNCTION TO GET API DATA
		var list = getJSON("http://localhost:3000/api/todos");

		// GETS ALL USERS
		var parsed = JSON.parse(list);
		// SORT DESCENDING ALL USERS
		let SortDescendingAllusers = parsed.slice(0).sort((a,b) => b.id - a.id);
		// COUNT COMPLETED
		var countAllCompletedUsers = SortDescendingAllusers.filter(function(element) {
 		   return element.completed;
 	  }).length;

		// COUNT TOTAL TODO
		var todoLengthAll = SortDescendingAllusers.length;
		var todoLengthAllCompleted = countAllCompletedUsers;

		console.log(SortDescendingAllusers);
		console.log("All To-do: " + todoLengthAll );
		console.log("Completed To-do: " + todoLengthAllCompleted );

		// FOR ALL USERS AND TODO - APPLY HTML TABLE TAGS TO APPEND/DISPLAY WITHIN TABLE
		var itemsAll = [];
		$.each( SortDescendingAllusers, function( key, val ) {

			 itemsAll.push("<tr id =" + key + " > <td>" + val.id + "</td>" + "<td>" + val.title + "</td></tr>" );
			});

			$( "<tbody/>", {
			"class": "list",
			html: itemsAll.join( " " )
		}).appendTo( "#table" );

		$( "#user").append("User: All");
		$( "#total" ).append( " " + todoLengthAll );
		$( "#completed" ).append( " " + todoLengthAllCompleted );

	  }

// SAME FUNCTIONALITY AS ALL USERS BUT SELECT INDIVIDUAL USER

		function singleUsers(i){
		var list = getJSON("http://localhost:3000/api/todos");
		var parsed = JSON.parse(list);
		// FILTER BY USER ID
		var filtered = parsed.filter(a=>a.userId==i);
		// SORT DESCENDING FOR ONE CHOSEN USER
		let SortDescendingOneUser = filtered.slice(0).sort((a,b) => b.id - a.id);
		// CHECK COMPLETED TRUE/FALSE
		var countOneCompletedUser = SortDescendingOneUser.filter(function(element) {
 		   return element.completed;
 	  }).length;

		var todoLengthOneUser = SortDescendingOneUser.length;
		var todoLengthAllCompletedOneUser = countOneCompletedUser;

		console.log(SortDescendingOneUser);
		console.log("All To-do: " + todoLengthOneUser);
		console.log("Completed To-do: " + todoLengthAllCompletedOneUser);

		var itemsOne = [];
		$.each( SortDescendingOneUser, function( key, val ) {

	 		 itemsOne.push("<tr id =" + key + " > <td>" + val.id + "</td>" + "<td>" + val.title + "</td></tr>" );
	 	  });

	 		$( "<tbody/>", {
	 		"class": "list",
	 		html: itemsOne.join( " " )
	 	}).appendTo( "#table" );


		$( "#user").append("User: " + i);
		$( "#total" ).append( " " + todoLengthOneUser );
		$( "#completed" ).append( " " + todoLengthAllCompletedOneUser );

		}

});
