# crappy-microsoft-form-spammer
A browser extension made to troll a school teacher. The code is crap, not great to look at if you don't know exactly what it does and how to use it. It is also hardcoded, so it only worked for one specific survey...

btw, getting ahold of the right html elements was a nightmare, they have some identifier on a sibling element, so you need to really dig around in the DOM to get the correct element to put a value into.

after using it:
The result was that my teacher (who found it hilarious) put everything in a pandas dataframe, made a couple of logical filters / conditions and filtered 99% of my fake data out in 10 minutes... I did however take some notes on how to do it better next time:

* make the bot be able to fill out surveys async, so multiple can be done at the same time
* make sure the bots take a couple of minutes (1-5) to fill out the form, instead of 0-1 seconds
* let the bot run over a longer period of time, multiple times a day, while other people (real people) are (probably) filling out the form too
* don't make the bot put in unrealistic answers for easy to check questions, which are easy to filter out. examples:
    * height > 2.5 m is unrealistic
    * height < 1m is unrealistic for 99% of adults
    * at the time, we could have 0 - 30 study points, my bot could fill negative values and values > 30, which is impossible
    * at the time all study point values had to be dividable by 5, which my bot did not take into account, so 24 could be filled out, which was an impossible value

additional possible (architectural) improvements:
* add a function to every question "getAnswer", so specific rules, like the % == 5 for the study point question can be applied
* change questionType into a function property "fillAnswer", because all that the questionType is for, is determining how the answer can be put into the form.
