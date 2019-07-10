var inputDom = document.querySelector("#write");
var todoList = document.querySelector(".todo .clist");
var doneList = document.querySelector(".done .clist");
var todoNumSpan = document.querySelector(".todo .num");
var doneNumSpan = document.querySelector(".done .num");
var main = document.querySelector(".main")

var dataList = localStorage.dataList?JSON.parse(localStorage.dataList):[];
renderList();

inputDom.onkeypress = function(e){
	if(e.key=="Enter"&&inputDom.value!=""){
		var data = {
			content:inputDom.value,
			type:"todo"
		}
		dataList.push(data);
		renderList();
	}
}

function renderList(){
	localStorage.dataList = JSON.stringify(dataList);
	var todoNum = 0;
	var doneNum = 0;
	todoList.innerHTML="";
	doneList.innerHTML="";
	dataList.forEach(function(item,index){
		var newDiv = document.createElement("div")
		newDiv.className="item"
		if(item.type=="todo"){
			todoNum++;
			newDiv.innerHTML = `
				<span class="checkbox">
					<input type="checkbox" name="check"  value="" data-index="${index}"  />
				</span>
				<span class="content">
					${item.content}
				</span>
				<div class="delete" data-index="${index}"></div>
			`;
			todoList.appendChild(newDiv)
		}else{
			doneNum ++;
			newDiv.innerHTML = `
				<span class="checkbox">
					<input type="checkbox" name="check" checked="checked"  value="" data-index="${index}"/>
				</span>
				<span class="content">
					${item.content}
				</span>
				<div class="delete" data-index="${index}"></div>
			`;
			doneList.appendChild(newDiv)
		}
	});
	todoNumSpan.innerHTML = todoNum
	doneNumSpan.innerHTML = doneNum
}

todoList.onchange = function(e){
	dataList[e.target.dataset.index].type="done";
	renderList();	
}
doneList.onchange = function(e){
	dataList[e.target.dataset.index].type="todo";
	renderList();	
}

/*main.onclick = function(e){
	if(e.target.className=="delete"){
		var index = e.target.dataset;
		dataList.splice(index,1);
		renderList();
	}
}*/

main.addEventListener("click",function(e){
	if(e.target.className=="delete"){
		var index = e.target.dataset;
		dataList.splice(index,1);
		renderList();
	}
})