const timesheet = [];
const formTimeEntry = document.getElementById("formTimeEntry"); 

formTimeEntry.addEventListener("submit", handleSubmit);

function handleSubmit(e) {
    e.preventDefault();
    const data = new FormData(e.target);
    const props = Object.fromEntries(data);
    console.log(props);
    addTimeEntry(props.name, props.projectId, props.projectName, props.task, props.date, props.hours, props.description);
    document.getElementById("totalHours").innerHTML = "Total Hours: " + getTotalHours();
    showTimesheet();
  }
  

function addTimeEntry(name, projectId, projectName, task, date, hours, description) {
    timesheet.push({
        name: name,
        projectId: projectId, 
        projectName: projectName, 
        task: task, 
        date: date, 
        hours: hours, 
        description: description
    });
    console.log(timesheet.length);
}

function getTotalHours() {
    var hours = 0;
    timesheet.forEach(function(entry) {
        hours += +entry.hours;
    });
    return hours;
}

function deleteEntry(i) {
    timesheet.splice(i, 1);
    showTimesheet();
}

function taskToDisplay(task) {
    if (task.length <= 30) {
        return task
    }
    return task.slice(0, 27) + '...';
}

function showTimesheet() {
    const tableBody = document.getElementById("tableBody");
    tableBody.innerHTML = "";
    timesheet.forEach(function(entry, i) {
        tableBody.innerHTML += "<tr><td>" + taskToDisplay(entry.task) + "</td><td>" + entry.date + "</td><td>" + entry.hours + "</td><td><button class=\"btn btn-danger btn-sm\" onclick=\"deleteEntry(" + i + ")\">Delete</button></td></tr>"
    })
}
