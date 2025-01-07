document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("expense-form");
    const expenseList = document.getElementById("expense-list");
    const totalExpenseDisplay = document.getElementById("total-expense");
    const currencySelector = document.getElementById("currency");
    const clearListButton = document.getElementById("clear-list");

    let totalExpense = 0;
    let selectedCurrency = "$"; // default currency is USD

    // load expenses from local storage
    loadExpenses();

    // currency change
    currencySelector.addEventListener("change", () => {
        selectedCurrency = getCurrencySymbol(currencySelector.value);
        updateTotalExpenseDisplay();
        updateExpenseItems();
    });

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const description = document.getElementById("description").value;
        const amount = parseFloat(document.getElementById("amount").value);

        addExpense(description, amount);
        saveExpense(description, amount);

        // reset form fields
        form.reset();
    });

    // clear list button 
    clearListButton.addEventListener("click", () => {
        localStorage.removeItem("expenses");
        localStorage.removeItem("totalExpense");
        localStorage.removeItem("currency");
        totalExpense = 0;
        expenseList.innerHTML = '';
        updateTotalExpenseDisplay();
    });

    function addExpense(description, amount) {
        totalExpense += amount;  
        updateTotalExpenseDisplay(); 

        const expenseItem = document.createElement("div");
        expenseItem.className = "expense-item";
        expenseItem.innerHTML = `<span>${description}</span><span>${selectedCurrency}${amount.toFixed(2)}</span>`;
        expenseList.appendChild(expenseItem);
    }

    function saveExpense(description, amount) {
        const expenses = JSON.parse(localStorage.getItem("expenses")) || [];
        expenses.push({ description, amount });
        localStorage.setItem("expenses", JSON.stringify(expenses));

        // Save the total expense
        localStorage.setItem("totalExpense", totalExpense);
        localStorage.setItem("currency", selectedCurrency);
    }

    function loadExpenses() {
        const expenses = JSON.parse(localStorage.getItem("expenses")) || [];
        expenses.forEach(expense => {
            addExpense(expense.description, expense.amount);
        });

        // Load and display the total expense
        totalExpense = parseFloat(localStorage.getItem("totalExpense")) || 0;
        selectedCurrency = localStorage.getItem("currency") || "$";
        updateTotalExpenseDisplay();
    }

    function updateTotalExpenseDisplay() {
        totalExpenseDisplay.textContent = `Total Expense: ${selectedCurrency}${totalExpense.toFixed(2)}`;
    }

    function updateExpenseItems() {
        const expenseItems = document.querySelectorAll(".expense-item");
        expenseItems.forEach(item => {
            const amount = parseFloat(item.querySelector("span:last-child").textContent.replace(selectedCurrency, ""));
            item.querySelector("span:last-child").textContent = `${selectedCurrency}${amount.toFixed(2)}`;
        });
    }

    function getCurrencySymbol(currencyCode) {
        switch (currencyCode) {
            case "USD": return "$";
            case "EUR": return "€";
            case "INR": return "₹";
            case "GBP": return "£";
            default: return "$"; 
        }
    }
});
