var bodyEl = $("body");

class subTask{
    name;
    isComplete;
}

class task{
    title;
    dueDate;
    notes;
    subTasks = [];
    repeatEveryXdays;
    dateMade;
    latestDate;
}



$( "#taskModal" ).dialog({ 
    autoOpen: false 
});

$(".add-task-btn").on("click", function(){
    $( "#taskModal" ).dialog( "open" );
});

$("body").on("click",".close-modal-btn", function(){
    $( "#taskModal" ).dialog( "close" );
});

var modalCloseButtonIconEl = $("<span>").addClass("oi oi-x");
var modalCloseButtonEl = $("<button>").addClass("close-modal-btn");
var modalHeaderEl = $(".ui-dialog-titlebar");

modalCloseButtonIconEl.appendTo(modalCloseButtonEl);
modalCloseButtonEl.appendTo(modalHeaderEl);


