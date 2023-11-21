let count = 0
window.onload = function() {
	document.getElementById('btnEvaluate').disabled = true
	let dragzone = document.getElementById("dropzone")

	dragzone.addEventListener('dragover', (e) => {
		dragzone.classList.add("dropzone-hover")
	    e.preventDefault()
	});
	dragzone.addEventListener('dragleave', (e) => {
		dragzone.classList.remove("dropzone-hover")
	    e.preventDefault()
	});
	dragzone.addEventListener('drop', (e) => {
		dragzone.classList.remove("dropzone-hover")
	    document.getElementById('file').files = e.dataTransfer.files;
		var files = document.getElementById('file').files;
		if (files.length > 0) {
			document.getElementById('btnEvaluate').disabled = false
		}
	    e.preventDefault()
	});

	document.getElementById('btnEvaluate').addEventListener('click', function() {
		var files = document.getElementById('file').files;
		for (let i = 0; i < files.length; i++) {
			getBase64(files[i])
		}
	});

	document.getElementById('btnClear').addEventListener('click', function() {
		document.getElementById('result').innerHTML = "";
	});
}

function getBase64(file) {
	var reader = new FileReader();
	reader.readAsDataURL(file);
	reader.onload = function() {
		// console.log(reader.result);
		let _m = document.createElement("img") // 預覽base64圖
		_m.src = reader.result
		_m.alt = file.name

		let _r = document.createElement("input") // 結果
		const input_id = document.createAttribute("id")
		input_id.value = `input${count}`
		_r.setAttributeNode(input_id)
		_r.classList.add("resultItem")
		_r.value = reader.result

		let _b = document.createElement("button") // COPY掣
		const btn_id = document.createAttribute("id")
		btn_id.value = `btn${count}`
		_b.setAttributeNode(btn_id)
		_b.innerText = "Copy"

		document.getElementById('result').appendChild(_m)
		document.getElementById('result').appendChild(_r)
		document.getElementById('result').appendChild(_b)

		_b.addEventListener('click', ()=>{ copyme(input_id.value) }) 

		count++
	};
	reader.onerror = function(error) {
		console.log('Error: ', error);
	};
}

function copyme(field_name) {
  let copyText = document.getElementById(field_name);
  copyText.select();
  copyText.setSelectionRange(0, 99999);
  navigator.clipboard.writeText(copyText.value);
  
  // var tooltip = document.getElementById("myTooltip");
  // tooltip.innerHTML = "Copied: " + copyText.value;
}

function outFunc() {
  var tooltip = document.getElementById("myTooltip");
  tooltip.innerHTML = "Copy to clipboard";
}