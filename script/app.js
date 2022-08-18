let arr;
let dictSpacecrafts = new Object();

let arrSpacecrafts = [];
let arrAmount = [];

let barColors = ["#ba1e68", "#5643fd"];

function splitname(name){
	arr = name.split(" ");
};

function pieChart(){
	let objLength = Object.keys(dictSpacecrafts).length;
	for (var i = 0; i < objLength; i++){
		var t;
		t = Object.keys(dictSpacecrafts)[i];
		arrSpacecrafts.push(t);
		arrAmount.push(dictSpacecrafts[t]);
	}

	console.log(arrSpacecrafts);
	console.log(arrAmount);

	var chart = new Chart("myChart", {
		type: "pie",
		data: {
		  labels: arrSpacecrafts,
		  datasets: [{
			backgroundColor: barColors,
			data: arrAmount
		  }]
		},
		options: {
		  title: {
			display: true
		  },
		  maintainAspectRatio: false, 
		}
	});
	chart.render();
};

// fill attributes
let showResult = queryResponse => {
	document.querySelector('.js-humansCount').innerHTML = `There are <big style="color:#ba1e68">${queryResponse.number}</big> humans in space!`;
	for (var i = 0; i < queryResponse.people.length;i++)
	{
		var spacecraft = queryResponse.people[i].craft;

		if (spacecraft in dictSpacecrafts){
			dictSpacecrafts[spacecraft] += 1;
		}
		else {
			dictSpacecrafts[spacecraft] = 1;
		}

		splitname(queryResponse.people[i].name);

		document.querySelector('.js-humansinspace').innerHTML += `
		<tr>
			<td>${arr[0]}</td>
			<td>${arr[1]}</td>
			<td>${queryResponse.people[i].craft}</td>
		</tr>`;
	}
	pieChart(queryResponse);
};

//Get API
const getAPI = function(){
	const url = `http://api.open-notify.org/astros.json`;
	fetch(url)
		.then(req => {
			if (!req.ok){
				console.error('Error with fetch');
			} else {
				return req.json();
			}
		})
		.then(json => {
			console.log('Fetching data worked!');
			showResult(json);
		});
}


// domcontenloaded
document.addEventListener('DOMContentLoaded', function() {
	particlesJS("particles-js", {
		particles: {
		  number: {
			value: 355,
			density: {
			  enable: true,
			  value_area: 789.1476416322727
			}
		  },
		  color: {
			value: "#ffffff"
		  },
		  shape: {
			type: "circle",
			stroke: {
			  width: 0,
			  color: "#000000"
			},
			polygon: {
			  nb_sides: 5
			},
			image: {
			  src: "img/github.svg",
			  width: 100,
			  height: 100
			}
		  },
		  opacity: {
			value: 0.48927153781200905,
			random: false,
			anim: {
			  enable: true,
			  speed: 0.2,
			  opacity_min: 0,
			  sync: false
			}
		  },
		  size: {
			value: 2,
			random: true,
			anim: {
			  enable: false,
			  speed: 2,
			  size_min: 0,
			  sync: false
			}
		  },
		  line_linked: {
			enable: false,
			distance: 150,
			color: "#ffffff",
			opacity: 0.4,
			width: 1
		  },
		  move: {
			enable: true,
			speed: 0.2,
			direction: "none",
			random: true,
			straight: false,
			out_mode: "out",
			bounce: false,
			attract: {
			  enable: false,
			  rotateX: 600,
			  rotateY: 1200
			}
		  }
		},
		interactivity: {
		  detect_on: "window",
		  events: {
			onhover: {
			  enable: true,
			  mode: "bubble"
			},
			onclick: {
			  enable: true,
			  mode: "push"
			},
			resize: false
		  },
		  modes: {
			grab: {
			  distance: 400,
			  line_linked: {
				opacity: 1
			  }
			},
			bubble: {
			  distance: 83.91608391608392,
			  size: 1,
			  duration: 3,
			  opacity: 1,
			  speed: 3
			},
			repulse: {
			  distance: 200,
			  duration: 0.4
			},
			push: {
			  particles_nb: 4
			},
			remove: {
			  particles_nb: 2
			}
		  }
		},
		retina_detect: true
	  });

	getAPI();
});