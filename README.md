**Server**
https://bw-conjugator.herokuapp.com/

| Method        | Endpoint      | Data in  | Data out | Example output| description|
| ------------- |:-------------:| -----:|  -----:|  -----:|  -----:|
| post | /api/register |  {username, password} | {token} | {
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
	.eyJzdWJqZWN0Ijo1NywidXNlcm5hbWUiOiJ1c2VyIiwiY
	XV0aGVudGljYXRpb24iOiIkMmEkMTAkcnFSN3dPT1NJU3Z
	Lb0xaSzhYcC5LdXlSbzFRbmdJV1k4ZG10YlB2Z0JuZFF6d
	nNwWnVBV08iLCJpYXQiOjE1NjM2NzczNDUsImV4cCI6MTU
	2Mzc2Mzc0NX0._RQwoHl_Yv7vNcdjEcT7hycf9W0C2ExUR
	k4arlX-yOw"
}  |  pass in a username and password and creates a new account for you and returns you a token to be stored and reused|
| post | /api/login | {username, password} | {token} | {
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
	.eyJzdWJqZWN0Ijo1NywidXNlcm5hbWUiOiJ1c2VyIiwiY
	XV0aGVudGljYXRpb24iOiIkMmEkMTAkcnFSN3dPT1NJU3Z
	Lb0xaSzhYcC5LdXlSbzFRbmdJV1k4ZG10YlB2Z0JuZFF6d
	nNwWnVBV08iLCJpYXQiOjE1NjM2NzczNDUsImV4cCI6MTU
	2Mzc2Mzc0NX0._RQwoHl_Yv7vNcdjEcT7hycf9W0C2ExUR
	k4arlX-yOw"
} | pass in a username and password and validates your user exist and password is correct then sends you a token to store
| get  | /api/words | header: token(optional) {filter: [optional]} | {id, infinitive, type, tense, form, infinitive_english, answer} | { 
	"id": "154",
	"infinitive": "compartir",
	"type": "indicative",
	"tense": "present",
	"form": "usted",	
	"infinitive_english": "to share; to divide [up]",
	"answer": "comparte" } | pass a token and get automatic filtering based on the users settings, or pass no token and just a filter key value and get filtering based on that, or pass nothing and get default values. |
| get | /api/words/:id | {} | {id,infinitive, infinitive_english} | {
	"id": "582",
	"infinitive": "sorprender",
	"infinitive_english": "to surprise, take by surprise, startle, amaze"
} | pass an id in the url and get the word associated to that id | 
| post | /api/words | {id, infinitive, type, tense, form, infinitive_english, answer, correct} | "added global and personal" or "added global only" | pass in object recieved from get call with new key value correct (0,1) to udate global data. If you want to update account data must pass a token in the header (token: token)
| get | /api/stats | {} | {global: {global stats}, personal: {personal stats}} | {
	"globals": {
		"total": "1446",
	      "correct": "496",
	      "indicative_c": "496",
	      "indicative_i": "951",
        "subjunctive_c": "0",
        "subjunctive_i": "2",
        "imperative_c": "0",
        "imperative_i": "0",
	      "present_c": "339",
        "present_i": "528",
        "future_c": "2",
        "future_i": "2",
        "imperfect_c": "0",
        "imperfect_i": "1",
        "preterite_c": "141",
	      "preterite_i": "391",
	      "conditional_c": "0",
	      "conditional_i": "0",
	      "present_perfect_c": "0",
        "present_perfect_i": "2",
        "future_perfect_c": "0",
        "future_perfect_i": "2",
        "past_perfect_c": "4",
        "past_perfect_i": "19",
        "preterite_archaic_c": "10",
        "preterite_archaic_i": "0",
        "conditional_perfect_c": "0",
        "conditional_perfect_i": "8",
	"best_streaks": [
			{
				"username": "spanish_perfect",
        "best_streak": 21
			},
			{
				"username": "AmICool",
        "best_streak": 16
			},
      {
				"username": "Bahia_M_Duran",
        "best_streak": 16
			},
      {
				"username": "FlashGoofy",
				"best_streak": 16
			},
			{     
				"username": "ProSpanish",
        "best_streak": 15
			}
		]
	},
	"personal": {
		"id": 57,
        	"username": "user",
        	"current_streak": 0,
        	"best_streak": 0,
        	"filter": "imperative,subjunctive,future,imperfect,conditional,present_perfect,future_perfect,past_perfect,preterite_archaic,conditional_perfect",
        	"daily_goal": 50,
        	"daily_progress": 0,
        	"total": 0,
        	"correct": 0,
        	"indicative_c": null,
          "subjunctive_c": null,
        	"imperative_c": null,
        	"indicative_i": null,
        	"subjunctive_i": null,
        	"imperative_i": null,
        	"present_c": null,
        	"present_i": null,
        	"future_c": null,
        	"future_i": null,
        	"imperfect_c": null,
        	"imperfect_i": null,
        	"preterite_c": null,
        	"preterite_i": null,
        	"conditional_c": null,
        	"conditional_i": null,
        	"present_perfect_c": null,
        	"present_perfect_i": null,
        	"future_perfect_c": null,
	        "future_perfect_i": null,
	        "past_perfect_c": null,
	        "past_perfect_i": null,
        	"preterite_archaic_c": null,
        	"preterite_archaic_i": null,
        	"conditional_perfect_c": null,
        	"conditional_perfect_i": null,
        	"streak_position": 0,
        	"percent_position": 0
	}
} | will pass back global stats always and pass back personal stats if token is recieved.
| get | /api/settings | header: token {} | {filter: []} | {
	"filter": [
		"imperative",
		"subjunctive",
		"future",
		"imperfect",
		"conditional",
		"present_perfect",
		"future_perfect",
		"past_perfect",
		"preterite_archaic",
		"conditional_perfect"
	]
} | give a token and get the settings that have been set by this user |
| put | /api/settings | header: token {filter: []} | {} | {
	"filter": [
		"future",
		"imperfect",
		"conditional",
		"present_perfect",
		"future_perfect",
		"past_perfect"
	]
} | give a token and an array of string filters to update the users settings |



#### global and personal stats recorded:
##### Mood:
##### indicative_c: 0,
##### indicative_i: 0,
##### subjunctive_c: 0,
##### subjunctive_i: 0,
##### imperative_c: 0,
##### imperative_i: 0,

###### tenses:
##### present_c: 0,
##### present_i: 0,
##### future_c: 0,
##### future_i: 0,
##### imperfect_c: 0,
##### imperfect_i: 0,
##### preterite_c: 0,
##### preterite_i: 0,
##### conditional_c: 0,
##### conditional_i: 0,
##### present_perfect_c: 0,
##### present_perfect_i: 0,
##### future_perfect_c: 0,
##### future_perfect_i: 0,
##### past_perfect_c: 0,
##### past_perfect_i: 0,
##### preterit_archaic_c: 0,
##### preterit_archaic_i: 0,
##### conditional_perfect_c: 0,
##### conditional_perfect_i: 0
