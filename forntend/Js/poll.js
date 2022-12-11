const pollData = [
    {
        option: "Spider-Man",
        votes: 11,
        color: "rgb(255, 99, 132)"
    },
    {
        option: "Superman",
        votes: 8,
        color: "rgb(54, 162, 235)"
    },
    {
        option: "Batman",
        votes: 11,
        color: "rgb(36, 36, 36)"
    },
    {
        option: "Son Goku",
        votes: 5,
        color: "rgb(255, 159, 64)"
    },
    {
        option: "Hulk",
        votes: 3,
        color: "rgb(75, 192, 192)"
    },
    {
        option: "Wolverine",
        votes: 8,
        color: "rgb(255, 206, 86)"
    },
    {
        option: "Other",
        votes: 10,
        color: "rgb(153, 102, 255)"
    }
];
console.log('working');
const pollForm = document.querySelector("#submit");
const opt = document.getElementById('AddOption');
const optBody = document.getElementById('option-body');
// pollForm.addEventListener("submit", pollFormSubmit);
opt.addEventListener('click', createOption);


var createOption = ()=>{
    if (optBody.querySelectorAll('[genralAttribute="true"]').length == 0) { 
        document.querySelector("#dummy").style.display = 'none';
        const option = document.createElement('li');
    option.innerHTML = `
    <label>
            <input type="text" title="inputText" placeholder="Your Option" required class="option-inp" name="pollOptions">
            <div style="display:inline-block">
                <i id="check" onclick="submitOption()" class="append-true fa-regular fa-circle-check"></i>
                <i id="xmark" onclick="removeOption()" class="append-true fa-regular fa-circle-xmark"></i>
            </div>
    </label>`
    option.setAttribute('genralAttribute','true');
        optBody.append(option);
}
}
function submitOption() {
    var option_value = document.querySelector('.option-inp').value;
    if (!option_value=="") {
        const option = document.createElement('li');
        console.log(option_value);
        option.innerHTML = ` <label><input type="radio" name="pollOptions" value="${option_value}"><span>${option_value}</span></label>`
        document.querySelector("[genralAttribute='true']").remove(); 
        optBody.append(option);
    }
}
function removeOption() {
    document.querySelector("[genralAttribute='true']").remove();
}



// function pollFormSubmit(event) {
//     event.preventDefault();
//     const pollOptionInput = pollForm.querySelector("input[name='pollOptions']:checked");
//     if (pollOptionInput) {
//         const pollOptionValue = pollOptionInput.value;
//         pollData.find(pollOption => pollOption.option === pollOptionValue).votes++;
//         pollChart.data.datasets[0].data = pollData.map(pollOption => pollOption.votes);
//         pollChart.update();
//         pollForm.reset();
//     }
// }

// function rgbToRgba(rgb, alpha = 1) {
//     return `rgba(${rgb.substring(rgb.indexOf('(') + 1, rgb.length - 1).split(',').join()}, ${alpha})`;
// }

// Chart.defaults.global.defaultFontFamily = '"Comic Sans MS", cursive, sans-serif';

// const ctx = document.getElementById('chart').getContext('2d');
// const pollChart = new Chart(ctx, {
//     type: 'bar',
//     data: {
//         labels: pollData.map(pollOption => pollOption.option),
//         datasets: [{
//             label: '# of Votes',
//             data: pollData.map(pollOption => pollOption.votes),
//             backgroundColor: pollData.map(pollOption => rgbToRgba(pollOption.color, 0.75)),
//             borderWidth: 3
//         }]
//     },
//     options: {
//         scales: {
//             yAxes: [{
//                 ticks: {
//                     beginAtZero: true
//                 }
//             }]
//         },
//         title: {
//             display: true,
//             text: 'Favorite Superheroes',
//             fontColor: "#333",
//             fontSize: 20,
//             padding: 20
//         },
//         legend: {
//             display: false,
//         }
//     }
// });