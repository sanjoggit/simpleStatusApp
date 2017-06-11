

	const body = document.body;
	const statusBox = document.querySelector('input[type=text]');
	const dark_background = document.querySelector('.dark_background');
	const statusForm = document.querySelector('.statusForm');
	const item = document.querySelector('.media-item');
	const button = document.getElementById('btn');
	const statusLists = JSON.parse(localStorage.getItem('statusLists') || []);
	const raj = document.querySelector('.raj');
	//for edit box
	const editBox = document.querySelector('.editName');
	//edit box ended

	fillList(statusLists);

	function test(){
		if(body.scrollTop>20){
			statusForm.classList.add('sanjog');
		} else{
			statusForm.classList.remove('sanjog');
		}
	}
	window.onscroll = function() {test()};

	function validCheck(){
		button.removeAttribute('disabled');
	}

	function adddark_background(){
		body.classList.add('show-floater');
	}
	function removedark_background(){
		body.classList.remove('show-floater');
	}

	
	function addStatus(e){
		e.preventDefault();
		const status = statusBox.value;
		var d = new Date();
		var day = d.getDate();
		var mth = ["Jan","Feb","Mar","Apr","May","Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
		var date = mth[d.getMonth()]+" "+day+" at"+d.getHours()+':'+d.getMinutes();
		console.log(e);
		const item = {
			name: status,
			date: date

		}
		statusLists.unshift(item);
		fillList(statusLists);
		storeStatus(statusLists);
		statusForm.reset();
	}

	function fillList(statusLists = []){
		
		const itemsHtml = statusLists.map(
			(item, index)=>{
				return `
					<div class="media">
						<div class="media-left">
							<img src="img/bridge.jpeg" class="media-object img-responisve">
						</div>
						<div class="media-body" data-id=${index}>
							<h4 class="media-heading">${item.name}<small><i> Posted on ${item.date}</i></small></h4>
							<button class="btn btn-primary pull-right edit">Edit</button>
							<p>This is paragraph</p>
							<button class="btn btn-danger pull-right delete">Delete</button>
						</div>
					</div>
				`;
			}
		).join('');

		item.innerHTML = itemsHtml;
	}

	function removeStatus(e){
		if(e.target.matches('.delete')){
			const index = e.target.parentNode.dataset.id;
			statusLists.splice(index, 1);
			fillList(statusLists);
			storeStatus(statusLists);

		}
	}
	function editItem(e){

		if(e.target.matches('.edit')){
			const toEdit = e.target.parentNode.parentElement.childNodes[3].childNodes[1].childNodes[0].data;
			editBox.innerHTML = `<textarea class="form-control edit-box">${toEdit}</textarea>`;
			editedText = editBox.innerHTML;
			console.log(editedText, e);
			//console.log(editBox.innerHTML);
		}
	}

	function storeStatus(statusLists=[]){
		localStorage.setItem('statusLists', JSON.stringify(statusLists));
	}

	

	statusBox.addEventListener('click', adddark_background);
	statusBox.addEventListener('input', validCheck);
	dark_background.addEventListener('click', removedark_background);
	statusForm.addEventListener('submit', addStatus);
	item.addEventListener('click', removeStatus);
	item.addEventListener('click', editItem);