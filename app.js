
let elevatorA = {
    queue : [],
    currFloor : 0,
    isAvailable: true,
    elevatorId: "A",
    addElevatorReqToQueue : function(e) {
        this.queue.push(e)
    },
    isQueueEmpty : function() {
        return this.queue.length === 0;
    },
    moveElevator: function(){
            const elevator = this.elevatorId;
            const currEventFromQueue = this.queue.shift();
            const newfloor = currEventFromQueue.target.value;
            const motionTime =  Math.abs(newfloor-this.currFloor) * 500;
            const newPos = newfloor * 60;
            const currElevator = document.getElementById(`elevator${elevator}`);
            currElevator.style.transition = `bottom ${motionTime}ms`;
            currElevator.style.transitionTimingFunction = 'linear';
            currElevator.style.bottom = `${newPos}px`;
            this.currFloor = newfloor;
            setTimeout(() =>{
                const floorArivalSound = document.getElementById(`sound${elevator}`); 
                floorArivalSound.play();
                currEventFromQueue.target.style.background = "#4caf50";
            }, motionTime);
            setTimeout(() => {
                if(this.isQueueEmpty()){
                    this.isAvailable = true;
                }else{
                    this.moveElevator();
                }
            }, motionTime + 2000);
            
    },
    handleElevatorReq : function(e) {
        e.target.style.background = "red";
        if(this.isAvailable){
            this.isAvailable = false;
            this.moveElevator();
        }
    },
    getLastFloor : function() {
        return this.queue[this.queue.length - 1];
    }
}

let elevatorB = {
    queue : [],
    currFloor : 0,
    isAvailable: true,
    elevatorId: "B",
    addElevatorReqToQueue : function(e) {
        this.queue.push(e)
    },
    isQueueEmpty : function() {
        return this.queue.length === 0;
    },
    moveElevator: function(){
            const elevator = this.elevatorId;
            const currEventFromQueue = this.queue.shift();
            const newfloor = currEventFromQueue.target.value;
            const motionTime =  Math.abs(newfloor-this.currFloor) * 500;
            const newPos = newfloor * 60;
            const currElevator = document.getElementById(`elevator${elevator}`);
            currElevator.style.transition = `bottom ${motionTime}ms`;
            currElevator.style.transitionTimingFunction = 'linear';
            currElevator.style.bottom = `${newPos}px`;
            this.currFloor = newfloor;
            setTimeout(() =>{
                const floorArivalSound = document.getElementById(`sound${elevator}`); 
                floorArivalSound.play();
                currEventFromQueue.target.style.background = "#4caf50";
            }, motionTime);
            setTimeout(() => {
                if(this.isQueueEmpty()){
                    this.isAvailable = true;
                }else{
                    this.moveElevator();
                }
            }, motionTime + 2000);
            
    },
    handleElevatorReq : function(e) {
        e.target.style.background = "red";
        if(this.isAvailable){
            this.isAvailable = false;
            this.moveElevator();
        }
    },
    getLastFloor : function() {
        return this.queue[this.queue.length - 1];
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

//function
function findAvailableElevator(e) {
    e.preventDefault();
    const floorNum = parseInt(e.target.value);
    const elevatorAIsAvailable = elevatorA.isAvailable;
    const elevatorBIsAvailable = elevatorB.isAvailable;
    if (elevatorAIsAvailable || elevatorBIsAvailable){
        if (elevatorAIsAvailable && elevatorBIsAvailable){
            if (Math.abs(elevatorA.currFloor - floorNum) >= Math.abs(elevatorB.currFloor - floorNum)){
                elevatorB.addElevatorReqToQueue(e);
                elevatorB.handleElevatorReq(e);
            }else{
                elevatorA.addElevatorReqToQueue(e);
                elevatorA.handleElevatorReq(e);
            }
        }else if (elevatorAIsAvailable){
            elevatorA.addElevatorReqToQueue(e);
            elevatorA.handleElevatorReq(e);
        }else {
            elevatorB.addElevatorReqToQueue(e);
            elevatorB.handleElevatorReq(e);
        }
    }else {
        if (elevatorA.queue.length > elevatorB.queue.length){
            elevatorB.addElevatorReqToQueue(e);
            elevatorB.handleElevatorReq(e);
        }else if (elevatorA.queue.length < elevatorB.queue.length){
            elevatorA.addElevatorReqToQueue(e);
            elevatorA.handleElevatorReq(e);
        }else {
            if (Math.abs(elevatorA.getLastFloor() - floorNum) >= Math.abs(elevatorB.getLastFloor() - floorNum)){
                elevatorB.addElevatorReqToQueue(e);
                elevatorB.handleElevatorReq(e);
            }else {
                elevatorA.addElevatorReqToQueue(e);
                elevatorA.handleElevatorReq(e);
            } 
        }
    }
}
