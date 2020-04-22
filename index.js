
// Input collection from the form.
//var spring-inputs = document.getElementById("input-param").element;
function springFunction()

{





var units =  document.getElementById("form-input-param").elements[0].value;
var material =document.getElementById("form-input-param").elements[1].value;
var ends = document.getElementById("form-input-param").elements[2].value;

var wd = Number(document.getElementById("wd-input").value);
var od = Number(document.getElementById("od-input").value);
var tc = Number(document.getElementById("tc-input").value);
var fl = Number(document.getElementById("fl-input").value);
var sr = Number(document.getElementById("sr-input").value);
var l1 = Number(document.getElementById("l1-input").value);
var l2 = Number(document.getElementById("l2-input").value);
var l3 = Number(document.getElementById("l3-input").value);

// Overlay data on the spring drawing
document.getElementById("wd-text-overlay").textContent = wd +"mm";
document.getElementById("fl-text-overlay").textContent = fl +"mm";
document.getElementById("od-text-overlay").textContent = od +"mm";
document.getElementById("id-text-overlay").textContent = (od-(2*wd)) +"mm";

// Modulus of rigitity (G) constant values
const G_SS = Number(69000);
const G_CS = Number(81540);
const density_SS = Number(6.35); //density of SS 6.50 g/cm^3
const density_CS = Number (6.20);//density of SS 6.30 g/cm^3

var si = (od - wd)/wd;


if(material ==="CS")
{
  var  G = G_CS;
  var density = density_CS;
}
else
{
  var G = G_SS;
  var density = density_SS;
}

if (ends == "CUG" || ends == "CG")
{
var n = tc-2;
}
else
{
var n = tc;

}


if (ends == "CG" || ends == "OG")
{
var sl = Number(tc*wd) ;
}
else
{
  sl = Number((tc*wd)+wd );

}



sr = ( G*wd /(8*n*Math.pow(si,3))) ;


var max_deflection = fl-sl;
var fn = max_deflection *sr ;
var pitch = (max_deflection /n)+ wd;
var mass = ((wd*wd*density* (tc*3.14*(od-wd)))/1000) ;

var f1 = Number((fl - l1)*sr) ;
var f2 =  Number((fl - l2)*sr) ;
var f3 =  Number((fl - l3)*sr) ;

document.getElementById("form-output-param").elements[0].value = sr.toFixed(2);
document.getElementById("form-output-param").elements[1].value = sl.toFixed(2);
document.getElementById("form-output-param").elements[2].value = fn.toFixed(2);
document.getElementById("form-output-param").elements[3].value = si.toFixed(2);
document.getElementById("form-output-param").elements[4].value = pitch.toFixed(2);
document.getElementById("form-output-param").elements[5].value = mass.toFixed(2);
document.getElementById("sr-input").value = sr.toFixed(2);;

document.getElementById("pitch-text-overlay").textContent = pitch.toFixed(2); +"mm";
document.getElementById("f0-text-overlay").textContent = "0N";
document.getElementById("l1-text-overlay").textContent = l1.toFixed(2) +"mm";
document.getElementById("l2-text-overlay").textContent = l2.toFixed(2) +"mm";
document.getElementById("l3-text-overlay").textContent = l3.toFixed(2) +"mm";
document.getElementById("f1-text-overlay").textContent = f1.toFixed(2) +"N";
document.getElementById("f2-text-overlay").textContent = f2.toFixed(2) +"N";
document.getElementById("f3-text-overlay").textContent = f3.toFixed(2) +"N";

drawCurveTypes();


}


// google chart starts here

google.charts.load('current', {packages: ['corechart', 'line']});
google.charts.setOnLoadCallback(drawCurveTypes);

function drawCurveTypes() {
var sr = document.getElementById("sr-input").value;
var max_deflection =  Number(document.getElementById("fl-input").value) - document.getElementById("form-output-param").elements[1].value;
var deflection =[];
var load = [];
var sample_distance = (max_deflection/40);

var position = 0;
for(var samples = 0; samples <= 40 ; samples++)

{

  deflection.push(position);
  load.push(position*sr);
  position = position + sample_distance;
}

 {
      var data = new google.visualization.DataTable();
      data.addColumn('number', 'X');
      data.addColumn('number', 'N');

for (var i=0; i<deflection.length; i++)

{

   data.addRow([deflection[i],load[i]]);

}
      var options = {
        hAxis: {
          title: 'Deflection(mm)'
        },
        vAxis: {
          title: 'Force(N)'
        },
        series: {
          1: {curveType: 'function'}
        },
        backgroundColor: '#f0f0f0',
        height: 280,
        title: "Deflection(mm) vs Force(N)"

      };

      var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
      chart.draw(data, options);
}
}
// Google Chart ends here
