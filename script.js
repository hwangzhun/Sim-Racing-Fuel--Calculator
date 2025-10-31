(function () {
	// ---- i18n ----
	const I18N = {
		zh: {
			langName: '中文',
			title: '模拟赛车燃油计算器',
			docTitle: '模拟赛车燃油计算器',
			introNote: '快速计算任何模拟赛车游戏（包括 ACC、iRacing、Assetto Corsa Evo、AMS2 等）的正确燃油量。只需输入每圈燃油量、比赛距离和油箱容量，即可查看需要进站次数和起始燃油量。',
			inputsHeader: '输入',
			resultsHeader: '结果',
			lblRaceTime: '比赛时间',
			lblLapTime: '平均单圈时间',
			lblFuelPerLap: '每圈油耗',
			lblTankCapacity: '油箱油量',
			placeholderHours: '小时',
			placeholderMinutes: '分钟',
			placeholderLapMin: '分',
			placeholderLapSec: '秒',
			sufHours: '小时',
			sufMinutes: '分钟',
			sufLapMin: '分',
			sufLapSec: '秒',
			sufFuelPerLap: '升/圈',
			sufTankCapacity: '升',
			btnCalculate: '计算',
			btnReset: '清空',
			lblTotalLaps: '总圈数',
			lblPitStops: '需要进站加油（次数）',
			lblMinFuel: '完赛最低需要燃油量',
			lblSafeFuel: '安全燃油（总圈数+2）',
			lblLapsPerStint: '每段比赛圈数（每箱）',
			lblLastStintLaps: '最后阶段圈数',
			lblStintFuelList: '每段行程的燃油消耗',
			lblLastStintFuel: '最后阶段的燃料量',
			formulaNote: '说明：总圈数按 ⌊比赛总时长 ÷ 平均单圈时间⌋ 计算。',
			cannotCompleteLap: '无法完成一圈（油箱容量过小）',
			unitLiter: '升'
		},
		en: {
			langName: 'English',
			title: 'Sim Racing Fuel Calculator',
			docTitle: 'Sim Racing Fuel Calculator',
			introNote: 'Quickly calculate the right fuel for any sim racing game (ACC, iRacing, Assetto Corsa Evo, AMS2, etc.). Enter fuel per lap, race duration and tank capacity to see pit stops and starting fuel.',
			inputsHeader: 'Inputs',
			resultsHeader: 'Results',
			lblRaceTime: 'Race duration',
			lblLapTime: 'Average lap time',
			lblFuelPerLap: 'Fuel per lap',
			lblTankCapacity: 'Tank capacity',
			placeholderHours: 'Hours',
			placeholderMinutes: 'Minutes',
			placeholderLapMin: 'Min',
			placeholderLapSec: 'Sec',
			sufHours: 'h',
			sufMinutes: 'min',
			sufLapMin: 'min',
			sufLapSec: 'sec',
			sufFuelPerLap: 'L/lap',
			sufTankCapacity: 'L',
			btnCalculate: 'Calculate',
			btnReset: 'Reset',
			lblTotalLaps: 'Total laps',
			lblPitStops: 'Pit stops (count)',
			lblMinFuel: 'Minimum fuel to finish',
			lblSafeFuel: 'Safe fuel (laps+2)',
			lblLapsPerStint: 'Laps per stint (per tank)',
			lblLastStintLaps: 'Last stint laps',
			lblStintFuelList: 'Fuel for first stint',
			lblLastStintFuel: 'Fuel for last stint',
			formulaNote: 'Note: Total laps = ⌊race duration ÷ average lap time⌋.',
			cannotCompleteLap: 'Cannot complete a lap (tank capacity too small)',
			unitLiter: 'L'
		}
	};

	let currentLocale = 'zh';

	function detectLocale() {
		const saved = localStorage.getItem('locale');
		if (saved === 'zh' || saved === 'en') return saved;
		const nav = (navigator.language || navigator.userLanguage || '').toLowerCase();
		return nav.startsWith('zh') ? 'zh' : 'en';
	}

	function applyTranslations(locale) {
		const t = I18N[locale] || I18N.zh;
		currentLocale = locale;
		// html lang
		document.documentElement.setAttribute('lang', locale === 'zh' ? 'zh-CN' : 'en');
		// document and title
		document.title = t.docTitle;
		const map = [
			['title', 'title'],
			['introNote', 'introNote'],
			['inputsHeader', 'inputsHeader'],
			['resultsHeader', 'resultsHeader'],
			['lblRaceTime', 'lblRaceTime'],
			['lblLapTime', 'lblLapTime'],
			['lblFuelPerLap', 'lblFuelPerLap'],
			['lblTankCapacity', 'lblTankCapacity'],
			['sufHours', 'sufHours'],
			['sufMinutes', 'sufMinutes'],
			['sufLapMin', 'sufLapMin'],
			['sufLapSec', 'sufLapSec'],
			['sufFuelPerLap', 'sufFuelPerLap'],
			['sufTankCapacity', 'sufTankCapacity'],
			['calculateBtn', 'btnCalculate'],
			['resetBtn', 'btnReset'],
			['lblTotalLaps', 'lblTotalLaps'],
			['lblPitStops', 'lblPitStops'],
			['lblMinFuel', 'lblMinFuel'],
			['lblSafeFuel', 'lblSafeFuel'],
			['lblLapsPerStint', 'lblLapsPerStint'],
			['lblLastStintLaps', 'lblLastStintLaps'],
			['lblStintFuelList', 'lblStintFuelList'],
			['lblLastStintFuel', 'lblLastStintFuel'],
			['formulaNote', 'formulaNote']
		];
		for (const [id, key] of map) {
			const node = document.getElementById(id);
			if (node && t[key] !== undefined) node.textContent = t[key];
		}
		// placeholders
		const raceHours = document.getElementById('raceHours');
		const raceMinutes = document.getElementById('raceMinutes');
		const lapMinutes = document.getElementById('lapMinutes');
		const lapSeconds = document.getElementById('lapSeconds');
		const fuelPerLap = document.getElementById('fuelPerLap');
		const tankCapacity = document.getElementById('tankCapacity');
		if (raceHours) raceHours.placeholder = t.placeholderHours;
		if (raceMinutes) raceMinutes.placeholder = t.placeholderMinutes;
		if (lapMinutes) lapMinutes.placeholder = t.placeholderLapMin;
		if (lapSeconds) lapSeconds.placeholder = t.placeholderLapSec;
		if (fuelPerLap) fuelPerLap.placeholder = locale === 'zh' ? '例如 2.75' : 'e.g. 2.75';

		if (tankCapacity) tankCapacity.placeholder = locale === 'zh' ? '例如 100' : 'e.g. 100';
		// dropdown value sync
		const sel = document.getElementById('langSelect');
		if (sel) sel.value = locale;
	}
	function toNumber(value) {
		if (value === '' || value === null || value === undefined) return NaN;
		return Number(value);
	}

	function clampNonNegative(n) {
		return isFinite(n) && n >= 0 ? n : NaN;
	}

	function toSeconds(mins, secs) {
		return mins * 60 + secs;
	}

	function roundUp(value, decimals) {
		if (!isFinite(value)) return NaN;
		const factor = Math.pow(10, decimals);
		return Math.ceil(value * factor - 1e-10) / factor;
	}

	function round(value, decimals) {
		if (!isFinite(value)) return NaN;
		const factor = Math.pow(10, decimals);
		return Math.round((value + Number.EPSILON) * factor) / factor;
	}

	function formatLiters(n) {
		if (!isFinite(n)) return '-';
		const t = I18N[currentLocale] || I18N.zh;
		return currentLocale === 'zh' ? `${n.toFixed(2)} ${t.unitLiter}` : `${n.toFixed(2)} ${t.unitLiter}`;
	}

	function $(id) { return document.getElementById(id); }

	// ---- easing + animation helpers ----
	function easeOutCubic(t) {
		return 1 - Math.pow(1 - t, 3);
	}

	function parseNumericFromText(text) {
		if (!text || text === '-') return NaN;
		const m = String(text).match(/-?\d+(?:\.\d+)?/);
		return m ? Number(m[0]) : NaN;
	}

	function animateNumber(elNode, toValue, options) {
		const { duration = 500, decimals = 0, formatter = (v) => String(v) } = options || {};
		const fromText = elNode.textContent;
		const fromValue = parseNumericFromText(fromText);
		if (!isFinite(fromValue)) {
			// no previous numeric value, set immediately
			elNode.textContent = formatter(Number(toValue));
			bumpCard(elNode);
			return;
		}
		const start = performance.now();
		function frame(now) {
			const t = Math.min(1, (now - start) / duration);
			const e = easeOutCubic(t);
			const current = fromValue + (toValue - fromValue) * e;
			const rounded = decimals > 0 ? Number(current.toFixed(decimals)) : Math.round(current);
			elNode.textContent = formatter(rounded);
			if (t < 1) {
				requestAnimationFrame(frame);
			} else {
				elNode.textContent = formatter(toValue);
				bumpCard(elNode);
			}
		}
		requestAnimationFrame(frame);
	}

	function bumpCard(valueEl) {
		const card = valueEl.closest('.result-item');
		if (!card) return;
		card.classList.remove('bump');
		// force reflow to restart animation
		void card.offsetWidth;
		card.classList.add('bump');
	}

	const el = {
		raceHours: $('raceHours'),
		raceMinutes: $('raceMinutes'),
		lapMinutes: $('lapMinutes'),
		lapSeconds: $('lapSeconds'),
		fuelPerLap: $('fuelPerLap'),
		tankCapacity: $('tankCapacity'),
		calculateBtn: $('calculateBtn'),
		resetBtn: $('resetBtn'),
		totalLaps: $('totalLaps'),
		pitStops: $('pitStops'),
		minFuel: $('minFuel'),
		safeFuel: $('safeFuel'),
		lapsPerStint: $('lapsPerStint'),
		lastStintLaps: $('lastStintLaps'),
		stintFuelList: $('stintFuelList'),
		lastStintFuel: $('lastStintFuel')
	};

	function readInputs() {
		// Time fields default to 0 when empty
		const raceHours = clampNonNegative(toNumber(el.raceHours.value === '' ? 0 : el.raceHours.value));
		const raceMinutes = clampNonNegative(toNumber(el.raceMinutes.value === '' ? 0 : el.raceMinutes.value));
		const lapMinutes = clampNonNegative(toNumber(el.lapMinutes.value === '' ? 0 : el.lapMinutes.value));
		const lapSeconds = clampNonNegative(toNumber(el.lapSeconds.value === '' ? 0 : el.lapSeconds.value));
		const fuelPerLap = clampNonNegative(toNumber(el.fuelPerLap.value));
		const tankCapacity = clampNonNegative(toNumber(el.tankCapacity.value));

		return { raceHours, raceMinutes, lapMinutes, lapSeconds, fuelPerLap, tankCapacity };
	}

	function compute() {
		const { raceHours, raceMinutes, lapMinutes, lapSeconds, fuelPerLap, tankCapacity } = readInputs();

		// Basic validation
		if (!isFinite(raceHours) || !isFinite(raceMinutes) || !isFinite(lapMinutes) || !isFinite(lapSeconds) || !isFinite(fuelPerLap) || !isFinite(tankCapacity)) {
			setOutputsInvalid();
			return;
		}

		const raceTotalSeconds = (raceHours * 3600) + (raceMinutes * 60);
		const lapTimeSeconds = toSeconds(lapMinutes, lapSeconds);

		if (raceTotalSeconds <= 0 || lapTimeSeconds <= 0 || fuelPerLap <= 0) {
			setOutputsInvalid();
			return;
		}

		// Total laps by floor of time/lap
		const totalLaps = Math.floor(raceTotalSeconds / lapTimeSeconds);
		if (totalLaps <= 0) {
			setOutputsInvalid();
			return;
		}

		// Stint laps per full tank
		const lapsPerStint = tankCapacity > 0 ? Math.floor(tankCapacity / fuelPerLap) : 0;
		if (lapsPerStint <= 0) {
			// Cannot complete any lap with current per-lap fuel usage and tank capacity
			el.totalLaps.textContent = String(totalLaps);
			el.pitStops.textContent = (I18N[currentLocale] || I18N.zh).cannotCompleteLap;
			const minFuelLiters = roundUp(totalLaps * fuelPerLap, 2);
			el.minFuel.textContent = formatLiters(minFuelLiters);
			el.safeFuel.textContent = formatLiters(roundUp((totalLaps + 2) * fuelPerLap, 2));
			el.lapsPerStint.textContent = '-';
			el.lastStintLaps.textContent = '-';
			el.stintFuelList.textContent = '-';
			el.lastStintFuel.textContent = '-';
			return;
		}

		// Stints breakdown
		const fullStints = Math.floor(totalLaps / lapsPerStint);
		const remainderLaps = totalLaps % lapsPerStint;
		const hasRemainder = remainderLaps > 0;
		const totalStints = hasRemainder ? (fullStints + 1) : fullStints;
		const pitStops = Math.max(0, totalStints - 1);

		// Last stint laps logic
		let lastStintLaps = 0;
		if (totalLaps <= lapsPerStint) {
			lastStintLaps = totalLaps; // no refuel scenario
		} else if (hasRemainder) {
			lastStintLaps = remainderLaps;
		} else {
			lastStintLaps = lapsPerStint; // exact division: final stint is a full stint
		}

		// Fuel figures
		const minFuelLiters = roundUp(totalLaps * fuelPerLap, 2);
		const safeFuelLiters = roundUp((totalLaps + 2) * fuelPerLap, 2);
		const lastStintFuelLiters = roundUp(lastStintLaps * fuelPerLap, 2);

		// Only show the fuel consumption for the first stint (前一段)
		const firstStintLaps = Math.min(totalLaps, lapsPerStint);
		const firstStintFuelLiters = roundUp(firstStintLaps * fuelPerLap, 2);

		// Render with easing animations
		animateNumber(el.totalLaps, totalLaps, { duration: 500, decimals: 0, formatter: (v) => String(v) });
		animateNumber(el.pitStops, pitStops, { duration: 500, decimals: 0, formatter: (v) => String(v) });
		animateNumber(el.minFuel, minFuelLiters, { duration: 600, decimals: 2, formatter: (v) => formatLiters(Number(v)) });
		animateNumber(el.safeFuel, safeFuelLiters, { duration: 600, decimals: 2, formatter: (v) => formatLiters(Number(v)) });
		animateNumber(el.lapsPerStint, lapsPerStint, { duration: 500, decimals: 0, formatter: (v) => String(v) });
		animateNumber(el.lastStintLaps, lastStintLaps, { duration: 500, decimals: 0, formatter: (v) => String(v) });
		animateNumber(el.stintFuelList, firstStintFuelLiters, { duration: 600, decimals: 2, formatter: (v) => formatLiters(Number(v)) });
		animateNumber(el.lastStintFuel, lastStintFuelLiters, { duration: 600, decimals: 2, formatter: (v) => formatLiters(Number(v)) });
	}

	function setOutputsInvalid() {
		el.totalLaps.textContent = '-';
		el.pitStops.textContent = '-';
		el.minFuel.textContent = '-';
		el.safeFuel.textContent = '-';
		el.lapsPerStint.textContent = '-';
		el.lastStintLaps.textContent = '-';
		el.stintFuelList.textContent = '-';
		el.lastStintFuel.textContent = '-';
	}

	function wire() {
		el.calculateBtn.addEventListener('click', compute);
		el.resetBtn.addEventListener('click', () => {
			el.raceHours.value = '0';
			el.raceMinutes.value = '0';
			el.lapMinutes.value = '0';
			el.lapSeconds.value = '0';
			el.fuelPerLap.value = '';
			el.tankCapacity.value = '';
			setOutputsInvalid();
		});
		const sel = document.getElementById('langSelect');
		if (sel) {
			sel.addEventListener('change', () => {
				const locale = sel.value === 'en' ? 'en' : 'zh';
				localStorage.setItem('locale', locale);
				applyTranslations(locale);
			});
		}
	}

	// Initialize
	const initialLocale = detectLocale();
	applyTranslations(initialLocale);
	wire();
	setOutputsInvalid();
})();


