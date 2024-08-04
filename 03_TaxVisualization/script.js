(function () {
    let pieChart, barChart, taxSlabChart;
    const taxForm = document.getElementById('tax-form');
    const resultDiv = document.getElementById('result');
    const resetBtn = document.getElementById('resetBtn');
    const taxableIncomeSpan = document.getElementById('taxable-income');
    const totalTaxSpan = document.getElementById('total-tax');
    const effectiveTaxRateSpan = document.getElementById('effective-tax-rate');
    const taxBreakdownDiv = document.getElementById('tax-breakdown');
    const dobInput = document.getElementById('dob');
    const ageInput = document.getElementById('age');
    const scrollToTopBtn = document.getElementById("scrollToTopBtn");

    const taxSlabs = [
        { limit: 300000, rate: 0 },
        { limit: 600000, rate: 0.05 },
        { limit: 900000, rate: 0.10 },
        { limit: 1200000, rate: 0.15 },
        { limit: 1500000, rate: 0.20 },
        { limit: Infinity, rate: 0.30 }
    ];

    dobInput.addEventListener('change', calculateAge);

    function calculateAge() {
        // Parse the date of birth string into a Date object
        const dob = new Date(dobInput.value);
        // Get the current date
        const today = new Date();

        // Calculate the difference in years
        let age = today.getFullYear() - dob.getFullYear(); // 2024 - 1990 = 34
        // Get the month difference
        const monthDiff = today.getMonth() - dob.getMonth(); // 06 - 10 ==> -4

        // If the month difference is negative or
        // if it's zero and today's date is earlier than the birth date,
        // subtract one year from the age
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
            age--;
        }

        ageInput.value = age;
    }

    resetBtn.addEventListener('click', function (e) {
        taxForm.reset();
    })

    taxForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const income = parseFloat(document.getElementById('income').value);
        const age = parseInt(document.getElementById('age').value);

        if(isNaN(income)) {
            alert('Please enter a valid income.');
            return;
        }

        if(isNaN(age) || age <= 0) {
            alert('Please enter a valid age.');
            return;
        }
        showLoader();
        const standardDeduction = parseFloat(document.getElementById('standard-deduction').value);
        const otherDeductions = parseFloat(document.getElementById('other-deductions').value);

        // 12Lakh - 75000 ==> taxable amount

        // 50000 - 75000 ==> negative or zero amount
        const taxableIncome = Math.max(0, income - standardDeduction - otherDeductions);
        simulateProcessing(taxableIncome, age).then(({ totalTax, taxBreakdown }) => {
            const effectiveTaxRate = (totalTax / income) * 100;
            displayResults(taxableIncome, totalTax, effectiveTaxRate, 
                taxBreakdown, income, standardDeduction + otherDeductions);
        }).catch(err => {
            alert("An error occurred during calculation: " + error.message);
        }).finally(() => {
            hideLoader();
        });
    });

    function calculateTax(taxableIncome, age) {
        // totaltax, taxBreakdown
        let remainingIncome = taxableIncome;
        let totalTax = 0;
        const taxBreakdown = [];

        // { limit: 300000, rate: 0 },
        // { limit: 600000, rate: 0.05 },
        for (const slab of taxSlabs) {
            if (remainingIncome > 0) {
                const taxableAmount = Math.min(remainingIncome, slab.limit - (taxBreakdown.length > 0 ? taxSlabs[taxBreakdown.length - 1].limit : 0));
                const taxForSlab = taxableAmount * slab.rate;
                totalTax += taxForSlab;
                taxBreakdown.push({
                    slab: `₹${taxBreakdown.length > 0 ? taxSlabs[taxBreakdown.length - 1].limit + 1 : 0} - ₹${slab.limit === Infinity ? 'Above' : slab.limit}`,
                    rate: `${slab.rate * 100}%`,
                    tax: taxForSlab
                })
                remainingIncome -= taxableAmount;
            } else {
                break;
            }
        }

        // Apply tax rebate for income up to 7 lakhs
        if (taxableIncome <= 700000) {
            totalTax = Math.max(0, totalTax - 25000);
        }

        // Apply additional deduction for senior citizens (age 60 and above)
        if (age >= 60) {
            totalTax = Math.max(0, totalTax - 50000);
        }

        return {totalTax, taxBreakdown}
    }

    function displayResults(taxableIncome, totalTax, effectiveTaxRate, taxBreakdown, income, deductions) {
        taxableIncomeSpan.textContent = `₹${taxableIncome.toFixed(2)}`;
        totalTaxSpan.textContent = `₹${totalTax.toFixed(2)}`;
        effectiveTaxRateSpan.textContent = `${effectiveTaxRate.toFixed(2)}%`;
        taxBreakdownDiv.innerHTML = '';

        taxBreakdown.forEach(slab => {
            const slabDiv = document.createElement('div');
            slabDiv.classList.add('tax-slab');
            slabDiv.innerHTML = `
            <span>${slab.slab}</span>
            <span>${slab.rate}</span>
            <span>₹${slab.tax.toFixed(2)}</span>
        `;
        taxBreakdownDiv.appendChild(slabDiv);
        })
        resultDiv.classList.remove('hidden');
        updateCharts(income, deductions, totalTax, taxBreakdown);
    }

    function updateCharts(income, deductions, tax, slabWiseTax) {
        updatePieChart(income, deductions);
        updateBarChart(income, deductions, tax);
        updateTaxSlabChart(slabWiseTax);
    }


    function updatePieChart(income, deductions) {
        const ctx = document.getElementById('pieChart').getContext('2d');
        if (pieChart) {
            pieChart.destroy();
        }

        pieChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ['Taxable Income', 'Deductions'],
                datasets: [{
                    data: [income - deductions, deductions],
                    backgroundColor: ['#3498db', '#e74c3c']
                }]
            },
            options : {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom',
                    },
                    title: {
                        display: true,
                        text: 'Income Breakdown'
                    }
                }
            }
        })
        
    }

    function updateBarChart(income, deductions, tax) {
        const ctx = document.getElementById('barChart').getContext('2d');
        if (barChart) {
            barChart.destroy();
        }
        barChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Total Income', 'Deductions', 'Taxable Income', 'Tax Payable'],
                datasets: [{
                    label: 'Amount (₹)',
                    data: [income, deductions, income - deductions, tax],
                    backgroundColor: ['#3498db', '#e74c3c', '#2ecc71', '#f39c12']
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: false,
                    },
                    title: {
                        display: true,
                        text: 'Tax Breakdown'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Amount (₹)'
                        }
                    }
                }
            }
        })

    }

    function updateTaxSlabChart(slabWiseTax) {
        console.log('slabWiseTax', slabWiseTax)
        const ctx = document.getElementById('taxSlabChart').getContext('2d');
        if (taxSlabChart) {
            taxSlabChart.destroy();
        }

        taxSlabChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: slabWiseTax.map(slab => slab.slab),
                datasets: [{
                    label: 'Tax Amount (₹)',
                    data: slabWiseTax.map(slab => slab.tax),
                    backgroundColor: '#f39c12'
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: false,
                    },
                    title: {
                        display: true,
                        text: 'Tax Slab Breakdown'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Tax Amount (₹)'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Income Slabs (₹)'
                        }
                    }
                }
            }
        });
    }


    // processing tax calculation

    function simulateProcessing(taxableIncome, age) {
        // ES6 // 2015 // Promise // then or async await
        // new Promise((resolve, reject) => { resolve()}
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    const result = calculateTax(taxableIncome, age);
                    resolve(result);
                } catch (error) {
                    reject(error);
                }
            }, 2000);// Simulate 2 seconds of processing time
        });

    }

    // Loading section 
    function showLoader() {
        document.querySelectorAll('.tax-result').forEach(div => div.classList.remove('show'));
        document.getElementById('loader').style.display = 'block';
        document.getElementById('loaderText').style.display = 'block';
    }


    function hideLoader() {
        document.getElementById('loader').style.display = 'none';
        document.getElementById('loaderText').style.display = 'none';
        document.querySelectorAll('.tax-result').forEach(div => div.classList.add('show'));
    }

    // scroll functionlity 

    window.addEventListener('scroll', () => {
        if(window.scrollY > 100) {
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove("show");
        }
    });

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior:'smooth' });
    });
})();