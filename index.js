//function to count days between two given dates
function daysBetween(date1, date2) {
  // Convert both dates to milliseconds
  const date1InMs = new Date(date1).getTime();
  const date2InMs = new Date(date2).getTime();

  // Calculate the difference in milliseconds
  const diffInMs = date2InMs - date1InMs;

  // Convert the difference in milliseconds to days
  const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

  // Round the result to the nearest integer and return it
  return Math.round(diffInDays);
}

//main solution function, that takes a dictionary as input
function solution(dict) {
  const date_init = "1970-01-01"; // This date is Thursday, we've taken as reference

  //made some ref dictionaries to convert the key values to required entities,,, although everything can be done through array as well but with this result was easily coming in the form of dictionary
  var ref = {
    0: "Thu",
    1: "Fri",
    2: "Sat",
    3: "Sun",
    4: "Mon",
    5: "Tue",
    6: "Wed",
  };
  var ref2 = {
    Mon: 0,
    Tue: 1,
    Wed: 2,
    Thu: 3,
    Fri: 4,
    Sat: 5,
    Sun: 6,
  };
  var ref3 = {
    0: "Mon",
    1: "Tue",
    2: "Wed",
    3: "Thu",
    4: "Fri",
    5: "Sat",
    6: "Sun",
  };
  //creating ans dictionary
  var ans = { Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 0, Sun: 0 };

  //writing answer of available days
  for (const [key, value] of Object.entries(dict)) {
    const str_date = key;
    const num = parseInt(dict[key]);

    const numDays = daysBetween(date_init, str_date);
    const day_num = numDays % 7;
    const day = ref[day_num];
    ans[day] += num;
  }

  //solving for unavailable days
  var arr = [0, 0, 0, 0, 0, 0, 0];
  for (const [key, value] of Object.entries(ans)) {
    if (ans[key] != 0) {
      arr[ref2[key]] = 1;
    }
  }
  // console.log(arr);

  //Since i=0[Monday] and i=6[Sunday] are never 0
  let it = 0;
  while (it < 7) {
    let j = it + 1;
    while (j < 7) {
      if (arr[j] == 1) break;
      j++;
    }

    //i+1 to j-1 are not visited. So we have to fill these values
    //We have an Arithmetic Progression[AP]. First element is ans[i] and (j-i+1)th element is ans[j]
    //Common Difference(d)=(ans[j]-ans[i])/(j-i)

    //simply converting them from and to reference dictionaries to get answers
    const n1 = ref3[j];
    const n2 = ref3[it];
    let d = (ans[n1] - ans[n2]) / (j - it);
    for (let k = it + 1; k < j; k++) {
      const nhn = ref3[k];
      const a = ans[n2];
      ans[nhn] = a + d * (k - it);
    }
    it = j;
  }

  return ans;
}

//sample
var dict = {
  "2020-01-01": 6,
  "2020-01-04": 12,
  "2020-01-05": 14,
  "2020-01-06": 2,
  "2020-01-07": 4,
};

console.log(solution(dict));

module.exports = solution;

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//This code written below takes input from the terminal and prints the dictionary as well

// const prompt = require("prompt-sync")();

// const date_init = "1970-01-01"; //Initialising from here, as reference
// const n = parseInt(prompt("Enter the number of elements in the dictionary: "));
// var dict = {};
// var ref = {
//   0: "Thu",
//   1: "Fri",
//   2: "Sat",
//   3: "Sun",
//   4: "Mon",
//   5: "Tue",
//   6: "Wed",
// };
// var ref2 = {
//   Mon: 0,
//   Tue: 1,
//   Wed: 2,
//   Thu: 3,
//   Fri: 4,
//   Sat: 5,
//   Sun: 6,
// };

// var ans = { Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 0, Sun: 0 };

// let i = 0;
// while (i < n) {
//   const str_date = prompt("Enter Date: ");
//   const num = parseInt(prompt("Enter the number: "));

//   dict[str_date] = num;
//   const numDays = daysBetween(date_init, str_date);
//   const day_num = numDays % 7;
//   const day = ref[day_num];
//   ans[day] += num;
//   i++;
// }

//REST SAME CODE AS ABOVE
