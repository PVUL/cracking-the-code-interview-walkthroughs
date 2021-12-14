const Rank = {
  Responder: 0,
  Manager: 1,
  Director: 2,
};

class CallHandler {
  constructor() {
    // We have 3 levels of employees: respondents, managers, directors.
    this.LEVELS = 3;

    // Initialize with 10 respondents, 4 managers, and 2 directors.
    this.NUM_RESPONDENTS = 10;
    this.NUM_MANAGERS = 4;
    this.NUM_DIRECTORS = 2;

    // List of employees, by level.
    // employeeLevels[0] = respondents
    // employeeLevels[1] = managers
    // employeeLevels[2] = directors
    this.employeeLevels = []; // [[R1, R2, R3, ...], [M1, M2, M3, M4], [D1, D2]]
    this.callQueues = []; // [queueForRespondents, queueForManagers, queueForDirectors]

    // A Queue for each call's rank
    for (let i = 0; i < this.LEVELS; i++) {
      this.callQueues.push(new Queue());
    }

    // Create respondents.
    let respondents = [];
    for (let k = 1; k <= this.NUM_RESPONDENTS; k++) {
      respondents.push(new Respondent(this));
    }
    this.employeeLevels[Rank.Responder] = respondents;

    // Create managers.
    let managers = [];
    for (let k = 1; k <= this.NUM_MANAGERS; k++) {
      managers.push(new Manager(this));
    }
    this.employeeLevels[Rank.Manager] = managers;

    // Create directors.
    let directors = [];
    for (let k = 1; k <= this.NUM_DIRECTORS; k++) {
      directors.push(new Director(this));
    }
    this.employeeLevels[Rank.Director] = directors;
  }
  // Routes the call to an available employee, or saves in a queue if no employee available.
  dispatchCall(caller) {
    const call = new Call(caller);

    // See if there is free employee that meets minimal rank of call
    const emp = this.getHandlerForCall(call);

    // Free employee found, assign
    if (emp !== null) {
      emp.receiveCall(call);
      call.setHandler(emp);
    } else {
      // Free employee NOT found, place call into corresponding call queue by rank.
      call.reply("Please wait for free employee to reply");
      this.callQueues[call.getRank()].add(call);
    }
  }
  // Gets first free employee that meets minimal rank of call
  // Returns employee if found, null otherwise.
  getHandlerForCall(call) {
    for (let level = call.getRank(); level < this.LEVELS - 1; level++) {
      let employeeLevel = this.employeeLevels[level];
      for (let emp of employeeLevel) {
        if (emp.isFree()) {
          return emp;
        }
      }
    }
    return null;
  }
  // Always passed a free employee, assigns call to them.
  // Return true/false if we were able to assign a call
  assignCall(emp) {
    // Check the queues, starting from the highest rank this employee can serve.
    for (let rank = emp.getRank(); rank >= 0; rank--) {
      let queue = this.callQueues[rank];

      // Dequeue call and assign
      if (queue.size() > 0) {
        let call = queue.remove();
        if (call !== null) {
          emp.receiveCall(call);
          return true;
        }
      }
    }

    return false;
  }
}

class Call {
  constructor(c) {
    this.rank = Rank.Responder; // Min rank of employee who can handle call.
    this.caller = c; // Person who is calling.
    this.handler; // Employee who is handling call.
  }
  // Set employee who is handling call.
  setHandler(employee) {
    this.handler = employee;
  }
  reply(message) {
    console.log(message);
  }
  getRank() {
    return this.rank;
  }
  setRank(r) {
    this.rank = r;
  }
  incrementRank() {
    if (this.rank === Rank.Responder) {
      this.rank = Rank.Manager;
    } else if (this.rank === Rank.Manager) {
      this.rank = Rank.Director;
    }
    return this.rank;
  }
  disconnect() {
    this.reply("Thank you for calling");
  }
}

class Employee {
  constructor(handler) {
    this.callHandler = handler;
    this.currentCall = null;
    this.rank;
  }
  receiveCall(call) {
    this.currentCall = call;
  }
  callCompleted() {
    if (this.currentCall !== null) {
      this.currentCall.disconnect();
      // Free the employee
      this.currentCall = null;
    }
    this.assignNewCall();
  }
  //The issue has not been resolved. Escalate the call, and assign a new call
  //to the employee.
  escalateAndReassign() {
    if (this.currentCall !== null) {
      this.currentCall.incrementRank();
      //Pass call by up to Call Center
      this.callHandler.dispatchCall(this.currentCall);

      // free the employee
      this.currentCall = null;
    }
    this.assignNewCall();
  }
  assignNewCall() {
    if (!this.isFree()) {
      return false;
    }
    return this.callHandler.assignCall(this);
  }
  isFree() {
    return this.currentCall === null;
  }
  getRank() {
    return this.rank;
  }
}

class Respondent extends Employee {
  constructor(callHandler) {
    super(callHandler);
    this.rank = Rank.Responder;
  }
}

class Director extends Employee {
  constructor(callHandler) {
    super(callHandler);
    this.rank = Rank.Director;
  }
}

class Manager extends Employee {
  constructor(callHandler) {
    super(callHandler);
    this.rank = Rank.Manager;
  }
}

class Caller {
  constructor(id, nm) {
    this.name = nm;
    this.userId = id;
  }
}

// _________ _______  _______ _________   _______  _______  _______  _______  _______
// \__   __/(  ____ \(  ____ \\__   __/  (  ____ \(  ___  )(  ____ \(  ____ \(  ____ \
//    ) (   | (    \/| (    \/   ) (     | (    \/| (   ) || (    \/| (    \/| (    \/
//    | |   | (__    | (_____    | |     | |      | (___) || (_____ | (__    | (_____
//    | |   |  __)   (_____  )   | |     | |      |  ___  |(_____  )|  __)   (_____  )
//    | |   | (            ) |   | |     | |      | (   ) |      ) || (            ) |
//    | |   | (____/\/\____) |   | |     | (____/\| )   ( |/\____) || (____/\/\____) |
//    )_(   (_______/\_______)   )_(     (_______/|/     \|\_______)(_______/\_______)
//                             ____       _
//                             |  _ \     | |
//                             | |_) | ___| | _____      __
//                             |  _ < / _ \ |/ _ \ \ /\ / /
//                             | |_) |  __/ | (_) \ V  V /
//                             |____/ \___|_|\___/ \_/\_/
//                         ______ ______ ______ ______ ______
//                         |______|______|______|______|______|

//                          ______ ______ ______ ______ ______
//                         |______|______|______|______|______|

//                          ______ ______ ______ ______ ______
//                         |______|______|______|______|______|

mocha.setup("bdd");
const { assert } = chai;

describe("Call Handler", () => {
  it("dispatchCall and assignCall has FIFO for call queue", () => {
    //Force all 16 default created employees to NOT be free, so we have to fill out callQueues
    const callCenter = new CallHandler();
    for (const level of callCenter.employeeLevels) {
      for (const employee of level) {
        employee.currentCall = "Filled";
      }
    }

    // Calls to add to call queue
    const kevin = new Caller(12, "Kevin");
    const eric = new Caller(13, "Eric");
    const andrew = new Caller(14, "Andrew");

    callCenter.dispatchCall(kevin);
    callCenter.dispatchCall(eric);
    callCenter.dispatchCall(andrew);

    // 3 new employees to help empty call queue
    const emp1 = new Respondent(callCenter);
    const emp2 = new Respondent(callCenter);
    const emp3 = new Respondent(callCenter);

    callCenter.assignCall(emp1);
    callCenter.assignCall(emp2);
    callCenter.assignCall(emp3);

    assert.equal(emp1.currentCall.caller, kevin);
    assert.equal(emp2.currentCall.caller, eric);
    assert.equal(emp3.currentCall.caller, andrew);
  });
  it("dispatchCall ensures calls are properly escalated", () => {
    const callCenter = new CallHandler();

    const kevin = new Caller(12, "Kevin");
    const eric = new Caller(13, "Eric");
    const andrew = new Caller(14, "Andrew");

    callCenter.dispatchCall(kevin);
    callCenter.dispatchCall(eric);
    callCenter.dispatchCall(andrew);

    // 3 new employees to help empty call queue
    const emp1 = new Respondent(callCenter);
    const emp2 = new Respondent(callCenter);
    const emp3 = new Respondent(callCenter);

    callCenter.assignCall(emp1);
    callCenter.assignCall(emp2);
    callCenter.assignCall(emp3);

    assert.equal(emp1.currentCall.caller, kevin);
    assert.equal(emp2.currentCall.caller, eric);
    assert.equal(emp3.currentCall.caller, andrew);
  });
});

mocha.run();
