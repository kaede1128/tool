let userInfo = document.querySelector(".user .info")
let gachaResult = document.querySelector(".result .gacha")
let gachaPanel = document.querySelector(".panel .gacha")
let gachaChances
let data = {
	user: {
		amount: 2500,
		count: 50,
	},
	gacha: { // toy capsule vending machine
		rate: 100,
		drops: {
			1: 40,
			2: 32,
			3: 16,
			4: 10,
			5: 2,
		},
		pool: [
			{id: '100001', type: 1},
			// {id: '100002', type: 1},
			// {id: '100003', type: 1},
			// {id: '100004', type: 1},
			// {id: '100005', type: 1},
			// {id: '100006', type: 1},
			// {id: '100007', type: 1},
			// {id: '100008', type: 1},
			// {id: '100009', type: 1},
			// {id: '100010', type: 1},
			// {id: '100011', type: 1},
			// {id: '100012', type: 1},
			// {id: '100013', type: 1},
			// {id: '100014', type: 1},
			// {id: '100015', type: 1},

		]
	},
	event: {

	},
	characters: {
		"500001": {
			name: "500001",
			type: 5,
		}, 
		"500002": {
			name: "500002",
			type: 5,
		}, 
		"400001": {
			name: "400001",
			type: 4,
		}, 
		"400002": {
			name: "400002",
			type: 4,
		}, 
	}
}
/**
 * -.
 * 1. 每個物品的機率 當然可以調
 * 2. 每個物品每天能出的數量上限 到達後當天(時間也可為小時)再出機率為零
 * 3. 指定特殊的時間或日期才會出相對應的道具
 * 4. 可以單一或批次輸入下次轉蛋一定會抽中某道具的玩家
 * 5. 可以單一或批次輸入某些玩家使用不同的機率表
 * 6. 可以設定當天(時間也可為小時)針對各種道具抽中數量的歸零或是自動增加
 * 7. 可以直接更新或刪除某一筆轉蛋的紀錄
*/

function pettify(val) {
	return val > 100 ? "99+" : Math.floor(val)
}
function toDigit(num, digit=5) {
	let str = ""
	for (let i = String(num).length; i < digit; i++) {
		str += "0"
	}
	return str + num
}
function capsule(type, i=1) {
	return {
		id: `${type}${toDigit(i)}`,
		type: type,
	}
}
function shuffle() {
	let pool = data.gacha.pool
	pool.forEach(c => c.sort = Math.random())
	pool.sort( (a, b) => a.sort - b.sort)

}
function refill() {
	let pool = data.gacha.pool
	let len = 0
	for (let poolKey in pool) {
		len++
	}
	if (ObjectSizes(pool) > 10) return
	for (let key = 1; key <= 5; key++) {
		for (let i = 1; i <= data.gacha.drops[key]; i++) {
			pool.push(capsule(key, i))
		}
	}
	shuffle()
	console.log(pool)
}
function gacha(times = 1) {
	if (data.user.amount / data.gacha.rate < times) {
		return
	}
	gachaResult.innerHTML = ""
	for (let i = 0; i < times; i++) {
		refill()
		shuffle()
		let capsule = data.gacha.pool.shift()

		if (!capsule) return
		gachaResult.innerHTML += `<span class="capsule capsule-${capsule.type}">${capsule.id}</span>`

	}
	data.user.amount -= data.gacha.rate*times
	syncUser()
}

function syncUser() {
	userInfo.innerHTML = `Wallet: $ ${data.user.amount}`
	let chances = [1, 10]
	chances.forEach((v,i) => {
		if (data.user.amount / data.gacha.rate < v) {
			if (gachaPanel.querySelectorAll(".btn .badge")[i])
			gachaPanel.querySelectorAll(".btn .badge")[i].remove()
			gachaPanel.querySelectorAll(".btn")[i].classList.add("btn-secondary")
		} else {
			gachaPanel.querySelectorAll(".btn")[i].querySelector(".badge").innerHTML = pettify(data.user.amount / data.gacha.rate / v)
			gachaPanel.querySelectorAll(".btn")[i].classList.remove("btn-secondary")
		}
	})
}
function preload() {
	if (data.user.amount / data.gacha.rate < 1) {}
	else {
		let chances = [1, 10]
		gachaPanel.innerHTML = ""
		chances.forEach((v,i) => {
			gachaPanel.innerHTML += `
			<button onclick="gacha(${v})" type="button" class="btn btn-primary position-relative">
                Gacha
            </button>
			`
			gachaPanel.querySelectorAll(".btn")[i].innerHTML += `
	        <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
	            ${pettify(data.user.amount / data.gacha.rate / v)}
	        </span>
		`
		})
	}
	syncUser()

}
function ObjectSizes(obj) {
	let len = 0
	for (let objKey in obj) {
		len++
	}
	return len
}

preload()
