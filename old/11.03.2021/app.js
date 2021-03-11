const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

const aaa = async () => {
    await sleep(2000);
}
var d = new Date();
// var elevatorA = {
//     queue : [],
//     currFloor : 0,
//     add : function(floorNumber) {
//         this.queue.push(floorNumber)
//         console.log("lenB" + this.queue.length);
//     },
//     isAvailable : function() {
//         return this.queue.length === 0;
//     },
//     serve : async(e, elevator) =>{
//         // e.target.classList.add('changeColorRed');
//         e.target.style.background = "red";
//         console.log(this.queue);
//         var newfloor = this.queue.shift();
//         console.log("A : "+ elevatorA.currFloor +"\n" + "B : "+ elevatorB.currFloor);
//         console.log(elevator + " from " + this.currFloor +" to " + newfloor);
        
//         const motionTime = 500 * Math.abs(newfloor-this.currFloor);
//         const newPos = newfloor*60;
//         const currElevator = document.getElementById(`elevator${elevator}`);
//         currElevator.style.transition = `bottom ${motionTime}ms`;
//         currElevator.style.transitionTimingFunction = 'linear';
        
//         setTimeout(() =>{
//             const mySound = document.getElementById(`sound${elevator}`); 
//             mySound.play();
//             e.target.style.background = "#4caf50";

//         }, motionTime);
//         currElevator.style.bottom = `${newPos}px`;
//         this.currFloor = newfloor;
//         sleep();
//     },
//     getLast : function() {
//         return this.queue[this.queue.length - 1]
//     }
// }
var elevatorA = {
    queue : [],
    currFloor : 0,
    lastExeTime:  -2000,
    add : function(floorNumber) {
        this.queue.push(floorNumber)
        console.log("lenB" + this.queue.length);
    },
    isAvailable : function() {
        return this.queue.length === 0;
    },
    serve : function(e, elevator) {
        // e.target.classList.add('changeColorRed');
        e.target.style.background = "red";
        setTimeout(() => {
        console.log(this.queue);
        var newfloor = this.queue.shift();
        console.log("A : "+ elevatorA.currFloor +"\n" + "B : "+ elevatorB.currFloor);
        console.log(elevator + " from " + this.currFloor +" to " + newfloor);
        
        const motionTime = 500 * Math.abs(newfloor-this.currFloor);
        const newPos = newfloor*60;
        const currElevator = document.getElementById(`elevator${elevator}`);
        currElevator.style.transition = `bottom ${motionTime}ms`;
        currElevator.style.transitionTimingFunction = 'linear';
        
        setTimeout(() =>{
            const mySound = document.getElementById(`sound${elevator}`);  
            mySound.play();
            e.target.style.background = "#4caf50";
            this.lastExeTime = d.getTime();

        }, motionTime);
        currElevator.style.bottom = `${newPos}px`;
        this.currFloor = newfloor;
        }, 2000 + this.lastExeTime-d.getTime());   
    },
    getLast : function() {
        return this.queue[this.queue.length - 1]
    }
}
var elevatorB = {
    queue : [],
    currFloor : 0,
    lastExeTime:  -2000,
    add : function(floorNumber) {
        this.queue.push(floorNumber)
        console.log("lenB" + this.queue.length);
    },
    isAvailable : function() {
        return this.queue.length === 0;
    },
    serve : function(e, elevator) {
        // e.target.classList.add('changeColorRed');
        e.target.style.background = "red";
        setTimeout(() => {
        console.log(this.queue);
        var newfloor = this.queue.shift();
        console.log("A : "+ elevatorA.currFloor +"\n" + "B : "+ elevatorB.currFloor);
        console.log(elevator + " from " + this.currFloor +" to " + newfloor);
        
        const motionTime = 500 * Math.abs(newfloor-this.currFloor);
        const newPos = newfloor*60;
        const currElevator = document.getElementById(`elevator${elevator}`);
        currElevator.style.transition = `bottom ${motionTime}ms`;
        currElevator.style.transitionTimingFunction = 'linear';
        
        setTimeout(() =>{
            const mySound = document.getElementById(`sound${elevator}`);  
            mySound.play();
            e.target.style.background = "#4caf50";
            this.lastExeTime = d.getTime();

        }, motionTime);
        currElevator.style.bottom = `${newPos}px`;
        this.currFloor = newfloor;
        }, 2000 + this.lastExeTime-d.getTime());   
    },
    getLast : function() {
        return this.queue[this.queue.length - 1]
    }
}
//selectors
const f0Button = document.getElementById("floor-container0");
const f1Button = document.getElementById("floor-container1");
const f2Button = document.getElementById("floor-container2");
const f3Button = document.getElementById("floor-container3");
const f4Button = document.getElementById("floor-container4");
const f5Button = document.getElementById("floor-container5");
const f6Button = document.getElementById("floor-container6");

//event listeners
f0Button.addEventListener("click", findAvailableElevator);
f1Button.addEventListener("click", findAvailableElevator);
f2Button.addEventListener("click", findAvailableElevator);
f3Button.addEventListener("click", findAvailableElevator);
f4Button.addEventListener("click", findAvailableElevator);
f5Button.addEventListener("click", findAvailableElevator);
f6Button.addEventListener("click", findAvailableElevator);
//functions

function findAvailableElevator(e) {
    e.preventDefault();
    floorNum = parseInt(e.target.value);
    aIsAvailable = elevatorA.isAvailable();
    bIsAvailable = elevatorB.isAvailable();
    console.log("A is" + aIsAvailable);
    console.log("B is" + bIsAvailable);
    if (aIsAvailable || bIsAvailable){
        if (aIsAvailable && bIsAvailable){
            if (Math.abs(elevatorA.currFloor - floorNum) >= Math.abs(elevatorB.currFloor - floorNum)){
                elevatorB.add(floorNum);
                elevatorB.serve(e, "B");
                console.log("1")
            }else{
                elevatorA.add(floorNum);
                elevatorA.serve(e, "A");
                console.log("2")
            }
        }else if (aIsAvailable){
            elevatorA.add(floorNum);
            elevatorA.serve(e, "A");
            console.log("3")
        }else {
            elevatorB.add(floorNum);
            elevatorB.serve(e, "B");
            console.log("4")
        }
    }else {
        if (elevatorA.queue.length > elevatorB.queue.length){
            elevatorB.add(floorNum);
            elevatorB.serve(e, "B");
            console.log("5")
        }else if (elevatorA.queue.length < elevatorB.queue.length){
            elevatorA.add(floorNum);
            elevatorA.serve(e, "A");
            console.log("6")
        }else {
            if (Math.abs(elevatorA.getLast() - floorNum) >= Math.abs(elevatorB.getLast() - floorNum)){
                elevatorB.add(floorNum);
                elevatorB.serve(e, "B");
                console.log("7")
            }else {
                elevatorA.add(floorNum);
                elevatorA.serve(e, "A");
                console.log("8")
            } 
        }
    }
}
        // this.setTimeOut = setTimeout(() => {
        //     console,log("waiting");
        //   }, 3000);
        // let parent = e.target.parentElement.querySelectorAll('p');
        // let left = parent[0];
        // let right = parent[1];
        // e.target.style.background='red';
        // e.target.style.background='green';
        // // e.target.classList.add('changeColorRed');
        // if (direction === "l"){
        //     left.style.background='Gray';
        // }
        
        // wait(2000);
        // sleep(2000);
        // Atomics.wait(2000);




        // var elevatorA = {
        //     queue : [],
        //     currFloor : 0,
        //     add : function(floorNumber) {
        //         this.queue.push(floorNumber)
        //         console.log("lenA" + this.queue.length);
        //     },
        //     isAvailable : function() {
        //         return this.queue.length === 0;
        //     },
        //     serve : function(e, direction, elevator) {
        //         // e.target.classList.add('changeColorRed');
        //         setTimeout(() => {
        //         console.log(this.queue);
        //         var newfloor = this.queue.shift();
        
        //         console.log("A : "+ elevatorA.currFloor +"\n" + "B : "+ elevatorB.currFloor);
        //         console.log(elevator + " from " + this.currFloor +" to " + newfloor);
        //         const travelTime = 500 * Math.abs(newfloor-this.currFloor);
        //         const nextYPosition = newfloor*60;
        //         const elevatorElement = document.getElementById("elevatorA");
        //         elevatorElement.style.transition = `bottom ${travelTime}ms`;
        //         elevatorElement.style.transitionTimingFunction = 'linear';
        //         elevatorElement.style.bottom = `${nextYPosition}px`;
        //         this.currFloor = newfloor;
        //         }, 2000);
        //     },
        //     getLast : function() {
        //         return this.queue[this.queue.length - 1]
        //     }
        // }
        // var elevatorB = {
        //     queue : [],
        //     currFloor : 0,
        //     add : function(floorNumber) {
        //         this.queue.push(floorNumber)
        //         console.log("lenB" + this.queue.length);
        //     },
        //     isAvailable : function() {
        //         return this.queue.length === 0;
        //     },
        //     serve : function(e, elevator) {
        //         // e.target.classList.add('changeColorRed');
        //         setTimeout(() => {
        //         console.log(this.queue);
        //         var newfloor = this.queue.shift();
        //         console.log("A : "+ elevatorA.currFloor +"\n" + "B : "+ elevatorB.currFloor);
        //         console.log(elevator + " from " + this.currFloor +" to " + newfloor);
        //         const motionTime = 500 * Math.abs(newfloor-this.currFloor);
        //         const newPos = newfloor*60;
        //         const currElevator = document.getElementById("elevatorB");
        //         currElevator.style.transition = `bottom ${motionTime}ms`;
        //         currElevator.style.transitionTimingFunction = 'linear';
        //         currElevator.style.bottom = `${newPos}px`;
        //         this.currFloor = newfloor;
        //         }, 2000);
        //     },
        //     getLast : function() {
        //         return this.queue[this.queue.length - 1]
        //     }
        // }