


	var programstate;
	var methodstate;
	
	var lightdata;
	var tempdata;
	var celsius;
	var lighton = document.getElementById("lighton");
	var lightoff = document.getElementById("lightoff");
	var mind1;
	var mind2;
	var mind3;
	var mindstate;
	setup();
	// Analog
	function loop() {
		if(cpf){
	
			lightdata = cpf.get("light sensor");
			tempdata = cpf.get("temperature sensor");
			mind1=cpf.get("d4");
			mind2=cpf.get("d5");
			mind3=cpf.get("d6");
		}
			celsius = toCelsius(tempdata);	
			document.getElementById("lightvalue").innerHTML = lightdata;
			document.getElementById("temperaturevalue").innerHTML = celsius;
			
			document.getElementById("mid1").innerHTML = mind1;
			document.getElementById("mid2").innerHTML = mind2;
			document.getElementById("mid3").innerHTML = mind3;
		
		if(mind1==0 && mind2==0 && mind3==0)
					{
						mindstate="0";
					 }
		if(mind1==0 && mind2==0 && mind3==1)
					{
						mindstate="欠佳";
					 if(cpf)
					 {
						 cpf.setChainableLed("0," + 0 + "," + 0 + "," + 0 + ";");
					 }
				
					}
		if(mind1==0 && mind2==1 && mind3==0)
					{
						mindstate="尚可";
					 if(cpf)
					 {
						 cpf.setChainableLed("0," + 0 + "," + 0 + "," + 0 + ";");
					 }
				
					}
		if(mind1==0 && mind2==1 && mind3==1)
					{
						mindstate="不錯";	
					 if(cpf)
					 {
						 cpf.setChainableLed("0," + 0 + "," + 0 + "," + 0 + ";");
					 }
				
					}
		if(mind1==1 && mind2==0 && mind3==0)
					{
						mindstate="非常好";
					if(cpf)
				   	{
						 cpf.setChainableLed("0," + 0 + "," + 255 + "," + 0 + ";");
					 }
					 
					}
		
		document.getElementById("Mindstate").innerHTML = mindstate;
		setTimeout(loop, 100);
	}
	
	loop();
	
	// RGB
	function changeColor() {
		var Rled = document.getElementById("rled").value;
		var Gled = document.getElementById("gled").value;
		var Bled = document.getElementById("bled").value;
		
		document.getElementById("redvalue").innerHTML = Rled;
		document.getElementById("greenvalue").innerHTML = Gled;
		document.getElementById("bluevalue").innerHTML = Bled;
		
		document.getElementById("showcolor").style.backgroundColor = 'rgb(' + Rled + ',' + Gled + ',' + Bled + ')';
		
		if(cpf){
			cpf.setChainableLed("0," + Rled + "," + Gled + "," + Bled + ";");
		}
		
	}
	
	//fan
	function fan() {
		var Fanspeed = document.getElementById("fanspeed").value;
		document.getElementById("fanvalue").innerHTML = Fanspeed;
		cpf.request('["analogWrite", 3, ' + Fanspeed + ']');
		
	}
	// LED開燈
	lighton.addEventListener('touchstart', function(event) {
		lighton.src= './img/light_on.png';
		lightoff.src= './img/lightoff.png';
		cpf.request('["digitalWrite", 2 , 1]');
	});
	// LED關燈
	lightoff.addEventListener('touchstart', function(event) {
		lightoff.src= './img/light_off.png';
		lighton.src= './img/lighton.png';
		cpf.request('["digitalWrite", 2 , 0]');
	});
	// Temperature
	function toCelsius(value) {
		var resistance = parseFloat((1023-value) * 10000 / value);
		var temperature = 1 / (Math.log(resistance / 10000) / 3975+1 / 298.15) - 273.15;
		
		return temperature.toFixed(2);
	}
	
	// cpf setup
	function setup(){
		if(cpf){
			cpf.setPinMode('["resetPin"],["setPinMode", "analog", 0, "INPUT"],["setPinMode", "analog", 1,"INPUT"],["grove_newChainableLED", 7, 8, 1],["setPinMode", "digital", 2,"OUTPUT"],["setPinMode", "digital", 3,"PWM"],["setPinMode", "digital", 4,"INPUT"],["setPinMode", "digital", 5,"INPUT"],["setPinMode", "digital", 6,"INPUT"]'); }
			
	}
