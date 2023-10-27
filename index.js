const URL =
  "https://one00x-data-analysis.onrender.com/assignment?email=vijayashree369@gmail.com";

const getData = async () => {
  const response = await fetch(URL);
  const assignmentId = response.headers.get("x-assignment-id");
  const dataset = await response.json();
  console.log(assignmentId, dataset, "response");
  return { assignmentId, dataset };
};

const getMostUsedWord = (dataset) => {
  let count = new Map();
  dataset?.forEach((data) => {
    if (count.has(data)) {
      count.set(data, count.get(data) + 1);
    } else {
      count.set(data, 1);
    }
  });

  let [mostUsedWord, maxCount] = ["", 0];
  count.forEach((val, key) => {
    if (val > maxCount) {
      maxCount = val;
      mostUsedWord = key;
    }
  });
  return mostUsedWord;
};

const checkStatus = async (data) => {
  const response = await fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const status = await response.json();
  console.log(status, "status");
};

const dataAnalysis = async () => {
  try {
    const { assignmentId, dataset } = await getData();
    const mostUsedWord = getMostUsedWord(dataset);
    const data = {
      assignment_id: assignmentId,
      answer: mostUsedWord,
    };
    console.log(data, "data");
    await checkStatus(data);
  } catch (error) {
    console.log(`ERROR: ${error.message}`);
  }
};

dataAnalysis();
