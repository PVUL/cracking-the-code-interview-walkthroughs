class OnlineReaderSystem {
  constructor() {
    this.userManager = new UserManager();
    this.library = new Library();
    this.display = new Display();

    this.activeBook;
    this.activeUser;
  }
  getLibrary() {
    return this.library;
  }
  getUserManager() {
    return this.userManager;
  }
  getDisplay() {
    return this.display;
  }
  getActiveBook() {
    return this.activeBook;
  }
  setActiveBook(book) {
    this.display.displayBook(book);
    this.activeBook = book;
  }
  getActiveUser() {
    return this.activeUser;
  }
  setActiveUser(user) {
    this.activeUser = user;
    this.display.displayUser(user);
  }
}

class Library {
  constructor() {
    this.books = {}; // {number: book}
  }
  addBook(id, details) {
    if (id in this.books) {
      return null;
    }
    const book = new Book(id, details);
    this.books[id] = book;
    return book;
  }
  remove(b) {
    const bookID = b.getID();
    if (bookID in this.books === false) {
      return false;
    }
    delete this.books[bookID];
    return true;
  }

  find(id) {
    return this.books[id];
  }
}

class UserManager {
  constructor() {
    this.users = {}; // {number: User}
  }
  addUser(id, details, accountType) {
    if (id in this.users) {
      return null;
    }
    const user = new User(id, details, accountType);
    this.users[id] = user;
    return user;
  }
  remove(u) {
    const userID = u.getID();
    if (userID in this.users === false) {
      return false;
    }
    delete this.users[userID];
    return true;
  }
  find(id) {
    return this.users[id];
  }
}

class Display {
  constructor() {
    this.activeBook;
    this.activeUser;
    this.pageNumber = 0;
  }
  displayUser(user) {
    this.activeUser = user;
    this.refreshUsername();
  }
  displayBook(book) {
    this.pageNumber = 0;
    this.activeBook = book;

    this.refreshTitle();
    this.refreshDetails();
    this.refreshPage();
  }
  refreshUsername() {
    // updates username display
  }
  refreshTitle() {
    // updates title display
  }
  refreshDetails() {
    // updates details display
  }
  refreshPage() {
    // updated page display
  }
  turnPageForward() {
    this.pageNumber++;
    this.refreshPage();
  }
  turnPageBackward() {
    this.pageNumber--;
    this.refreshPage();
  }
}

// The classes for User and Book simply hold data and provide little true functionality.
class Book {
  constructor(id, det) {
    this.bookId = id;
    this.details = det;
  }
  update() {}
  getID() {
    return this.bookId;
  }
  setID(id) {
    this.bookId = id;
  }
  getDetails() {
    return this.details;
  }
  setDetails(details) {
    this.details = details;
  }
}

class User {
  constructor(id, details, accountType) {
    this.userId = id;
    this.details = details;
    this.accountType = accountType;
  }
  renewMembership() {}
  // getters and setters
  getID() {
    return this.userId;
  }
  setID(id) {
    this.userId = id;
  }
  getDetails() {
    return this.details;
  }
  setDetails(details) {
    this.details = details;
  }
  getAccountType() {
    return this.accountType;
  }
  setAccountType(accountType) {
    this.accountType = accountType;
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

describe("Class Library", () => {
  it("addBook(id, details) works and returns back Class Book that was added. Returns falsy value if book has already been added", () => {
    const l = new Library();

    assert.equal(l.addBook(49, "Yer a wizard hairy!") instanceof Book, true);
    assert.equal(!!l.addBook(49, "Yer a wizard hairy!"), false);
  });
  it("remove(book) works and returns truthy value if successful. Returns falsy value if no book to remove", () => {
    const l = new Library();

    const hairyOtter = l.addBook(49, "Yer a wizard hairy!");
    assert.equal(!!l.remove(hairyOtter), true);
    assert.equal(!!l.remove(hairyOtter), false);
    assert.equal(!!l.addBook(49, "Yer a wizard hairy!"), true);
  });
  it("find(id) returns correct book and returns falsy value if no book found", () => {
    const l = new Library();

    const hairyOtter = l.addBook(49, "Yer a wizard hairy!");
    assert.equal(l.find(49), hairyOtter);
    assert.equal(!!l.find(99), false);
  });
});

describe("Class UserManager", () => {
  it("addUser(id, details, accountType) works and returns back Class User that was added. Returns falsy value if user has already been added", () => {
    const um = new UserManager();

    assert.equal(um.addUser(12, "Handsome") instanceof User, true);
    assert.equal(!!um.addUser(12, "Handsome"), false);
  });
  it("remove(user) works and returns truthy value if successful. Returns falsy value if no book to remove", () => {
    const um = new UserManager();

    const kevin = um.addUser(12, "Handsome");
    assert.equal(!!um.remove(kevin), true);
    assert.equal(!!um.remove(kevin), false);
  });
  it("find(id) returns correct user and returns falsy value if no user found", () => {
    const um = new UserManager();

    const kevin = um.addUser(12, "Handsome");
    assert.equal(um.find(12), kevin);
    assert.equal(!!um.find(122), false);
  });
});

mocha.run();
