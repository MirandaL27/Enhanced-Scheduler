var bodyEl = $("body");
var checklistCounter = 0;
class subTask{
    name;
    isComplete;
}

class task{
    title;
    dueDate;
    dueTime;
    notes;
    subTasks = [];
    repeatEveryXdays;
    dateMade;
    latestDate;
    status;
}

var tasks = [];

var setSecondaryModalDropDown = function(ddValue){
    var origInput = $("#x-days");
    var spanEl = $(".days-word");

    if(ddValue == "Daily"){
        //every x number of days

       var inputEl = $("<input>").addClass("x-days");
       inputEl.attr("id","x-days");
       inputEl.type = "text";
       spanEl.text("days.");
        origInput.replaceWith(inputEl);
    }
    else{
        //every weekday

        var inputEl = $("<select>").addClass("x-days");
        inputEl.attr("id","x-days");
        var optionEl = $("<option>").text("Weekday");
        optionEl.attr("selected", "selected");
        optionEl.attr("disabled", "disabled");
        optionEl.attr("hidden", "hidden");
        optionEl.appendTo(inputEl);
        optionEl = $("<option>").text("Sunday");
       optionEl.appendTo(inputEl);
       optionEl = $("<option>").text("Monday");
       optionEl.appendTo(inputEl);
       optionEl = $("<option>").text("Tuesday");
       optionEl.appendTo(inputEl);
       optionEl = $("<option>").text("Wednesday");
       optionEl.appendTo(inputEl);
       optionEl = $("<option>").text("Thursday");
       optionEl.appendTo(inputEl);
       optionEl = $("<option>").text("Friday");
       optionEl.appendTo(inputEl);
       optionEl = $("<option>").text("Saturday");
       optionEl.appendTo(inputEl);
        origInput.replaceWith(inputEl);
        spanEl.text("");
    }
    return;
}

var addChecklistItem = function(){
    var id = "checklist-item" + checklistCounter; 
    var divEl = $(".checklist-div");
    var inputEl = $("<input>");
    inputEl.type = "text";
    inputEl.addClass("checklist-item");
    inputEl.attr("id",id);
    var labelEl = $("<label>");
    labelEl.attr("for",id);
    labelEl.appendTo(divEl);
    inputEl.appendTo(divEl);
    checklistCounter++;
    labelEl.text("Checklist Item " + checklistCounter + ":");
    return;
}

var resetModal = function(){
    //delete checklist items
    //change drop down to daily
    //reset checklistcounter to 0
    //make all input items blank
    //make date blank
    $( "#taskModal" ).dialog( "close" );
    return;
}
var validateModalInput = function(title){
    //validate the task use input.
    if(!title){
        alert("Task title is required.");
        return false;
    }
    return true;
}

var updateMainTaskList = function(){
    var taskContainerEl = $(".tasks-container");
    var newTaskContainerEl = $("<div>");
    newTaskContainerEl.addClass("tasks-container");
    for(var i= 0; i< tasks.length; i++){
        //make a new div element for each task.
        //show the title, edit/delete buttons, and status update dropdown
        var divEl = $("<div>");
        divEl.addClass("main-tasks row justify-content-center text-center align-items-center");

        var spanEl = $("<span>").addClass("oi oi-task col-1");
        spanEl.appendTo(divEl);

        var pEl = $("<p>");
        pEl.addClass("col-4 small")
        pEl.text(tasks[i].title);

        var deleteBtn = $("<button>");
        deleteBtn.attr("id","task-item-delete-btn");
        deleteBtn.addClass("col-1 position-relative m-1")
        deleteBtn.attr("style","height: 30px");
        var spanEl = $("<span>").addClass("oi oi-trash");
        spanEl.attr("style", "position: absolute; top: 5px; left: 7px;");
        spanEl.appendTo(deleteBtn);

        var editBtn = $("<button>");
        editBtn.attr("id","task-item-edit-btn");
        editBtn.addClass("col-1 position-relative m-1");
        editBtn.attr("style","height: 30px");
        spanEl = $("<span>").addClass("oi oi-wrench");
        spanEl.attr("style", "position: absolute; top: 5px; left: 6px;");
        spanEl.appendTo(editBtn);

        var statusDD = $("<select>");
        statusDD.addClass("col-3 small p-0 m-1 status-dd");
        var optionEl = $("<option>").text("Pending");
        optionEl.appendTo(statusDD);
        optionEl = $("<option>").text("In Progress");
        optionEl.appendTo(statusDD);
        optionEl = $("<option>").text("Completed");
        optionEl.appendTo(statusDD);

        pEl.appendTo(divEl);
        deleteBtn.appendTo(divEl);
        editBtn.appendTo(divEl);
        statusDD.appendTo(divEl);
        divEl.appendTo(newTaskContainerEl);
        
    }
    taskContainerEl.replaceWith(newTaskContainerEl);
    return;
}

var loadTasks = function(){
    var storage =  JSON.parse(localStorage.getItem("scheduler-tasks"));
    if(storage){
        tasks = storage;
    }
}

var addTask = function(){
    //capture all of the items on the form and put them into a task object and add the task object to the tasks array.
    var title = $("#taskTitle").val();
    
    if(validateModalInput(title)){
        resetModal();
    }
    var notes = $("#taskNotes").val();
    var date = $("#taskDueDate").val();
    console.log(title, notes, date);

    var t = new task;
    t.title = title;
    t.notes = notes;
    t.status = "Pending"
    //start with just saving the notes and the title. To Do: save the other fields
    tasks.push(t);
    localStorage.setItem("scheduler-tasks",JSON.stringify(tasks));
    updateMainTaskList()
    return;
}

$( "#taskModal" ).dialog({ 
    autoOpen: false 
});

$(".add-task-btn").on("click", function(){
    $( "#taskModal" ).dialog( "open" );
});

$("body").on("click",".close-modal-btn", function(){
    resetModal();
});

$("body").on("change","#repeat-select", function(){
    setSecondaryModalDropDown($(this).val());
});

$("body").on("click", "#add-checklist-btn", function(event){
    event.preventDefault();
    addChecklistItem();
});

$("body").on("click", "#add-task-modal-btn", function(event){
    event.preventDefault();
    addTask();

});


var modalCloseButtonIconEl = $("<span>").addClass("oi oi-x");
var modalCloseButtonEl = $("<button>").addClass("close-modal-btn");
var modalHeaderEl = $(".ui-dialog-titlebar");

modalCloseButtonIconEl.appendTo(modalCloseButtonEl);
modalCloseButtonEl.appendTo(modalHeaderEl);

loadTasks();
updateMainTaskList();
