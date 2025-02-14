function saveToLocalStorage(name) {
    let nameArr = getFromLocalStorage("Tasks");
  
    if (!nameArr.includes(name)) {
      nameArr.push(name);
    }
  
    localStorage.setItem("Tasks", JSON.stringify(nameArr));
  }
   
  function getFromLocalStorage() {
    let localStorageData = localStorage.getItem("Tasks");
  
    if (localStorageData == null) {
      return [];
    }
    return JSON.parse(localStorageData);
  }
  
  function removeFromLocalStorage(name) {
    let localStorageData = getFromLocalStorage("Tasks");
  
    let Index = localStorageData.indexOf(name);
  
    localStorageData.splice(Index, 1);
  
    localStorage.setItem("Tasks", JSON.stringify(localStorageData));
  }
  
  export { saveToLocalStorage, getFromLocalStorage, removeFromLocalStorage};
  