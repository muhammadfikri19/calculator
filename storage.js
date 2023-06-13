const CACHE_KEY = "Calculation_history";
function checkForStorage(){
    return typeof(Storage) !== "undefined"
}
function putHistory(data) {
    if (checkForStorage()){
        let historyData = null;
        if (localStorage.getItem(CACHE_KEY) === null) {
            historyData = [];
        } else {
            historyData = JSON.parse(localStorage.getItem(CACHE_KEY));
        }
        historyData.unshift(data);

        if (historyData.length > 5){
        historyData.pop();
        }
        localStorage.setItem(CACHE_KEY, JSON.stringify(historyData));
    }
}

function showHistory() {
    if (checkForStorage()){
        return JSON.parse(localStorage.getItem(CACHE_KEY)) || [];
    } else {
        return [];
    }
}
function renderHistory() {
    const historyData = showHistory();
    let historyList = document.querySelector("#historyList")
    historyList.innerHTML ="";

    for (let history of historyData) {
        let row = document.createElement('tr');
        row.innerHTML = "<td>" + history.firstNumber + "</td>";
        row.innerHTML = "<td>" + history.operator + "</td>";
        row.innerHTML = "<td>" + history.secondNumber + "</td>";
        row.innerHTML = "<td>" + history.result + "/td";

        historyList.appendChild(row);
    }
}

function performCalculation() {
    if (calculator.operator === "+") {
        result = parseInt(calculator.firstNumber) + parseInt (calculator.displayNumber); 
    } else {
        result = parseInt(calculator.firstNumber) - parseInt(calculator.displayNumber)
    }
    // objek history akan di kirimkan sebagai argumen fungi pustHistory()
    const history = {
        firstNumber: calculator.firstNumber,
        secondNumber: calculator.displayNumber,
        operator: calculato.operator,
        result: result
    }
    putHistory(history);
    calculator.displayNumber = result;
    renderHistory();

}