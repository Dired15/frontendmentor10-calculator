
function ScreenCalculator()
{
    this.screen=document.getElementById("screenCalculator").firstElementChild;
    this.display=function(elementToDisplay){
    
        var text;
        var finalText="";
        var decimal=false;
        var limitDecimal=0;
        
        console
        if(elementToDisplay.length)
        {
            this.screen.innerHTML="";
            for(var i=0;i<elementToDisplay.length;i++)
            {
                
                this.screen.innerHTML+=elementToDisplay[i];
            }

        }
        else
        {
            text=elementToDisplay+"";
            this.screen.innerHTML="";
            for(var i=0;i<15 && limitDecimal<4 && i<text.length;i++)
            {
               
                if(text[i]==".")
                {
                    
                    finalText+=",";
                    decimal=true;
                }
                else
                {
                    finalText+=text[i];
                }
                if(decimal)
                {
                    limitDecimal++;
                }
                
                
            }

            this.screen.innerHTML=finalText;

        }

    }

}

function Keyboard()
{
    this.numberButton=[];
    this.correctButton=[];
    this.operationButton=[];
    this.dotButton;
    this.equalButton;

    this.numberButton.push(document.getElementById("0"));
    this.numberButton.push(document.getElementById("1"));
    this.numberButton.push(document.getElementById("2"));
    this.numberButton.push(document.getElementById("3"));
    this.numberButton.push(document.getElementById("4"));
    this.numberButton.push(document.getElementById("5"));
    this.numberButton.push(document.getElementById("6"));
    this.numberButton.push(document.getElementById("7"));
    this.numberButton.push(document.getElementById("8"));
    this.numberButton.push(document.getElementById("9"));

    this.correctButton.push(document.getElementById("del"));
    this.correctButton.push(document.getElementById("reset"));

    this.operationButton.push(document.getElementById("add"));
    this.operationButton.push(document.getElementById("substract"));
    this.operationButton.push(document.getElementById("multiply"));
    this.operationButton.push(document.getElementById("divide"));

    this.dotButton=document.getElementById("dot");
    this.equalButton=document.getElementById("equal");

    this.numberButton[0].addEventListener("click",function(){calculator.switchAction("digit",0)});
    this.numberButton[1].addEventListener("click",function(){calculator.switchAction("digit",1)});
    this.numberButton[2].addEventListener("click",function(){calculator.switchAction("digit",2)});
    this.numberButton[3].addEventListener("click",function(){calculator.switchAction("digit",3)});
    this.numberButton[4].addEventListener("click",function(){calculator.switchAction("digit",4)});
    this.numberButton[5].addEventListener("click",function(){calculator.switchAction("digit",5)});
    this.numberButton[6].addEventListener("click",function(){calculator.switchAction("digit",6)});
    this.numberButton[7].addEventListener("click",function(){calculator.switchAction("digit",7)});
    this.numberButton[8].addEventListener("click",function(){calculator.switchAction("digit",8)});
    this.numberButton[9].addEventListener("click",function(){calculator.switchAction("digit",9)});

    this.operationButton[0].addEventListener("click",function(){calculator.switchAction("operation","+")});
    this.operationButton[1].addEventListener("click",function(){calculator.switchAction("operation","-")});
    this.operationButton[2].addEventListener("click",function(){calculator.switchAction("operation","*")});
    this.operationButton[3].addEventListener("click",function(){calculator.switchAction("operation","/")});
    
    this.correctButton[0].addEventListener("click",function(){calculator.switchAction("correct","del")});
    this.correctButton[1].addEventListener("click",function(){calculator.switchAction("correct","reset")});

    this.dotButton.addEventListener("click",function(){calculator.switchAction("dot",true)});
    this.equalButton.addEventListener("click",function(){calculator.switchAction("equal",true)});

}

function Theme()
{



}

function Calculator()
{
    this.screen=new ScreenCalculator();
    this.keyboard=new Keyboard();
    this.number=[];
    this.digit=[];
    this.operation=[];
    this.finalResult=0;
    


    this.switchAction=function(type,value){

        switch(type)
        {
            case "digit":{
                
                this.addDigit(value);
                this.screen.display(this.digit);

            }
            break;

            case "operation":{
                
                if(this.digit.length>0)
                {

                this.convertToNumber();
                


                }
                
                if(this.number.length>1)
                {
                this.reset(this.digit);
                this.result();
                }

                if(this.operation.length<this.number.length)
                {
                this.addOperation(value);
                }
                else if(this.operation.length==this.number.length)
                {
                    this.operation.pop();
                    this.addOperation(value);

                }
               

            }
            break;

            case "correct":{
                this.correct(value);

            }
            break;

            case "dot":{

                if(this.digit.length>1 && this.digit[this.digit.length-1]!=",")
                {
                
                this.addDigit(",");
                this.screen.display(this.digit);
                }

            }
            break;

            case "equal":{
                if(this.digit.length>0)
                {
                this.convertToNumber();
                }
                if(this.number.length>0)
                {
                this.reset(this.digit);
                this.result();
                }
                this.result();

            }
            break;

        }

    }

    this.addDigit=function(value){

        if(this.digit.length==1 )
        {
            if(this.digit[0]==0)
            {
                this.digit[0]=value;
            }
            else
            {
                this.digit.push(value);

            }
        }
        else
        {
            this.digit.push(value);
        }

    }

    this.addOperation=function(value){

        this.operation.push(value);
        


    }

    this.correct=function(value){

        if(value=="del")
        {
            if(this.digit.length>1)
            {
            this.digit.pop();
            this.screen.display(this.digit);
            }
            else if(this.digit.length==1)
            {
                this.digit[0]=0;
                this.screen.display(this.digit);

            }
        }
        else
        {
            this.reset(this.operation);
            this.reset(this.number);
            this.reset(this.digit);
            this.digit[0]=0;
            this.screen.display(this.digit);
            

        }

        

    }

    this.result=function(){

        
        var numberLength=this.number.length;
        var operationLength=this.operation.length;
        var operationType=1;


        for(var i=0;i<numberLength;i++)
        {
            switch(operationType)
            {
                case 1:{
                    this.finalResult+=this.number[i];
                }
                break;

                case 2:{
                    this.finalResult-=this.number[i];
                }
                break;

                case 3:{
                    this.finalResult*=this.number[i];
                }
                break;

                case 4:{
                    this.finalResult/=this.number[i];
                }
                break;
                    
            }

            if(i<operationLength)
            {
                switch(this.operation[i])
                {
                    case "+":{
                        operationType=1;
                    }
                    break;
    
                    case "-":{
                        operationType=2;
                    }
                    break;
    
                    case "*":{
                        operationType=3;
                    }
                    break;
    
                    case "/":{
                        operationType=4;
                    }
                    break;

                }
            }


            



        }

        this.screen.display(this.finalResult);
        this.reset(this.number);
        this.reset(this.operation);
    
        this.addNumber(this.finalResult);
        this.finalResult=0;

    }

    this.convertToNumber=function(){

        var digitLength=this.digit.length;
        var nombreDecimal=false;
        var partieEntiere=0;
        var partieDecimal=0;
        var result=0;
        var j=1;
        var positionDot=0;

        for(var i=0;i<digitLength;i++)
        {
            if(this.digit[i]==",")
            {
                nombreDecimal=true;
                positionDot=i;
            }

            if(!nombreDecimal)
            {
                
                partieEntiere=i;
            }
            else
            {
                partieDecimal++;
            }
        }

        
        for(var i=0;i<=partieEntiere;i++)
        {
            result+=(this.digit[i]*this.pow(10,partieEntiere-i));
         
        }
        
        if(nombreDecimal)
        {
            
            for(var i=positionDot+1;j<partieDecimal && j<4;i++)
            {
                
                result+=(this.digit[i]/(this.pow(10,j)));
                j++;
            }
        }
        
       this.reset(this.digit);
        this.addNumber(result);

    }

    this.reset=function(arrayToReset){

        var arrayLength=arrayToReset.length;

        if(arrayLength>0)
        {
            for(var i=0;i<arrayLength;i++)
            {
                arrayToReset.pop();
            }
        }

    }

    this.addNumber=function(value){
        this.number.push(value);
        
    }

    this.pow=function(number,exposant){

        var result=1;
        for(var i=0;i<exposant;i++){result*=number;}
        return result;

    }


}


calculator=new Calculator();



