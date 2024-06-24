let userInfo = document.querySelector(".user .info")
let gachaResult = document.querySelector(".result .gacha")
let gachaBtn = document.querySelector(".panel .gacha button")
let gachaChances
let data = {
	user: {
		amount: 1000,
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
function gacha() {
	if (data.user.amount / data.gacha.rate < 1) {
		return
	}
	refill()
	shuffle()
	let capsule = data.gacha.pool.shift()

	if (!capsule) return
	gachaResult.innerHTML = `<span class="capsule capsule-${capsule.type}">${capsule.id}</span>`
	data.user.amount -= data.gacha.rate
	syncUser()
	console.log(ObjectSizes(data.gacha.pool), data.user.amount / data.gacha.rate)
	if (data.user.amount / data.gacha.rate < 1) {
		gachaChances.remove()
	} else
		gachaChances.innerHTML = pettify(data.user.amount / data.gacha.rate)
}
function syncUser() {
	userInfo.innerHTML = `Wallet: $ ${data.user.amount}`
}
function preload() {
	syncUser()

	if (data.user.amount / data.gacha.rate < 1) {}
	else {
		gachaBtn.innerHTML += `
	        <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
	            ${pettify(data.user.amount / data.gacha.rate)}
	        </span>
		`
		gachaChances = gachaBtn.querySelector(".badge")
	}

}
function ObjectSizes(obj) {
	let len = 0
	for (let objKey in obj) {
		len++
	}
	return len
}

preload()
