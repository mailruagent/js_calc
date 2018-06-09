var counted = false;
var memory = 0;
var brackets = "";
var cl = function(val){
    var area = document.getElementById("inputVal");
    var cash = document.getElementById("cash");
    if (+val.value) { 
        return function(){
            if (!counted){
            area.innerHTML += val.value;
            cash.innerHTML += val.value;
            } else {
                counted = false;
                area.innerHTML = val.value;
                cash.innerHTML = val.value;
            }
        }
    } else {
        switch (val.value){
            case "0":
                return function(){
                    if (!counted && area.innerHTML != "0"){
                            area.innerHTML += val.value;
                            cash.innerHTML += val.value;
                        
                    } else {
                        counted = false;
                    }
                }
                break;
            case ".":
                return function(){
                    if (area.innerHTML.indexOf(".") == -1)
                        if (area.innerHTML){
                            area.innerHTML += ".";
                            cash.innerHTML += ".";
                        }
                        else {
                            area.innerHTML += "0.";
                            cash.innerHTML += "0.";
                        }
                }
                break;
            case "+":
                return function(){
                    if (cash.innerHTML.startsWith("sqrt") || 
                       cash.innerHTML.startsWith("sqr") || 
                       cash.innerHTML.startsWith("inv")){
                        cash.innerHTML = area.innerHTML + " + ";
                        area.innerHTML = "";
                    } 
                    else {
                        area.innerHTML = "";
                        cash.innerHTML += " + ";
                    }
                }
                break;
            case "-":
                return function(){
                    if (cash.innerHTML.startsWith("sqrt") || 
                       cash.innerHTML.startsWith("sqr") || 
                       cash.innerHTML.startsWith("inv")){
                        cash.innerHTML = area.innerHTML + " - ";
                        area.innerHTML = "";
                    } 
                    else {
                        area.innerHTML = "";
                        cash.innerHTML += " - ";
                    }
                }
                break;
            case "/":
                return function(){
                    if (cash.innerHTML.startsWith("sqrt") || 
                       cash.innerHTML.startsWith("sqr") || 
                       cash.innerHTML.startsWith("inv")){
                        cash.innerHTML = area.innerHTML + " / ";
                        area.innerHTML = "";
                    } 
                    else {
                        area.innerHTML = "";
                        cash.innerHTML += " / ";
                    }
                }
                break;
            case "*":
                return function(){
                    if (cash.innerHTML.startsWith("sqrt") || 
                       cash.innerHTML.startsWith("sqr") || 
                       cash.innerHTML.startsWith("inv")){
                        cash.innerHTML = area.innerHTML + " * ";
                        area.innerHTML = "";
                    } 
                    else {
                        area.innerHTML = "";
                        cash.innerHTML += " * ";
                    }
                }
                break;
            case "=":
                return function(){
                    if (area.innerHTML && checkBrackets()){
                        area.innerHTML = eval(cash.innerHTML);
                        cash.innerHTML += " = " + area.innerHTML;
                        counted = true;
                    }
                }
                break;
            case "C":
                return function(){
                    area.innerHTML = "";
                    cash.innerHTML = "";
                }
                break;
            case "m":
                return function(){
                    memory = +area.innerHTML;
                    area.innerHTML = "";
                    counted = true;
                }
                break;
            case "mr":
                return function(){
                    area.innerHTML = memory;
                    cash.innerHTML = memory;
                    counted = false;
                }
                break;
            case "mc":
                return function(){
                    memory = 0;
                }
                break;
            case "m+":
                return function(){
                    memory += +area.innerHTML;
                }
                break;
            case "m-":
                return function(){
                    memory -= +area.innerHTML;
                }
                break;
            case "sq":
                return function(){
                    if (area.innerHTML){
                        var sqrt = Math.sqrt(+area.innerHTML);
                        cash.innerHTML = "sqrt("+ area.innerHTML + ") = " + sqrt;
                        area.innerHTML = sqrt;
                    }
                }
                break;
            case "^2":
                return function(){
                    if (area.innerHTML){
                        var sqr = (+area.innerHTML)*(+area.innerHTML);
                        cash.innerHTML = "sqr("+ area.innerHTML + ") = " + sqr;
                        area.innerHTML = sqr;
                    }
                }
                break;
            case "+/-":
                return function(){
                    if (area.innerHTML){
                        var inv = -1*(+area.innerHTML);
                        cash.innerHTML = "inv("+ area.innerHTML + ") = " + inv;
                        area.innerHTML = inv;
                    }
                }
                break;
            case "(":
                return function(){
                    if (cash.innerHTML.indexOf("=") == -1){
                        brackets += "(";
                        area.innerHTML += "(";
                        cash.innerHTML += "(";
                    }
                }
                break;
            case ")":
                return function(){
                    if (cash.innerHTML.indexOf("=") == -1){
                        brackets += ")";
                        area.innerHTML += ")";
                        cash.innerHTML += ")";
                    }
                }
                break;
            case "<-":
                return function(){
                    if (cash.innerHTML.indexOf("=") == -1){
                        var len = area.innerHTML.length;
                        area.innerHTML = area.innerHTML.slice(0, len-1);
                        var lenNow = area.innerHTML.length;
                        cash.innerHTML = cash.innerHTML.slice(0, cash.innerHTML.length-(len-lenNow));
                    }
                }
                break;
            
        }
    }
}

var signs = ["mc", "mr", "m", "m+", "m-", "--","--","(",")","<-", "sq", "1", "2", "3", "+", "^2", "4", "5", "6", "-", "+/-", "7", "8", "9", "/", "C", ".", "0", "=", "*"]
var calc = document.getElementById("calc");
for (var i = 0; i < signs.length; i++){
    calc.innerHTML += "<input type=button class=btn value="+ signs[i]+ ">" ;
    if ((i+1) % 5 == 0) calc.innerHTML += "<br>"
}
var buttons = calc.getElementsByClassName("btn");
for (var i = 0; i< buttons.length; i++){
    buttons[i].onclick = cl(buttons[i]);
}

var countChar = function(str, char){
    var pos = -1;
    var count = 0;
    while ((pos = str.indexOf(char, pos+1)) != -1) {
        count++;
    }
    return count;
}

var checkBrackets = function(){
    var opening = countChar(cash.innerHTML, "(");
    var closing = countChar(cash.innerHTML, ")");
    return opening == closing;
}