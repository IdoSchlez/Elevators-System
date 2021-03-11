var elevatorA = {
    queue : [],
    currFloor : 0,
    isAvailable: true,
    id: "A",
    add : function(e) {
        this.queue.push(e)
    },
    isEmptyQueue : function() {
        return this.queue.length === 0;
    },
    moveElevatorToNextFloor: function(){
            elevator = this.id;
            const e = this.queue.shift();
            const newfloor = e.target.value;
            const motionTime =  Math.abs(newfloor-this.currFloor) * 500;
            const newPos = newfloor * 60;
            const currElevator = document.getElementById(`elevator${elevator}`);
            currElevator.style.transition = `bottom ${motionTime}ms`;
            currElevator.style.transitionTimingFunction = 'linear';
            currElevator.style.bottom = `${newPos}px`;
            this.currFloor = newfloor;
            setTimeout(() =>{
                const mySound = document.getElementById(`sound${elevator}`); 
                mySound.play();
                e.target.style.background = "#4caf50";
            }, motionTime);
            setTimeout(() => {
                if(this.isEmptyQueue()){
                    this.isAvailable = true;
                }else{
                    this.moveElevatorToNextFloor();
                }
            }, motionTime + 2000);
            
    },
    serve : function(e) {
        e.target.style.background = "red";
        if(this.isAvailable){
            this.isAvailable = false;
            this.moveElevatorToNextFloor();
        }
    },
    getLast : function() {
        return this.queue[this.queue.length - 1]
    }
}

var elevatorB = {
    queue : [],
    currFloor : 0,
    isAvailable: true,
    id: "B",
    add : function(e) {
        this.queue.push(e)
    },
    isEmptyQueue : function() {
        return this.queue.length === 0;
    },
    moveElevatorToNextFloor: function(){
            elevator = this.id;
            const e = this.queue.shift();
            const newfloor = e.target.value;
            const motionTime =  Math.abs(newfloor-this.currFloor) * 500;
            const newPos = newfloor * 60;
            const currElevator = document.getElementById(`elevator${elevator}`);
            currElevator.style.transition = `bottom ${motionTime}ms`;
            currElevator.style.transitionTimingFunction = 'linear';
            currElevator.style.bottom = `${newPos}px`;
            this.currFloor = newfloor;
            setTimeout(() =>{
                const mySound = document.getElementById(`sound${elevator}`); 
                mySound.play();
                e.target.style.background = "#4caf50";
            }, motionTime);
            setTimeout(() => {
                if(this.isEmptyQueue()){
                    this.isAvailable = true;
                }else{
                    this.moveElevatorToNextFloor();
                }
            }, motionTime + 2000);
            
    },
    serve : function(e) {
        e.target.style.background = "red";
        if(this.isAvailable){
            this.isAvailable = false;
            this.moveElevatorToNextFloor();
        }
    },
    getLast : function() {
        return this.queue[this.queue.length - 1]
    }
}



//selectors
const f0Button = document.getElementById("button0");
const f1Button = document.getElementById("button1");
const f2Button = document.getElementById("button2");
const f3Button = document.getElementById("button3");
const f4Button = document.getElementById("button4");
const f5Button = document.getElementById("button5");
const f6Button = document.getElementById("button6");

//event listeners
f0Button.addEventListener("click", findAvailableElevator);
f1Button.addEventListener("click", findAvailableElevator);
f2Button.addEventListener("click", findAvailableElevator);
f3Button.addEventListener("click", findAvailableElevator);
f4Button.addEventListener("click", findAvailableElevator);
f5Button.addEventListener("click", findAvailableElevator);
f6Button.addEventListener("click", findAvailableElevator);
//functions
function onElavatorFinished(elevator, e){
            const mySound = document.getElementById(`sound${elevator}`);  
            mySound.play();
            e.target.style.background = "#4caf50";

}

function findAvailableElevator(e) {
    e.preventDefault();
    const floorNum = parseInt(e.target.value);
    const aIsAvailable = elevatorA.isAvailable;
    const bIsAvailable = elevatorB.isAvailable;
    if (aIsAvailable || bIsAvailable){
        if (aIsAvailable && bIsAvailable){
            if (Math.abs(elevatorA.currFloor - floorNum) >= Math.abs(elevatorB.currFloor - floorNum)){
                elevatorB.add(e);
                elevatorB.serve(e);
            }else{
                elevatorA.add(e);
                elevatorA.serve(e);
            }
        }else if (aIsAvailable){
            elevatorA.add(e);
            elevatorA.serve(e);
        }else {
            elevatorB.add(e);
            elevatorB.serve(e);
        }
    }else {
        if (elevatorA.queue.length > elevatorB.queue.length){
            elevatorB.add(e);
            elevatorB.serve(e);
        }else if (elevatorA.queue.length < elevatorB.queue.length){
            elevatorA.add(e);
            elevatorA.serve(e);
        }else {
            if (Math.abs(elevatorA.getLast() - floorNum) >= Math.abs(elevatorB.getLast() - floorNum)){
                elevatorB.add(e);
                elevatorB.serve(e);
            }else {
                elevatorA.add(e);
                elevatorA.serve(e);
            } 
        }
    }
}
