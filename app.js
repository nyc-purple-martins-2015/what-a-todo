function Task(args) {
  args = args || {};
  this.taskName = args.taskName;
  this.done = args.done;
}

function TodoList(tasks) {
  tasks = tasks || [];
  this.tasks = tasks;
}

TodoList.prototype.addTask = function(task) {
  this.tasks.push(task);
};

function View(element) {
  this.element = element;
  this.setupHandlers();
}

View.prototype.drawTasks = function(todoList) {
  var content = '';
  for (var i = 0; i < todoList.tasks.length; i++) {
    var task = todoList.tasks[i];
    content += '<li><span>';
    content += task.taskName;
    content += '</span><input type="checkbox" ';
    content += task.done ? 'checked="checked>"' : '">';
    content += '</li>';
  }
  this.element.innerHTML = content;
};

View.prototype.setupHandlers = function() {
  var form = document.getElementById('new_task_form');
  form.addEventListener('submit', function(event){
    event.preventDefault();
    var taskName = document.getElementById('task_name').value;
    var taskDone = document.getElementById('task_done').checked;
    var params = { taskName: taskName, done: taskDone };
    this.controller.addTask(params);
    form.reset();
  }.bind(this));
};

function Controller(view, todoList) {
  this.view = view;
  this.todoList = todoList;
}

Controller.prototype.addTask = function(params) {
  var t = new Task(params);
  this.todoList.addTask(t);
  this.view.drawTasks(this.todoList);
};

document.addEventListener('DOMContentLoaded', function(event){
  var list = new TodoList();
  var element = document.getElementById('task-list');
  var view = new View(element);
  var controller = new Controller(view, list);
  view.controller = controller;

  list.addTask(new Task({taskName:'steven', done:false}));
  list.addTask(new Task({taskName:'buy milk', done:false}));
  list.addTask(new Task({taskName:'get a dog', done:false}));

  view.drawTasks(list);
});
