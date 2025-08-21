
    
    const input = document.getElementById('Cal');
    const buttons = document.querySelectorAll('button');

    let expression = "";

    function updateDisplay() {
        input.value = expression || "0";
    }

    function calculate() {
        try {
            let result = new Function("return " + expression.replace(/%/g, "/100"))();
            if (isFinite(result)) {
                expression = result.toString();
            } else {
                expression = "";
                input.value = "Error";
            }
        } catch {
            expression = "";
            input.value = "Error";
        }
    }

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            let value = button.innerText;

            if (value === "AC") {
                expression = "";
            } else if (value === "DEL") {
                expression = expression.slice(0, -1);
            } else if (value === "=") {
                calculate();
            } else {
                if (/[\+\-\*\/]/.test(value) && /[\+\-\*\/]$/.test(expression)) {
                    return; // Prevent double operators
                }
                expression += value;
            }
            updateDisplay();
        });
    });

    // ✅ Keyboard Support
    document.addEventListener('keydown', (e) => {
        if (!isNaN(e.key) || ["+", "-", "*", "/", ".", "%"].includes(e.key)) {
            if (/[\+\-\*\/]$/.test(expression) && /[\+\-\*\/]/.test(e.key)) return;
            expression += e.key;
            updateDisplay();
        } else if (e.key === "Enter") {
            calculate();
            updateDisplay();
        } else if (e.key === "Backspace") {
            expression = expression.slice(0, -1);
            updateDisplay();
        } else if (e.key === "Escape") {
            expression = "";
            updateDisplay();
        }
    });

    updateDisplay();


