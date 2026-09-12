(function () {
  function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  const questionHandlers = {
    "rating": function ratingHandler(q) {
      console.log('Hello from rating handler!');

      const el = document.querySelector(q.selector);
      if (el) {
        el.click();
      } else {
        console.warn("no element found b*tch")
      }
    },

    "exactString": function exactStringHandler(q) {
      console.log('Hello from exact string handler!');

      const el = document.querySelector(q.selector);
      if (el) {
        el.value = q.answer;
        el.dispatchEvent(new Event('input', { bubbles: true }));
      } else {
        console.warn(`Element not found for selector: ${q.selector}`);
      }
    },

    "numberRange": function numberRangeHandler(questionData) {
      console.log('Hello from multiple text based handler!');

      // Generate a random number string within the range
      const min = questionData.minAnswer;
      const max = questionData.maxAnswer;
      const answer = (Math.floor(Math.random() * (max - min + 1)) + min).toString();

      //apply the random number
      const el = document.querySelector(questionData.selector);
      if (el) {
        el.value = answer;
        el.dispatchEvent(new Event('input', { bubbles: true }));
      } else {
        console.warn(`Element not found for selector: ${questionData.selector}`);
      }
    },

    "multipleChoice": function multiplechoiceHandler(q) {
      console.log('Hello from multiple choice handler!');

      const choice = document.querySelector(q.selector);

      if (choice) {
        choice.click();
      } else {
        console.warn("no element found b*tch");
      }
    },
  }

  const questions = [
    //RATING
    {
      name: "rating album joost klein",
      selector: '#QuestionId_r062cdd0dc82e4487a4b80e78125a6896 + div div [aria-label="1 Star"]', // Your specific selector
      answer: 0, // Replace with your answer
      handler: "rating",
    },


    //TEXT BASED
    {
      name: "hoeveel studiepunten",
      selector: '#QuestionId_r8ed50f1ebbbe4105b3d2927acb60f1af + div div span input', // Your specific selector
      minAnswer: 290,
      maxAnswer: 350,
      handler: "numberRange",
    },
    {
      name: "studieuren per week",
      selector: '#QuestionId_re194c4cabe9f493f9eed8d24a34360d1 + div div span input', // Your specific selector
      minAnswer: -10,
      maxAnswer: 5,
      handler: "numberRange",
    },
    {
      name: "uren sport per week",
      selector: '#QuestionId_raee81062799a46bb8afe4b29c7ee40e7 + div div span input', // Your specific selector
      minAnswer: 35,
      maxAnswer: 68,
      handler: "numberRange",
    },
    {
      name: "Lievelingskleur",
      selector: '#QuestionId_rb6dafe255f0d4b56954e702a71b9972b + div div span input', // Your specific selector
      answer: "Donkerwit", // Replace with your answer
      handler: "exactString",
    },
    {
      name: "Geld in laptop gestoken",
      selector: '#QuestionId_r0df31fbb3650478fa61e81756a4fc386 + div div span input', // Your specific selector
      minAnswer: 209358,
      maxAnswer: 1209230698,
      handler: "numberRange",
    },
    {
      name: "hoe oud is pieter",
      selector: '#QuestionId_r0b0cd56b19c34708b976bd18dc5b9b26 + div div span input', // Your specific selector
      minAnswer: 1,
      maxAnswer: 10,
      handler: "numberRange",
    },
    {
      name: "youtube videos gekeken",
      selector: '#QuestionId_r0315453c757e41a6814effdd40b71d08 + div div span input', // Your specific selector
      minAnswer: -235098,
      maxAnswer: 325978,
      handler: "numberRange",
    },
    {
      name: "schoenmaat",
      selector: '#QuestionId_r8a1ae137a31c4e0796beac1903456a41 + div div span input', // Your specific selector
      minAnswer: 50,
      maxAnswer: 99,
      handler: "numberRange",
    },
    {
      name: "gaatjes gevuld bij de tandarts",
      selector: '#QuestionId_r2df8838cd9844c5eb9b5a364c6bf7470 + div div span input', // Your specific selector
      minAnswer: 1,
      maxAnswer: 932858,
      handler: "numberRange",
    },
    {
      name: "lengte in cm",
      selector: '#QuestionId_r4dcf2882db5444cd91602ce41ccc0e00 + div div span input', // Your specific selector
      minAnswer: 30,
      maxAnswer: 110,
      handler: "numberRange",
    },

    // MULTIPLE CHOICE
    {
      name: "friet of patat",
      selector: '#QuestionId_r14736f5b369e4a98a4b2f819e54feb26 + div #QuestionChoiceOption1', // Your specific selector
      answer: "Friet", // Replace with your answer
      handler: "multipleChoice",
    },
    {
      name: "BSA halen of niet",
      selector: '#QuestionId_rbe4f2a988ecf494a884263a922475f3f + div #QuestionChoiceOption7', // Your specific selector
      answer: "Nee", // Replace with your answer
      handler: "multipleChoice",
    },
    {
      name: "favoriete vak",
      selector: '#QuestionId_ra23ef00375dd4763b62ee228049f25f7 + div #QuestionChoiceOption15', // Your specific selector
      answer: "PPW", // Replace with your answer
      handler: "multipleChoice",
    },
    {
      name: "wel of geen bril",
      selector: '#QuestionId_r3dbb996a974c47648e4b86cddc9907c5 + div #QuestionChoiceOption21', // Your specific selector
      answer: "Ja", // Replace with your answer
      handler: "multipleChoice",
    },
  ];

  function waitForElements(selectors, callback) {
    const checkInterval = 500;
    const maxAttempts = 20;
    let attempts = 0;

    const intervalId = setInterval(() => {
      const allFound = selectors.every(s => document.querySelector(s));
      if (allFound || attempts >= maxAttempts) {
        clearInterval(intervalId);
        callback();
      }
      attempts++;
    }, checkInterval);
  }

  function fillQuestions() {
    questions.forEach(q => {
      questionHandlers[q.handler](q) //execute the thing
    });
  }

  //answering questions
  const selectors = questions.map(q => q.selector);

  // Function to wait for questions to be answered
  async function waitForQuestionsAndSubmit() {
    // Wait for questions to be filled
    waitForElements(selectors, async () => {
      //fill the questions
      fillQuestions();

      await delay(100);

      // After questions are filled, click submit
      const submitButton = document.querySelector('button[data-automation-id="submitButton"]');
      if (submitButton) {
        submitButton.click();
        await delay(500);
      } else {
        console.log('Submit button not found.');
      }
    });
  }

  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'fillAndSubmit') {

      waitForQuestionsAndSubmit().then(() => {
        sendResponse({ status: 'done' });
      });
      return true; // keep message channel open
    }
  });

})();